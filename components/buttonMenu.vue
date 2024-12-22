<template>
  <div>
    <!-- кнопка для выдвижения меню -->
    <div>
      <v-btn class="ma-2 ml-2"
             color="white"
             fab
             small
             @click.stop="changeDrawer"
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
        <v-list-item class="mb-10">
          <v-row justify="space-between" align="center">
            <v-btn
              class="ma-1"
              color="black"
              icon
              large
              @click="changeDrawer">
              <v-icon>
                mdi-keyboard-backspace
              </v-icon>
            </v-btn>

            <div>
              <v-btn
                color="orange"
                elevation="2"
                icon
                large
                @click="changePatch"
                outlined>
                <v-icon>
                  mdi-pencil
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
            </div>
          </v-row>
        </v-list-item>
        <v-list-item>
          <div v-if="patch" class="d-flex flex-column align-center pa-4" style="width: 100%">
            <v-card outlined class="pa-3 mb-4" style="width: 100%; max-width: 320px;">
              <v-card-title>
                <v-icon class="mr-2" color="blue">mdi-information-outline</v-icon>
                <span class="text-h6">Личная информация</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <div class="mb-2">
                  <strong>Телефон:</strong> {{ localModel.number || 'Не указано' }}
                </div>
                <div class="mb-2">
                  <strong>Имя:</strong> {{ localModel.firstName || 'Не указано' }}
                </div>
                <div class="mb-2">
                  <strong>Фамилия:</strong> {{ localModel.lastName || 'Не указано' }}
                </div>
                <div class="mb-2">
                  <strong>Имя пользователя:</strong> {{ localModel.username || 'Не указано' }}
                </div>
                <div class="mb-2">
                  <strong>О себе:</strong> {{ localModel.bio || 'Не указано' }}
                </div>
              </v-card-text>
            </v-card>
          </div>
          <div v-else
               class="d-flex justify-center align-center flex-column" style="width: 100%">
            <v-card outlined class="pa-3 mb-4" style="width: 100%; max-width: 320px;">
              <v-card-title>
                <v-icon class="mr-2" color="orange">mdi-pencil</v-icon>
                <span class="text-h6">Редактировать данные</span>
              </v-card-title>
              <v-tabs v-model="tab" fixed-tabs>
                <!-- Вкладка Телефон -->
                <v-tab
                  href="#mobile-tabs-5-1"
                  class="primary--text"
                >
                  <v-icon>mdi-phone</v-icon>
                </v-tab>

                <!-- Вкладка Остальные данные -->
                <v-tab
                  href="#mobile-tabs-5-2"
                  class="primary--text"
                >
                  <v-icon>mdi-account-box-edit-outline</v-icon>
                </v-tab>
              </v-tabs>
              <v-divider></v-divider>

              <v-tabs-items v-model="tab">
                <!-- Первый таб: Авторизация телефона -->
                <v-tab-item value="mobile-tabs-5-1">
                  <v-card-text>
                    <div class="mb-2">
                      <v-text-field
                        v-model="model.number"
                        label="Телефон"
                        v-mask="`+7##########`"
                        :rules="[rules.length(12)]"
                        type="text"
                        outlined
                      />
                      <v-card-actions class="justify-end">
                        <v-btn
                          color="green"
                          @click="saveChangesNumber"
                        >
                          Сохранить
                        </v-btn>
                      </v-card-actions>
                    </div>
                  </v-card-text>
                </v-tab-item>

                <!-- Второй таб: Остальные данные -->
                <v-tab-item value="mobile-tabs-5-2">
                  <v-card-text>
                    <div class="mb-2">
                      <v-text-field
                        v-model="model.firstName"
                        label="Имя"
                        :rules="[rules.inputLength.minLength(1), rules.inputLength.maxLength(20)]"
                        type="text"
                        outlined
                      />
                    </div>
                    <div class="mb-2">
                      <v-text-field
                        v-model="model.lastName"
                        label="Фамилия"
                        :rules="[rules.inputLength.minLength(1), rules.inputLength.maxLength(20)]"
                        type="text"
                        outlined
                      />
                    </div>
                    <div class="mb-2">
                      <v-text-field
                        v-model="model.username"
                        label="Имя пользователя"
                        :rules="[rules.inputLength.minLength(1), rules.inputLength.maxLength(20)]"
                        type="text"
                        outlined
                      />
                    </div>
                    <div class="mb-2">
                      <v-textarea
                        v-model="model.bio"
                        label="О себе"
                        :rules="[rules.inputLength.maxLength(100)]"
                        outlined
                      ></v-textarea>
                    </div>
                    <!-- Кнопка для сохранения изменений -->
                    <v-card-actions class="justify-end">
                      <v-btn
                        color="green"
                        @click="saveChangesOther"
                      >
                        Сохранить
                      </v-btn>
                    </v-card-actions>
                  </v-card-text>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';

@Component({})
export default class buttonMenu extends Vue {

  model: any = {
    number: "",
    firstName: "",
    lastName: "",
    username: "",
    bio: ""
  }

  localModel: any = {
    number: "",
    firstName: "",
    lastName: "",
    username: "",
    bio: ""
  }

  //Отслеживание состояния меню
  drawer = false;

  //Отслеживание изменения информации профиля
  patch = true;

  tab: number = 0;

  rules = {
    length: (len: any) => (v: any) =>
      (v || '').length >= (len ?? 8) ||
      `Недопустимая длина символов`,
    inputLength: {
      minLength: (len: any) => (v: any) =>
        (v || '').length >= (len ?? 8) || `Не может быть меньше ${len} символов`,
      maxLength: (len: any) => (v: any) =>
        (v || '').length <= (len ?? 8) || `Не может быть больше ${len} символов`
    },
  }

  changeDrawer() {
    this.drawer = !this.drawer;
    this.patch = true;
  }

  changePatch() {
    this.patch = !this.patch;
    this.model.number = this.localModel.number;
    this.model.firstName = this.localModel.firstName;
    this.model.lastName = this.localModel.lastName;
    this.model.username = this.localModel.username;
    this.model.bio = this.localModel.bio || "";
  }

  initValues() {
    this.localModel.number = localStorage.getItem('number');
    this.localModel.username = localStorage.getItem('username');
    this.localModel.firstName = localStorage.getItem('firstName');
    this.localModel.lastName = localStorage.getItem('lastName');
    this.localModel.bio = localStorage.getItem('bio') || null
  }

  async exitAccount() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('number')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('username')
    localStorage.removeItem('bio')
    return await this.$router.push('/auth/login')
  }

  async saveChangesOther() {

  }

  async saveChangesNumber() {

  }

  mounted(): void {
    this.initValues()
  }
}
</script>
<style scoped>

</style>
