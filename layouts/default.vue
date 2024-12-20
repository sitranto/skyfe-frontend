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
          <v-list-item-group v-model="selectedDialog" color="primary">
            <!-- карточка диалога в списке диалогов -->
            <v-virtual-scroll
              :items="dialogBranches"
              height="calc(100vh - 10px)"
              item-height="70"
            >
              <template v-slot:default="{ item }">
                <v-list-item class="messageListBranch">
                  <div class="messageListBranch__container d-flex align-center">

                    <div class="messageListBranch__img">
                      <img src="https://placehold.co/48x48" alt="img">
                    </div>

                    <div class="messageListBranch__body">
                      <div class="messageListBranch__name" v-text="item.partnerName" />
                      <div class="messageListBranch__text" v-html="item.lastMessageContent" />
                    </div>

                  </div>
                </v-list-item>
              </template>
            </v-virtual-scroll>

          </v-list-item-group>
        </v-list>

        <!-- Тут мы выводим разметку, в случае если диалогов не будет -->
        <div v-else class="d-flex justify-center align-center"
             style="width: 360px; height: 100vh; background-color: white">
          <div>
            Нет диалогов
          </div>
        </div>

        <!-- Тут у нас активное окно с диалогом -->
        <div class="px-2" style="width: calc(100% - 360px);">
          <Nuxt/>
        </div>

      </div>
    </div>


    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
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

@Component({

})
export default class Default extends Vue {
  checkUserLoading: boolean = true;
  getContentLoading: boolean = true;

  // dialogBranches: any = [];
  dialogBranches: any = []

  @Provide() chatId: number = this.selectedDialog

  selectedDialog: any = null;
  showMenu: boolean = false;
  x: number = 0;
  y: number = 0;

  show(e: any): void {
    e.preventDefault()
    this.showMenu = false
    this.x = e.clientX
    this.y = e.clientY
    this.$nextTick(() => {
      this.showMenu = true
    })
  }

  async mounted() {
    // 1. Проверяем авторизован ли человек
    if (!(localStorage.getItem('accessToken'))) {
      localStorage.removeItem('accessToken');
      await this.$router.push('/auth/login')
    }

    await this.$axios.get("/api/chat", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((response) => {
        this.dialogBranches = response.data
        logger(this.dialogBranches)
      })
      .catch((error) =>{
        logger(error)
      })

    this.checkUserLoading = false;

    // 2. Смотрим текущую ссылку, если в ней выбран диалог, то смотрим какой
    const currentRoute = this.$router.currentRoute.params.id

    // тут мы получаем значение с нашей ссылки, после, ищем id (или то значение, по которому будет идентифицироваться
    // выбранный диалог в ссылке)

    // тут делаем запрос, смотрим, есть ли вообще этот диалог, и имеет ли доступ к нему пользователь?

    // если всё гуд, то заносим его в переменную selectedDialog, и отображаем его в списке как выбранный
    // если же нет, переносим его на '/' или всячески сообщаем пользователю, что у него нет доступа


    setTimeout(() => {
      this.getContentLoading = false;
    }, 1000)
  }

  // При изменении диалога, меняем страницу
  @Watch('selectedDialog')
  changeCurrentRouteMessageBranch() {
    this.$router.push('/' + (this.dialogBranches[this.selectedDialog] ?? ''))
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

