<template>
  <div>
    <v-card class="ma-0 mt-15 pa-0"
            style="background-color: transparent !important;"
            :disabled="stepLoading"
            :loading="stepLoading"
            elevation="0">

      <v-stepper v-model="stepper" elevation="0"
                 style="background-color: transparent !important;">

        <v-form v-model="validForm.one" ref="validFormOne">
          <v-stepper-items>
            <!-- Первый шаг -->
            <v-stepper-content :step="1" class="ma-0 pa-0">

              <!-- Ввод телефона -->
              <div class="mt-5">
                <v-text-field class="custom-input"
                              v-mask="`+7##########`"
                              v-model="model.number"
                              label="Телефон"
                              type="text"
                              :rules="[rules.required, rules.length(12)]"
                              outlined/>
              </div>

              <!-- Блок кнопок -->
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  class="d-block text-none auth-button--outlined mt-5 px-7"
                  outlined
                  color="#8A138C"
                  @click="checkPhoneAndCont"
                  height="45px">
                  Проверка телефона
                </v-btn>
              </v-card-actions>

            </v-stepper-content>
          </v-stepper-items>
        </v-form>

        <v-form v-model="validForm.two" ref="validFormTwo">
          <v-stepper-items>
            <!-- Второй шаг -->
            <v-stepper-content :step="2">

              <!-- Ввод имени -->
              <div class="mt-5">
                <v-text-field class="custom-input"
                              label="Имя"
                              v-model="model.firstName"
                              :rules="[rules.required,
                              rules.lengthName(3,32,false)
                              ]"
                              type="text"
                              outlined/>
              </div>

              <!-- Ввод фамилии -->
              <div>
                <v-text-field class="custom-input"
                              label="Фамилия (Опционально)"
                              v-model="model.lastName"
                              :rules="[rules.lengthName(3,32,true)]"
                              type="text"
                              outlined/>
              </div>

              <!-- Ввод юзернейма -->
              <div>
                <v-text-field class="custom-input"
                              label="Username"
                              v-model="model.username"
                              :rules="[rules.required,
                              rules.lengthName(3,32,false)
                              ]"
                              type="text"
                              outlined/>
              </div>

              <!-- Блок кнопок -->
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  class="d-block text-none auth-button--outlined mt-5 px-7"
                  @click="stepper--"
                  outlined
                  color="#8A138C"
                  height="45px">
                  Назад
                </v-btn>

                <v-btn
                  @click="checkUserNameAndCont"
                  class="d-block text-none auth-button--outlined mt-5 px-7"
                  outlined
                  color="#8A138C"
                  height="45px">
                  Далее
                </v-btn>
              </v-card-actions>

            </v-stepper-content>
          </v-stepper-items>
        </v-form>

        <v-form v-model="validForm.three" ref="validFormThree">
          <v-stepper-items>
            <!-- Третий шаг -->
            <v-stepper-content :step="3">

              <!-- Ввод пароля -->
              <div class="mt-5">
                <v-text-field class="custom-input"
                              label="Пароль"
                              type="password"
                              color="#8A138C"
                              v-model="model.password"
                              :rules="[
                              rules.required,
                              /*rules.password.rule,*/
                              rules.password.lengthInRange
                              ]"
                              :append-icon="showPass.one ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="showPass.one ? 'text' : 'password'"
                              @click:append="showPass.one = !showPass.one"
                              outlined/>
              </div>

              <!-- Повторение пароля -->
              <div>
                <v-text-field class="custom-input"
                              label="Повторение пароля"
                              type="password"
                              color="#8A138C"
                              v-model="passRepeat"
                              :rules="[
                              rules.required,
                              rules.match(model.password),
                              ]"
                              :append-icon="showPass.two ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="showPass.two ? 'text' : 'password'"
                              @click:append="showPass.two = !showPass.two"
                              outlined/>
              </div>

              <!-- Блок кнопок -->
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  @click="stepper--"
                  class="d-block text-none auth-button--outlined mt-5 px-7"
                  outlined
                  color="#8A138C"
                  height="45px">
                  Назад
                </v-btn>

                <v-btn
                  @click="registration"
                  class="d-block text-none auth-button--outlined mt-5 px-7"
                  outlined
                  color="#8A138C"
                  height="45px">
                  Регистрация
                </v-btn>
              </v-card-actions>

            </v-stepper-content>
          </v-stepper-items>
        </v-form>

      </v-stepper>
    </v-card>

    <!-- Кнопка возврата на авторизацию -->
    <div class="auth-actions isRegPage d-flex align-center justify-center flex-column">
      <div>
        <a class="auth-button--text" href="#" @click.prevent="$router.push(`/auth/login`)">Войти</a>
      </div>
    </div>

    <!-- Создание модального окна -->
    <div class="modal" v-show="modal">
      <v-alert
        color="red"
        dense
        elevation="3"
        outlined
        prominent
        type="error">
        {{ modalValue }}
      </v-alert>
    </div>

  </div>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
