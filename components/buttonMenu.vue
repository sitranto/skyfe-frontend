<template>
  <div>
    <!-- кнопка для выдвижения меню -->
    <div>
      <v-btn class="ma-2 ml-3"
             color="white"
             fab
             small
             @click.stop="drawer = !drawer"
             elevation="0">
        <v-icon dark>
          mdi-menu
        </v-icon>
      </v-btn>
    </div>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      width="360px"
    >
      <v-list>
        <v-list-item>
          <v-row justify="space-between" align="center">
            <v-btn
              class="ma-1"
              color="black"
              icon
              large
              @click="drawer = !drawer">
              <v-icon>
                mdi-keyboard-backspace
              </v-icon>
            </v-btn>

            <v-btn
              class="ma-1"
              color="red"
              elevation="2"
              icon
              large
              @click="exitAccount"
              outlined>
              <v-icon>
                mdi-exit-to-app
              </v-icon>
            </v-btn>
          </v-row>
        </v-list-item>
        <v-list-item>
          <div class="d-flex justify-center align-center flex-column" style="width: 100%">
            <div class="mb-2">
              <v-text-field class="custom-input-menu pa-0 ma-0"
                            v-model="model.phone"
                            label="Телефон"
                            type="text"
                            hide-details
                            outlined/>
            </div>
            <div class="mb-2">
              <v-text-field class="custom-input-menu pa-0 ma-0"
                            v-model="model.firstName"
                            label="Имя"
                            type="text"
                            hide-details
                            outlined/>
            </div>
            <div class="mb-2">
              <v-text-field class="custom-input-menu pa-0 ma-0"
                            v-model="model.lastName"
                            label="Фамилия"
                            type="text"
                            hide-details
                            outlined/>
            </div>
            <div class="mb-2">
              <v-text-field class="custom-input-menu pa-0 ma-0"
                            v-model="model.username"
                            label="Имя пользователя"
                            type="text"
                            hide-details
                            outlined/>
            </div>
            <div class="mb-2">
              <v-textarea
                outlined
                name="input-7-4"
                label="О себе"
                v-model="model.bio"
              ></v-textarea>
            </div>

            <v-btn
              depressed
              color="primary"
            >
              Сохранить
            </v-btn>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class buttonMenu extends Vue {

  model: any = {
    phone: "",
    firstName: "",
    lastName: "",
    username: "",
    bio: ""
  }

  //Отслеживание состояния меню
  drawer = false;

  async exitAccount() {
    await localStorage.removeItem('accessToken');
    return await this.$router.push('/auth/login');
  }

  async saveInfo () {

  }
}
</script>
<style scoped>

</style>
