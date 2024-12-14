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
                      v-model="model.phone"
                      v-mask="`+7##########`"
                      :rules="[rules.required, rules.length(12)]"
                      outlined/>
      </div>

      <div>
        <v-text-field class="custom-input"
                      label="Password"
                      type="password"
                      color="#8A138C"
                      :rules="[rules.required, rules.password]"
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
    </v-card>
  </v-form>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import * as string_decoder from "node:string_decoder";

@Component({
  layout: "auth"
})
export default class login extends Vue {
  validForm: boolean = false;
  loading: boolean = false;
  showPass: boolean = false;

  model: any = {
    phone: "+7",
    password: ""
  }

  /* rules отвечает за то, как правильно вбиты поля, исходя из них, форма становится валидной либо же нет */
  rules = {
    length: (len: any) => (v: any) =>
      (v || '').length >= (len ?? 8) ||
      `Недопустимая длина символов`,
    password: (v: any) =>
      !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
      'Пароль должен содержать заглавную букву, цифру и специальный символ.',
    required: (v: any) => !!v || 'Это поле обязательно к заполнению',
  }

  async auth() {
    // перевёл все условия на rules
    // подробнее как работает, смотри по ссылке ниже
    // https://v2.vuetifyjs.com/en/components/text-fields/#custom-validation
    // и тут
    // https://v2.vuetifyjs.com/en/components/forms/#rules


    // if (this.model.number.length != 12) {
    //   return
    // }
    // if (this.model.password.length < 8) {
    //   return
    // }
    // if (this.model.password.length > 32) {
    //   return
    // }


    this.loading = true;

    // По нажатию кнопки логина, мы валидируем форму,
    // Это сделано для того, чтобы пользователь не смог пустую форму отправить на логин
    // Если валидация успешна, мы пропускаем дальше, нет, ну иди заполняй форму
    this.validateForm && await this.$axios.post("http://localhost:8080/auth", this.model, {})
      // Уточни, включен ли у него cors?
      // Иначе будет выдавать ошибку при запросе!
      // Если нет, то обрати внимание, как у него идут запросы.
      // Если у него запросы например http://localhost:8080/api/auth - имеют /api/
      // Проще будет сделать проксирование на запросы /api, и они сократятся до /api/auth, вместо полной строчки http...
      .then((response) => {
        const jwt = response.data.access_token;
        if (jwt) {
          localStorage.setItem("access_token", jwt);
          console.log("jwt token сохранён");
          this.$router.push("../index.vue");
        }
      })
      .finally(() => {
        this.loading = false;
      })

    // На случай, если запрос не сработает, мы всё равно включаем форму обратно
    this.loading = false;
  }

  @Watch("model.phone")
  changeModelPhone() {
    console.log(this.model.phone)
    if (this.model.phone.length <= 2) {
      return this.model.phone = "+7"
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
