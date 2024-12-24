<template>
  <!-- делаю обёрточный тэг v-form, чтобы накинуть валидацию -->
  <v-form v-model="validForm" ref="validForm">
    <v-card class="ma-0 mt-15 pa-0"
            style="background-color: transparent !important;"
            :disabled="loading"
            :loading="loading"
            elevation="0">

      <!-- Блок для инпута -->
      <div class="mt-4">
        <!-- Ввод телефона -->
        <v-text-field class="custom-input"
                      label="Телефон"
                      type="text"
                      v-model="model.number"
                      v-mask="`+7##########`"
                      :rules="[rules.required, rules.length(12)]"
                      outlined/>
      </div>

      <!-- Ввод пароля -->
      <div>
        <v-text-field class="custom-input"
                      label="Пароль"
                      type="password"
                      v-model="model.password"
                      color="#8A138C"
                      :rules="[
                      rules.required,
                      //rules.password.rule,
                      rules.password.lengthInRange
                      ]"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPass ? 'text' : 'password'"
                      @click:append="showPass = !showPass"
                      @keyup.enter="auth"
                      outlined/>
      </div>

      <!-- Поля для кнопок -->
      <div class="auth-actions d-flex align-center justify-center flex-column">
        <div>
          <v-btn
            class="text-none auth-button--outlined"
            color="#8A138C"
            width="150px"
            height="40px"
            @click.prevent="auth"
            outlined>
            Войти
          </v-btn>
        </div>

        <div class="mt-2">
          <a class="auth-button--text" href="#" @click.prevent="$router.push(`/auth/reg`)">Создать аккаунт</a>
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
    </v-card>
  </v-form>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
// @ts-ignore
import logger from "~/assets/scripts/logger";

@Component({
  layout: "auth"
})
export default class login extends Vue {

  validForm: boolean = false;
  loading: boolean = false;
  showPass: boolean = false;

  model: any = {
    number: "+7",
    password: ""
  }

  // Переменные для управления модальным окном
  modal: boolean = false
  modalValue: string = "";
  modalTimer: number = 0

  /* rules отвечает за то, как правильно вбиты поля, исходя из них, форма становится валидной либо же нет */
  rules = {
    length: (len: any) => (v: any) =>
      (v || '').length >= (len ?? 8) ||
      `Недопустимая длина символов`,
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

  async auth() {
    // перевёл все условия на rules
    // подробнее как работает, смотри по ссылке ниже
    // https://v2.vuetifyjs.com/en/components/text-fields/#custom-validation
    // и тут
    // https://v2.vuetifyjs.com/en/components/forms/#rules

    this.loading = true;

    // По нажатию кнопки логина, мы валидируем форму,
    // Это сделано для того, чтобы пользователь не смог пустую форму отправить на логин
    // Если валидация успешна, мы пропускаем дальше, нет, ну иди заполняй форму
    logger(this.model);

    // Запрос на вход
    this.validateForm && await this.$axios.post("/api/auth", this.model, {})
      .then((response) => {
        const data = response.data
        logger("jwt token сохранён");
        logger(data.bio)
        logger("name: " + data.firsName, "secondName: " + data.lastName);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("number", data.number);
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("username", data.username);
        if (data.bio != null) {
          localStorage.setItem('bio', data.bio);
        }

        this.$router.push("/");
      })
      .catch((error) => {
        logger("error");
        this.modal = true
        this.modalValue = "Введены неверные данные"
      })
      .finally(() => {
        this.loading = false;
        let interval = setInterval(() => {
          this.modalTimer += 1
          if (this.modalTimer >= 5) {
            this.modal = false
            this.modalValue = ""
            clearInterval(interval)
            this.modalTimer = 0
          }
        }, 1000)

      })

    this.loading = true

    // На случай, если запрос не сработает, мы всё равно включаем форму обратно
    this.loading = false;
  }

  // Для слежения за номером телефона
  @Watch("model.number")
  changeModelPhone() {
    logger(this.model.number)
    if (this.model.number.length <= 2) {
      return this.model.number = "+7"
    }
  }

  get validateForm() {
    // @ts-ignore
    return this.$refs.validForm.validate()
  }
}
</script>
<style scoped>

</style>
