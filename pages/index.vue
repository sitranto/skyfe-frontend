<template>
  <div class="auth d-flex align-center justify-center">
    <div class="auth-wrapper">

      <div class="logo">
        <img class="d-block mx-auto" src="../static/fullLogo.svg" alt="#"/>
      </div>
      <div class="mt-15">
        <v-text-field class="custom-input"
                      label="login"
                      type="text"
                      hide-details
                      outlined/>
      </div>

      <div class="mt-8">
        <v-text-field class="custom-input"
                      label="password"
                      type="password"
                      hide-details
                      outlined/>
      </div>

      <div class="auth-actions">
        <div>
          <v-btn> asfasfa </v-btn>
        </div>

        <div>
          <v-btn> asfasfa </v-btn>
        </div>

      </div>



    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class Index extends Vue {
}
</script>

<style>
.auth {
  width: 100%;
  height: 100vh;
}

.auth-wrapper {
  min-width: 700px;
}

.auth-actions {
  margin-top: 87px;
}
</style>
