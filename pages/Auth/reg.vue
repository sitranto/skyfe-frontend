<template>
  <div>
    <div class="mt-15">
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

    <div class="mt-5">
      <v-text-field class="custom-input"
                    label="Phone"
                    type="text"
                    hide-details
                    outlined/>
    </div>

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

    <div class="auth-actions d-flex align-center justify-center flex-column">
      <div>
        <v-btn
          class="text-none auth-button--outlined"
          outlined
          color="#8A138C"
          width="150px"
          height="40px"
        >Создать
        </v-btn>
      </div>

      <div class="mt-2">
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
}
</script>
<style scoped>

</style>
