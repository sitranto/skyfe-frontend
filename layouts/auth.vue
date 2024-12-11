<template>
  <v-app class="body">
    <v-container>
      <div class="auth d-flex align-center justify-center">
        <div class="auth-wrapper">

          <div class="logo">
            <img class="d-block mx-auto" src="../static/fullLogo.svg" alt="#"/>
          </div>
          <Nuxt/>

        </div>
      </div>
    </v-container>
  </v-app>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class auth extends Vue {

}
</script>
<style scoped>

</style>
