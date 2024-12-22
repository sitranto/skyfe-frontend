<template>
  <v-app class="body fullWidth overflow-hidden">

    <!-- страница имеет 3 состояния: -->
    <!-- 1) Загрузка -->
    <!-- 2) Контент, разделяется ещё на 2: -->
    <!-- 2.1) Контент есть -->
    <!-- 2.2) Контента нет -->
    <!-- 3) Ошибка -->

    <!-- В самом начале проверяем авторизован ли человек, отображаем в виде загрузки -->
    <div v-if="checkUserLoading">
      <div class="loadingCenter d-flex justify-center align-center">
        <v-progress-circular
          :size="300"
          color="primary"
          indeterminate/>
      </div>
    </div>

    <!-- Когда проверка прошла успешно, отображаем диалоги -->
    <div v-else>

      <!-- Даём анимацию для загрузки  -->
      <div v-if="getContentLoading">
        <div style="width: 360px; background-color: #fff;">
          <v-list dense color="transparent">
            <v-list-item v-for="i in 15" :key="i">

              <!-- "элемент списка -->
              <div class="messageListItem__skeleton mb-3">
                <div class="messageListItem-header__skeleton d-flex align-center">
                  <v-skeleton-loader type="avatar"/>

                  <!-- todo исправить, почему не работает отображение -->
                  <div class="d-flex flex-column ml-2">
                    <v-skeleton-loader class="messageListItem-text__skeleton mt-2" type="text"/>
                    <v-skeleton-loader class="messageListItem-text__skeleton" type="sentences"/>
                  </div>
                </div>

              </div>
            </v-list-item>
          </v-list>
        </div>
      </div>

      <div class="d-flex flex-row" v-else>
        <!-- используем v-list для вывода диалогов -->
        <!-- color="transparent"-->
        <v-list v-if="dialogBranches.length" dense
                style="width: 360px; height: 100vh; background-color: white">
          <button-menu class="mb-2"/>
          <v-list-item-group v-model="selectedDialog"
                             color="primary">
            <!-- virtual scroll в v-for не нуждается, -->
            <!-- т.к. атрибут items получает массив, и н сам его перебирает -->
            <v-virtual-scroll
              :items="dialogBranches"
              height="calc(100vh - 10px)"
              item-height="70"
            >
              <template v-slot:default="{ item }">
                <!-- карточка диалога в списке диалогов -->
                <v-list-item class="messageListBranch">
                  <div class="messageListBranch__container d-flex align-center">

                    <div class="messageListBranch__img">
                      <img src="https://placehold.co/48x48" alt="img">
                    </div>

                    <div class="messageListBranch__body">
                      <div class="messageListBranch__name" v-text="item.partnerName"/>
                      <div class="messageListBranch__text" v-html="item.lastMessageContent"/>
                    </div>

                  </div>
                </v-list-item>
              </template>
            </v-virtual-scroll>

          </v-list-item-group>
        </v-list>

        <!-- Тут мы выводим разметку, в случае если диалогов не будет -->
        <div v-else>
          <button-menu/>
          <div class="d-flex justify-center align-center"
               style="width: 360px; height: 100vh; background-color: white">
            <div>
              Нет диалогов
            </div>
          </div>
        </div>

        <!-- Тут у нас активное окно с диалогом -->
        <div style="width: calc(100% - 360px);">
          <Nuxt :parentData="parentDate"/>
        </div>

      </div>
    </div>

    <v-dialog v-model="error_dialog"
              width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Ошибка!</v-card-title>
        <v-card-text v-text="error_dialog_text"/>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            @click="error_dialog = false"
            class="d-block text-none auth-button--outlined mt-5 px-7"
            outlined
            color="#8A138C"
            height="45px">
            ОК!
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-menu v-model="show_menu"
            :position-x="x_menu_pos"
            :position-y="y_menu_pos"
            absolute
            offset-y>
      <v-list>
        <v-list-item
          v-for="(index) in 4"
          :key="index"
        >
          <v-list-item-title>{{ index }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app>
</template>
<script lang="ts">
import {Vue, Component, Watch, Provide} from 'vue-property-decorator';
import logger from "assets/scripts/logger";
import buttonMenu from "~/components/buttonMenu.vue";
import {reactive} from "vue";

@Component({
  components: {
    buttonMenu,
  }
})
export default class Default extends Vue {

  @Provide() parentDate = reactive({
    partnerId: null,
    partnerName: '',
    chatId: null
  });

  // Все наши диалоги
  dialogBranches: any = []

  // Тут мы сохраняем id выбранного диалога
  selectedDialog: any = null;

  // Переменные для анимаций загрузки
  checkUserLoading: boolean = true;
  getContentLoading: boolean = true;

  // Для меню
  x_menu_pos: number = 0;
  y_menu_pos: number = 0;
  show_menu: boolean = false;

  // Для диалогового окна
  error_dialog: boolean = false;
  error_dialog_text = ''

  async mounted() {
    // Проверяем авторизацию
    await this.checkUserAuth()

    // Получаем ветку диалогов
    await this.getChatList()

    // Выбираем текущий диалог, если в ссылке есть id диалога
    await this.getDialogIdInsideLink()
  }

  async checkUserAuth() {
    // Проверяем авторизован ли человек
    if (!(localStorage.getItem('accessToken'))) {
      localStorage.removeItem('accessToken');
      return await this.$router.push('/auth/login')
    }

    // Заканчиваем анимацию загрузки "Циркуляра"
    this.checkUserLoading = false;
  }

  async getChatList() {
    // Проходим дальше, делаем запрос на
    await this.$axios.get("/api/chat", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      // если запрос отработал штатно
      .then((response) => {
        this.dialogBranches = response.data
        logger(this.dialogBranches)
      })
      // в случае, если у нас ошибка
      .catch((error) => {
        logger(`Bearer ${localStorage.getItem('accessToken')}`)
        logger(error)
        localStorage.removeItem('accessToken')
        this.$router.push('/auth/login')
      })
      // в независимости от исхода запроса, убираем анимацию загрузки
      .finally(() => {
        // заканчиваем анимацию "Скелетона" на диалогах
        this.getContentLoading = false;


        /*// Удалить!!!! СДЕЛАНО ДЛЯ ТЕСТА!!!!
        this.dialogBranches = [
          {
            partnerName: 'KekV',
            lastMessageContent: 'last message...',
          }
        ]*/

      })
  }

  // Предположительно, id диалога будет только число, делаю проверку на правильность
  async getDialogIdInsideLink() {
    // Получаем из ссылки id диалога (помним, он идет в виде строки)
    const currentRoute = this.$router.currentRoute.params.id
    logger(currentRoute)
    // Если ничего нет, функция не отрабатывает
    if (!currentRoute) return

    // Если любое значение не число, то сообщаем пользователю о невалидности и перекидываем на индекс
    if (!Number.isInteger(Number(currentRoute))) {

      await this.$router.push('/')

      this.error_dialog = true
      this.error_dialog_text = 'Такого диалога не существует!'

      return
    }

    // передаём значение в качестве числа
    //return this.chatId = +currentRoute

  }

  // Показываем диалог по клику
  show(e: any): void {
    e.preventDefault()
    this.show_menu = false
    this.x_menu_pos = e.clientX
    this.y_menu_pos = e.clientY
    this.$nextTick(() => {
      this.show_menu = true
    })
  }

  //Для проверки работы selectDialog
  @Watch('selectedDialog')
  changeSelectedDialog() {
    logger("Выбран: " + this.selectedDialog + " диалог")
    if (this.selectedDialog != undefined) {
      const selectedDialog = this.dialogBranches[this.selectedDialog]
      this.parentDate.chatId = selectedDialog.chatId
      this.parentDate.partnerId = selectedDialog.partnerId
      this.parentDate.partnerName = selectedDialog.partnerName
      return this.$router.push('/' + (selectedDialog.chatId ?? ''))
    }
  }
}
</script>
<style scoped>
.messageListBranch__img img {
  display: block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.messageListBranch__body {
  margin-left: 10px;
}

.messageListBranch__name {
  font-size: 14px;
}

.messageListBranch__text {
  font-size: 13px;
  color: #8a8a8a !important;
}
</style>
