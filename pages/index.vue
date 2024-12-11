<template>
  <div>
    <div class="logo">
      <img class="d-block mx-auto" src="../static/fullLogo.svg" alt="#"/>
    </div>
    <div>
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
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class Index extends Vue {
}
</script>
