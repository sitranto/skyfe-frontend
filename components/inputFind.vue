<template>
  <div class="d-flex flex-row align-items-center">
    <v-text-field
      v-model="username"
      label="Поиск"
      type="text"
      append-icon="mdi-magnify"
      @click:append="search"
      @keyup.enter="search"
      dense
      hide-details
      outlined/>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
// @ts-ignore
import logger from "~/assets/scripts/logger";

@Component({})
export default class inputFind extends Vue {

  username: string = "";

  // Создание чата
  async search() {

    this.$axios.post("/api/chat/create", {
      username: this.username
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
    .then(response => {
      logger(`Чат ${response.data.id} создан`)
      this.$emit("createChat", response.data.id);
      this.username = "";
    })
      .catch(error => {
        logger(error);
      })
  }

}
</script>
<style scoped>

</style>
