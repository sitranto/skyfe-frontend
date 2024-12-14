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

      <div v-else>
        <!-- используем v-list для вывода диалогов -->
        <!-- color="transparent"-->
        <v-list v-if="dialogBranches.length" dense
                style="width: 360px; height: 100vh; background-color: white">
          <v-list-item-group v-model="selectedDialog" color="primary">
            <!-- карточка диалога в списке диалогов -->
            <v-virtual-scroll
              :items="dialogBranches"
              height="calc(100vh - 100px)"
              item-height="64"
            >
              <template v-slot:default="{ item }">
                <v-list-item>
                  <div>
                    <!-- <v-img src="" alt="#"/>-->
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
        <div>
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
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class Default extends Vue {
  checkUserLoading: boolean = true;
  getContentLoading: boolean = true;

  dialogBranches: any = [];
  // dialogBranches: any = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

  mounted() {
    setTimeout(() => {
      this.checkUserLoading = false;
    }, 1000)

    setTimeout(() => {
      this.getContentLoading = false;
    }, 3000)
  }

}
</script>
<style scoped>

</style>
