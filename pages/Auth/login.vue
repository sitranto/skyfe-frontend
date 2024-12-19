<template>
  <!-- делаю обёрточный тэг v-form, чтобы накинуть валидацию -->
  <v-form v-model="validForm" ref="validForm">
    <v-card class="ma-0 mt-15 pa-0"
            style="background-color: transparent !important;"
            :disabled="loading"
            :loading="loading"
            elevation="0">
      <div class="mt-4">
        <v-text-field class="custom-input"
                      label="Phone"
                      type="text"
                      v-model="model.number"
                      v-mask="`+7##########`"
                      :rules="[rules.required, rules.length(12)]"
                      outlined/>
      </div>

      <div>
        <v-text-field class="custom-input"
                      label="Password"
                      type="password"
                      color="#8A138C"
                      :rules="[
                      rules.required,
                      //rules.password.rule,
                      rules.password.minLength(8),
                      rules.password.maxLength(32)
                      ]"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPass ? 'text' : 'password'"
                      @click:append="showPass = !showPass"
                      v-model="model.password"
                      outlined/>
      </div>
      <div class="auth-actions d-flex align-center justify-center flex-column">
        <div>
          <v-btn
            class="text-none auth-button--outlined"
            outlined
            color="#8A138C"
            width="150px"
            height="40px"
            @click.prevent="auth"
          >Войти
          </v-btn>
        </div>

        <div class="mt-2">
          <a class="auth-button--text" href="#" @click.prevent="$router.push(`/auth/reg`)">Создать аккаунт</a>
        </div>
      </div>
      <div class="modal" v-show="modal">
        <v-alert
          color="red"
          dense
          elevation="3"
          outlined
          prominent
          type="error">
          Неверно введены данные
        </v-alert>
      </div>
    </v-card>
  </v-form>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';

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

  modal: boolean = false
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
      minLength: (len: any) => (v: any) =>
        (v || '').length >= (len ?? 8) || `Пароль не может быть меньше ${len} символов`,
      maxLength: (len: any) => (v: any) =>
        (v || '').length <= (len ?? 8) || `Пароль не может быть больше ${len} символов`
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

    this.validateForm && await this.$axios.post("/api/auth", this.model, {})
      .then((response) => {
        const jwt: any = response.data.accessToken;
        if (jwt) {
          localStorage.setItem("accessToken", jwt);
          //console.log("jwt token сохранён");
          this.$router.push("/");
        }
      })
      .catch(() => {
        this.modal = true
      })
      .finally(() => {
        this.loading = false;
        let interval = setInterval(() => {
          this.modalTimer += 1
          if (this.modalTimer >= 5) {
            this.modal = false
            clearInterval(interval)
            this.modalTimer = 0
          }
        }, 1000)
      })

    this.loading = true

    // На случай, если запрос не сработает, мы всё равно включаем форму обратно
    this.loading = false;
  }

  @Watch("model.number")
  changeModelPhone() {
    console.log(this.model.number)
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
