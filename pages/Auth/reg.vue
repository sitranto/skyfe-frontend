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
            <v-stepper-content :step="1" class="ma-0 pa-0">

              <div class="mt-5">
                <v-text-field class="custom-input"
                              v-mask="`+7##########`"
                              v-model="model.number"
                              label="Phone"
                              type="text"
                              :rules="[rules.required, rules.length(12)]"
                              outlined/>
              </div>

              <v-card-actions class="d-flex justify-center">
                <v-btn
                  @click="checkPhoneAndCont"
                  class="d-block text-none auth-button--outlined mt-5 px-7"
                  outlined
                  color="#8A138C"
                  height="45px">
                  Проверка телефона
                </v-btn>
              </v-card-actions>

            </v-stepper-content>
          </v-stepper-items>
        </v-form>

        <v-form v-model="validForm.two" ref="validFormTwo">
          <v-stepper-items>
            <v-stepper-content :step="2">

              <div class="mt-5">
                <v-text-field class="custom-input"
                              label="First name"
                              v-model="model.firstname"
                              :rules="[rules.required]"
                              type="text"
                              outlined/>
              </div>

              <div>
                <v-text-field class="custom-input"
                              label="Second name"
                              v-model="model.secondname"
                              :rules="[rules.required]"
                              type="text"
                              outlined/>
              </div>

              <div>
                <v-text-field class="custom-input"
                              label="Username"
                              v-model="model.username"
                              :rules="[rules.required]"
                              type="text"
                              outlined/>
              </div>


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
            <v-stepper-content :step="3">

              <div class="mt-5">
                <v-text-field class="custom-input"
                              label="Password"
                              type="password"
                              color="#8A138C"
                              v-model="model.password"
                              :rules="[
                              rules.required,
                              /*rules.password.rule,*/
                              rules.password.minLength(8),
                              rules.password.maxLength(32)
                              ]"
                              :append-icon="showPass.one ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="showPass.one ? 'text' : 'password'"
                              @click:append="showPass.one = !showPass.one"
                              outlined/>
              </div>

              <div>
                <v-text-field class="custom-input"
                              label="Repeat password"
                              type="password"
                              color="#8A138C"
                              v-model="passRepeat"
                              :rules="[
                              rules.required,
                              /*rules.password.rule,*/
                              rules.password.minLength(8),
                              rules.password.maxLength(32),
                              rules.match(model.password)
                              ]"
                              :append-icon="showPass.two ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="showPass.two ? 'text' : 'password'"
                              @click:append="showPass.two = !showPass.two"
                              outlined/>
              </div>

              <v-card-actions class="d-flex justify-center">
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

    <div class="auth-actions isRegPage d-flex align-center justify-center flex-column">
      <div>
        <a class="auth-button--text" href="#" @click.prevent="$router.push(`/auth/login`)">Войти</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';

@Component({
  layout: "auth"
})
export default class reg extends Vue {
  model: any = {
    number: "+7",
    firstName: "",
    secondName: "",
    username: "",
    password: ""
  }

  passRepeat: string = ""

  showPass: any = {
    one: false,
    two: false,
  }

  validForm: any = {
    one: false,
    two: false,
    three: false,
  };

  stepLoading: boolean = false
  stepper: number = 1


  rules = {
    match: (match: any) => (v: any) =>
      (!!v && v) === match || "Пароли должны совпадать",

    length: (len: any) => (v: any) =>
      (v || "").length >= (len ?? 8) ||
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

    required: (v: any) => !!v || "Это поле обязательно к заполнению"
  };

  async checkPhoneAndCont() {

    this.validateForm(`validFormOne`) && await this.$axios.post("/number", this.model.number , {})
      .then((response) => {
        if (response.status == 200) {
          this.stepLoading = true
        } else {

        }
      })
      .catch((error) => {
        console.log(error, {
          message: "Ошибка запроса",
        });
      })

    setTimeout(() => {
      this.validateForm('validFormOne')
      this.stepLoading = false
    }, 1200)

    setTimeout(() => {
      if (this.validateForm('validFormOne')) this.nextStep()
    }, 1000)

  }

  async checkUserNameAndCont() {

    this.validateForm(`validFormTwo`) && await this.$axios.post("/auth/user", this.model.username , {})
      .then((response) => {
        this.stepLoading = true
      })
      .catch((err) => {
        console.log(err)
      })

    setTimeout(() => {
      this.validateForm('validFormTwo')
      this.stepLoading = false
    }, 1200)

    setTimeout(() => {
      if (this.validateForm('validFormTwo')) this.nextStep()
    }, 1000)
  }

  async registration() {

    this.validateForm(`validFormTwo`) && await this.$axios.post("/auth/user", this.model , {})
      .then((response) => {
        this.stepLoading = true
      })

    setTimeout(() => {
      this.validateForm('validFormThree')
      this.stepLoading = false
    }, 1200)

  }

  nextStep() {
    return this.stepper++;
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
