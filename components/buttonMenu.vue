<template>
  <div>
    <!-- кнопка для выдвижения меню -->
    <div>
      <v-btn class="ma-1"
             color="white"
             fab
             small
             @click.stop="changeDrawer"
             elevation="0">
        <v-icon dark>mdi-menu</v-icon>
      </v-btn>
    </div>

    <!-- Разметка меню -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      width="360px">
      <!-- Содержимое меню -->
      <v-list>
        <!-- Кнопки сверху меню -->
        <v-list-item class="mb-10">
          <v-row justify="space-between" align="center">
            <v-btn
              class="ma-1"
              color="black"
              icon
              large
              @click="changeDrawer">
              <v-icon>mdi-keyboard-backspace</v-icon>
            </v-btn>

            <div>
              <v-btn
                color="orange"
                elevation="2"
                icon
                large
                @click="changePatch"
                outlined>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn
                class="ma-1"
                color="red"
                elevation="2"
                icon
                large
                @click="exitAccount"
                outlined>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-btn>
            </div>
          </v-row>
        </v-list-item>

        <!-- Информация о пользователе -->
        <v-list-item>
          <!-- Текущая информация о пользователе -->
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

          <!-- Поле изменения информации -->
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
                  <v-form v-model="validForm.one" ref="validFormOne">

                    <v-card-text>
                      <div class="mb-2">
                        <!-- Ввод телефона -->
                        <v-text-field
                          v-model="model.number"
                          label="Телефон"
                          v-mask="`+7##########`"
                          :rules="[rules.length(12)]"
                          type="text"
                          outlined
                        />
                      </div>
                    </v-card-text>

                    <!-- Кнопка сохранения -->
                    <v-card-actions class="justify-end">
                      <v-btn dark
                             color="green"
                             @click="checkNumber"
                      >
                        Сохранить
                      </v-btn>
                    </v-card-actions>

                  </v-form>
                </v-tab-item>

                <!-- Второй таб: Остальные данные -->
                <v-tab-item value="mobile-tabs-5-2">
                  <v-form v-model="validForm.two" ref="validFormTwo">

                    <v-card-text>
                      <!-- Ввод имени -->
                      <div class="mb-2">
                        <v-text-field
                          v-model="model.firstName"
                          label="Имя"
                          :rules="[rules.required,
                          rules.lengthName(3,32,true)
                          ]"
                          type="text"
                          outlined
                        />
                      </div>
                      <!-- Ввод фамилии -->
                      <div class="mb-2">
                        <v-text-field
                          v-model="model.lastName"
                          label="Фамилия"
                          :rules="[rules.lengthName(3,32,true)]"
                          type="text"
                          outlined
                        />
                      </div>
                      <!-- Ввод username -->
                      <div class="mb-2">
                        <v-text-field
                          v-model="model.username"
                          label="Имя пользователя"
                          :rules="[rules.required,
                          rules.lengthName(3,32,false)
                          ]"
                          type="text"
                          outlined
                        />
                      </div>
                      <!-- Ввод информации О себе -->
                      <div class="mb-2">
                        <v-textarea
                          rows="5"
                          counter="100"
                          v-model="model.bio"
                          label="О себе"
                          :rules="[rules.lengthName(0,100,true)]"
                          outlined/>
                      </div>
                    </v-card-text>

                    <!-- Кнопка для сохранения изменений -->
                    <v-card-actions class="justify-end">
                      <v-btn dark
                             color="green"
                             @click="saveChangesOther"
                      >
                        Сохранить
                      </v-btn>
                    </v-card-actions>

                  </v-form>
                </v-tab-item>
              </v-tabs-items>

            </v-card>
          </div>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <!-- Разметка диалогового окна -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="pa-3">
        <v-card-title>
          Введите пароль
        </v-card-title>
        <div>
          <v-text-field
            label="Пароль"
            type="text"
            v-model="model.password"
            :rules="[
              rules.required,
              rules.password.lengthInRange,
            ]"
            :append-icon="showPass.one ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass.one ? 'text' : 'password'"
            @click:append="showPass.one = !showPass.one"/>
        </div>
        <!-- Блок кнопок -->
        <v-card-actions class="justify-end">
          <v-btn dark
                 @click="closeDialog"
                 color="red">
            Отмена
          </v-btn>
          <v-btn dark
                 @click="saveChangesNumber"
                 color="green">
            Изменить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
