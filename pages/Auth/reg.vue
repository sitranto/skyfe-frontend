<template>
  <div>
    <v-card class="ma-0 mt-15 pa-0"
            style="background-color: transparent !important;"
            :disabled="stepLoading"
            :loading="stepLoading"
            elevation="0">

      <v-stepper v-model="stepper" elevation="0"
                 style="background-color: transparent !important;">

        <v-stepper-items>
          <v-stepper-content :step="1" class="ma-0 pa-0">

            <div class="mt-5">
              <v-text-field class="custom-input"
                            label="Phone"
                            type="text"
                            hide-details
                            outlined/>
            </div>

            <v-btn
              @click="checkPhoneAndCont"
              class="d-block mx-auto text-none auth-button--outlined mt-5"
              outlined
              color="#8A138C"
              height="40px">
              Проверка телефона
            </v-btn>

          </v-stepper-content>
        </v-stepper-items>


        <v-stepper-items>
          <v-stepper-content :step="2">

            <div class="mt-5">
              <v-text-field class="custom-input"
                            label="First name"
                            type="text"
                            hide-details
                            outlined/>
            </div>

            <div class="mt-5">
              <v-text-field class="custom-input"
                            label="Second name"
                            type="text"
                            hide-details
                            outlined/>
            </div>

            <div class="mt-5">
              <v-text-field class="custom-input"
                            label="Username"
                            type="text"
                            hide-details
                            outlined/>
            </div>


            <v-btn
              @click="nextStepButton"
              class="d-block mx-auto text-none auth-button--outlined mt-5"
              outlined
              color="#8A138C"
              height="40px">
              Далее
            </v-btn>

          </v-stepper-content>
        </v-stepper-items>

        <v-stepper-items>
          <v-stepper-content :step="3">

            <div class="mt-5">
              <v-text-field class="custom-input"
                            label="Password"
                            type="password"
                            hide-details
                            color="#8A138C"
                            :append-icon="showPass.one ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass.one ? 'text' : 'password'"
                            @click:append="showPass.one = !showPass.one"

                            outlined/>
            </div>

            <div class="mt-5">
              <v-text-field class="custom-input"
                            label="Repeat password"
                            type="password"
                            hide-details
                            color="#8A138C"
                            :append-icon="showPass.two ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass.two ? 'text' : 'password'"
                            @click:append="showPass.two = !showPass.two"
                            outlined/>
            </div>

            <v-btn
              @click="registration"
              class="d-block mx-auto text-none auth-button--outlined mt-5"
              outlined
              color="#8A138C"
              height="40px">
              Регистрация
            </v-btn>


          </v-stepper-content>
        </v-stepper-items>


      </v-stepper>
    </v-card>


    <div class="auth-actions d-flex align-center justify-center flex-column">
      <div>
        <a class="auth-button--text" href="#" @click.prevent="$router.push(`/auth/login`)">Войти</a>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({
  layout: "auth"
})
export default class reg extends Vue {
  showPass: any = {
    one: false,
    two: false,
  }

  stepLoading: boolean = false
  stepper: number = 1

  checkPhoneAndCont() {
    this.stepper++
  }

  nextStepButton() {
    this.stepper++
  }

  registration() {

  }

}
</script>
<style scoped>

</style>
