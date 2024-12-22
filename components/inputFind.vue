<template>
  <div class="d-flex flex-row align-items-center">
    <v-text-field
      append-icon="mdi-magnify"
      @click:append="search"
      @keyup.enter="search"
      dense
      v-model="name"
      label="Поиск"
      type="text"
      outlined
      hide-details
    />
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import logger from "~/assets/scripts/logger";

@Component({})
export default class inputFind extends Vue {

  name: string = "";

  async search() {
    this.$axios
  }

}
</script>
<style scoped>

</style>