// @ts-ignore
import logger from "~/assets/scripts/logger";

@Component({})
export default class buttonMenu extends Vue {

  showPass = {
    one: false,
  }

  model: any = {
    number: "",
    password: "",
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

  dialog: boolean = false;

  //Отслеживание состояния меню
  drawer = false;

  //Отслеживание изменения информации профиля
  patch = true;

  tab: number = 0;

  validForm: any = {
    one: false,
    two: false,
  };

  // Правила для валидации
  rules = {
    length: (len: any) => (v: any) =>
      (v || '').length >= (len ?? 8) ||
      `Недопустимая длина символов`,

    lengthName: (min: number, max: number, type: boolean) => (v: any) => {
      const len = (v || '').length; // Если поле пустое, длина равна 0
      if ( type && len === 0) {
        return true; // Если поле необязательно и пустое — всё валидно
      }
      return len >= min && len <= max
        ? true
        : `Разрешенная длина от ${min} до ${max} символов`;
    },

    password: {
      /* rule: (v: any) =>
       !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
       'Пароль должен содержать заглавную букву, цифру и специальный символ.',*/
      lengthInRange: (v: any) => {
        const len = (v || '').length; // Если пароль пустой, считаем длину как 0
        return len >= 8 && len <= 32
          ? true // Если длина в пределах диапазона
          : "Пароль должен быть от 8 до 32 символов"; // Сообщение об ошибке
      },
    },

    required: (v: any) => !!v || 'Это поле обязательно к заполнению',
  }

  mounted(): void {
    this.initValues()
  }

  closeDialog(): void {
    this.dialog = false;
    this.model.password = "";
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
    localStorage.clear()
    return await this.$router.push('/auth/login')
  }

  // Изменение личной информации
  async saveChangesOther() {

    // Проверка полей на изменение
    if ((this.model.firstName == this.localModel.firstName) && (this.model.lastName == this.localModel.lastName) &&
      (this.model.username == this.localModel.username) && (this.model.bio == this.localModel.bio)) {
      logger("not changed");
      return;
    }

    this.validateForm("validFormTwo") && await this.$axios.patch("/api/user/change/data", {
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        username: this.model.username,
        bio: this.model.bio,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then((response) => {
        logger(response);
        localStorage.setItem('firstName', this.model.firstName);
        localStorage.setItem('lastName', this.model.lastName);
        localStorage.setItem('username', this.model.username);
        localStorage.setItem('bio', this.model.bio);

        this.patch = !this.patch;
        this.initValues();
      })
      .catch((error) => {
        logger(error);
      })
  }

  // Проверка изменения телефона
  // и включение диалога для подтверждения пароля
  checkNumber() {
    if (this.model.number == this.localModel.number) {
      logger("not changed number");
      return;
    }
    this.validateForm("validFormOne") && (this.dialog = !this.dialog)
  }

  // запрос на изменение телефона
  async saveChangesNumber() {

    await this.$axios.patch("/api/user/change/number", {
        number: this.model.number,
        password: this.model.password
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then((response) => {
        logger(response.data.accessToken);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('number', this.model.number);

        this.model.password = ""
        this.dialog = !this.dialog;
      })
      .catch((error) => {
        logger(error);
      })

  }

  validateForm(val: string): boolean {
    // @ts-ignore
    return this.$refs[val].validate()
  }
}
</script>
<style scoped>

</style>