// @ts-ignore
import logger from "~/assets/scripts/logger";

@Component({
  layout: "auth"
})
export default class reg extends Vue {

  model: any = {
    number: "+7",
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  }

  passRepeat: string = ""

  showPass: any = {
    one: false,
    two: false,
  }

  // Объект для проверки валидации
  validForm: any = {
    one: false,
    two: false,
    three: false,
  };

  // Переменные для степпера
  stepLoading: boolean = false
  stepper: number = 1

  // Переменные для управления модальным окном
  modal: boolean = false
  modalValue: string = ""
  modalTimer: number = 0

  // Правила для полей
  rules = {
    match: (match: any) => (v: any) =>
      (!!v && v) === match || "Пароли должны совпадать",

    length: (len: any) => (v: any) =>
      (v || "").length >= (len ?? 8) ||
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

    required: (v: any) => !!v || "Это поле обязательно к заполнению"
  };

  // Проверка на уникальность телефона
  async checkPhoneAndCont() {

    this.validateForm(`validFormOne`) && await this.$axios.post("/api/user/number", {
        number: this.model.number
      },
      {})
      .then((response) => {
        logger(response.data)
        if (response.data == "OK") {
          this.stepLoading = true
          this.nextStep()
        } else {
          this.modalValue = "Такой номер телефона уже используется"
          this.modal = true
        }
      })
      .catch((error) => {
        this.modalValue = "Ошибка запроса"
        this.modal = true
        logger(error)
      })
      .finally(() => {
       this.funcModalHide()
      })

  }

  // Проверка уникальности username
  async checkUserNameAndCont() {

    this.validateForm(`validFormTwo`) && await this.$axios.post("/api/user/username", {
        username: this.model.username
      },
      {})
      .then((response) => {
        if (response.data == "OK") {
          this.stepLoading = true
          this.nextStep()
        } else {
          this.modalValue = "Такой username уже используется"
          this.modal = true
        }
      })
      .catch((error) => {
        this.modalValue = "Ошибка запроса"
        this.modal = true
        logger(error)
      })
      .finally(() => {
        this.funcModalHide()
      })
  }

  // Запрос на регистрацию аккаунта
  async registration() {

    this.validateForm(`validFormThree`) && await this.$axios.post("/api/user", this.model, {})
      .then((response) => {
        const data = response.data
        logger("jwt token сохранён");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("number", data.number);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("username", data.username);

        this.$router.push("/");
      })
      .catch((error) => {
        this.modalValue = "Ошибка запроса"
        this.modal = true
        logger(error)
      })
      .finally(() => {
        this.funcModalHide()
      })
  }

  nextStep() {
    return this.stepper++;
  }

  // Функция для исчезновения модального окна
  funcModalHide () {
    this.stepLoading = false
    let interval = setInterval(() => {
      this.modalTimer += 1
      if (this.modalTimer >= 5) {
        this.modal = false
        this.modalValue = ""
        clearInterval(interval)
        this.modalTimer = 0
      }
    }, 1000)
  }

  @Watch("model.number")
  changeModelPhone() {
    if (this.model.number.length <= 2) {
      return this.model.number = "+7"
    }
  }

  validateForm(val: string): boolean {
    // @ts-ignore
    return this.$refs[val].validate()
  }
}
</script>
<style scoped>

</style>
