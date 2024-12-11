<template>
  <div>
    <div class="mt-15">
      <v-text-field class="custom-input"
                    label="Login"
                    type="text"
                    hide-details
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
import {Vue, Component} from 'vue-property-decorator';

@Component({
  layout: "auth"
})
export default class login extends Vue {
showPass: any = {
  one: false,
}
}
</script>
<style scoped>

</style>
