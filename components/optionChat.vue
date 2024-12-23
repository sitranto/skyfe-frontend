<template>
  <div>
    <!-- Кнопка для открытия меню -->
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <!-- Содержимое меню -->
      <v-list>
        <v-list-item
          link
          @click="deleteChat"
        >
          <v-list-item-icon>
            <v-icon color="red">mdi-delete</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Delete Chat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import logger from "~/assets/scripts/logger";

@Component({})
export default class optionChat extends Vue {
  @Prop ({required:true}) chat!: number;

  async deleteChat() {
    await this.$axios.delete(`/api/chat/delete`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      data: {
        chatId: this.chat
      }
    })
      .then((response) => {
        logger(response);
        logger(this.chat);
        if (response.data.toString() == `Deleted chat ${this.chat}`) {
          logger(`Чат ${this.chat} удалён`);
          this.$router.push('/');
        }
        else {
          logger(`Чат ${this.chat} не удалён`);
        }
      })
    .catch((error) => {
      logger(error);
      this.$router.push('/');
    })
  }
}
</script>
<style scoped>

</style>
