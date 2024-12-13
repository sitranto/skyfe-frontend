<template>
  <div>
    <div class="mt-15">
      <v-text-field class="custom-input"
                    label="Phone"
                    type="text"
                    hide-details
                    v-model="model.phone"
                    v-mask="`+7##########`"
                    outlined/>
    </div>

    <div class="mt-8">
      <v-text-field class="custom-input"
                    label="Password"
                    type="password"
                    hide-details
                    color="#8A138C"
                    :append-icon="showPass.one ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPass.one ? 'text' : 'password'"
                    @click:append="showPass.one = !showPass.one"
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
  </div>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import * as string_decoder from "node:string_decoder";

@Component({
  layout: "auth"
})
export default class login extends Vue {
  showPass: any = {
    one: false,
  }

  model: any = {
    phone: "+7",
    password: ""
  }

  async auth() {
    if (this.model.phone.length != 12) {
      return
    }
    if (this.model.password.length >= 8) {
      return
    }

    await this.$axios.post("/auth", this.model, {})
      .then((response) = {

      })
  }

  @Watch("model.phone")
  changeModelPhone() {
    console.log(this.model.phone)
    if (this.model.phone.length <= 2) {
      return this.model.phone = "+7"
    }
  }

}
</script>
<style scoped>

</style>
