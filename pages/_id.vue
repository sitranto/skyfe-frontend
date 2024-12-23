<template>
  <div class="chat__container">

    <div v-if="loadMessages">
      <v-skeleton-loader class="skeleton-chat" elevation="0">
        <!-- Заголовок Skeleton -->
        <template #header>
          <v-skeleton-loader class="skeleton-header" :height="50" type="card"/>
        </template>

        <!-- Сообщения Skeleton -->
        <template #default>
          <div class="skeleton-messages">
            <v-skeleton-loader
              v-for="index in messages.length"
              :key="index"
              :loading="true"
              :width="getSkeletonWidth(index)"
              max-width="500px"
              class="skeleton-message"
              :class="index % 2 === 0 ? 'align-self-end' : 'align-self-start'"
              type="text"
            />
          </div>
        </template>
      </v-skeleton-loader>
    </div>

    <div class="d-flex flex-column" v-else style="height: 100vh">


      <!-- Информация о пользователе  -->
      <div class="white shadow--info d-flex justify-space-between" style="height: 60px">
        <div class="d-flex align-center mt-1">
          <div class="messageListBranch__img mx-3">
            <img src="https://placehold.co/48x48" alt="img">
          </div>
          {{ this.parentDate.partnerName }}
        </div>
        <!-- Кнопка опций чата -->
        <div class="d-flex align-center mr-2">
          <option-chat :chat="parentDate.chatId"/>
        </div>
      </div>


      <!-- Диалог -->
      <div class="mx-10 mt-2 mb-4"
           style="flex: 1 0 auto; overflow-y: auto; height: calc(100vh - 148px)">

        <!-- тут показываем сообщения, которые есть -->
        <div class="d-flex flex-column" v-if="messages.length">
          <v-card v-for="(item, i) in messages" :key="i"
                  width="fit-content"
                  max-width="500px"
                  :class="'message px-2 py-1 mb-4 ' + whoIsUser(item.from.id).class"
                  :color="whoIsUser(item.from.id).color">
            <div class="message-container">
              {{ item.content }}
            </div>
          </v-card>
        </div>

        <!-- Сообщений нету -->
        <div class="d-flex justify-center align-center" style="height: inherit" v-else>
          <div>Сообщений с пользователем нету</div>
        </div>
      </div>


      <!-- Инпут группа -->
      <div class="mx-10 pb-2">
        <v-card-actions class="d-flex justify-center align-center ma-0 pa-0">
          <v-text-field class="custom-input pa-0 ma-0"
                        placeholder="Введите сообщение"
                        v-model="message"
                        label="Сообщение"
                        type="text"
                        @keyup.enter="sendMessageAndRefresh"
                        hide-details
                        outlined/>
          <v-btn class="ma-0 pa-0 ml-3"
                 color="#8A138C"
                 dark
                 fab
                 @click="sendMessageAndRefresh">
            <v-icon dark>
              mdi-send
            </v-icon>
          </v-btn>
        </v-card-actions>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator';
import logger from "assets/scripts/logger";
import optionChat from "~/components/optionChat.vue";
import OptionChat from "~/components/optionChat.vue";

@Component({
  components: {OptionChat}
})
export default class _id extends Vue {

  @Inject('parentDate') parentDate: any;


  loadMessages: boolean = true

  messages: any = [];
  message: string = ""

  // mounted всегда наверх
  async mounted() {
    logger(this.parentDate)

    await this.initMessages()

  }

  async initMessages() {
    logger('chat id is: ', this.parentDate.chatId)
    await this.$axios.get("/api/message", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        chatId: this.parentDate.chatId
      }
    })
      .then((response) => {
        this.messages = response.data
        logger(response)
      })
      .catch((error) => {
        logger(error)
        this.$router.push('/')
      })
      .finally(() => {
        this.loadMessages = false
      })
  }

  async sendMessage() {
    let status = false

    if (this.message.length <= 0) {
      return
    }

    await this.$axios.post("/api/message/send", {
        content: this.message
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          chatId: this.parentDate.chatId
        }
      })
      .then((response) => {
        logger("Сообщение отправлено")
        status = true
        this.message = ""
      })
      .catch((error) => {
        status = false
        logger(error)
        this.$router.push('/')
      })

    return status
  }

  async sendMessageAndRefresh() {
    if (await this.sendMessage()) await this.initMessages()
  }

  // Генерация ширины Skeleton сообщений
  getSkeletonWidth(index: number) {
    const widths = [80, 70, 90, 60, 75];
    return `${widths[index % widths.length]}%`;
  }

  // Тут подставляются стили для сообщений, в зависимости от того, кто сообщение отправил, текущий пользователь или собеседник
  whoIsUser(id: number) {
    // Получаем id пользователя
    return id == this.parentDate.partnerId ? {
      color: 'white',
      class: 'message-isCompanion align-self-start black--text'
    } : {
      color: 'var(--main-color-transparent)',
      class: 'message-isOwner align-self-end white--text'
    }
  }
}

</script>
<style>
.skeleton-chat {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.skeleton-header {
  width: 100%;
  border-radius: 8px;
}

.skeleton-messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-message {
  border-radius: 10px;
}

.chat__container {
  margin: 0 !important;
  padding: 0 !important;
}

.header-bar {
  background-color: white;
  height: 50px; /* или подходящая высота */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* легкая тень */
  border-bottom: 1px solid #ddd; /* граница снизу */
  position: sticky; /* фиксированная позиция, если нужно */
  top: 0; /* прикрепить к верху */
  z-index: 1000;
  margin: 0 !important;
}

.messageListBranch__img img {
  display: block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.shadow--info {
  box-shadow: -2px 10px 19px -12px rgba(0, 0, 0, 1);
  -webkit-box-shadow: -2px 10px 19px -12px rgba(0, 0, 0, 1);
  -moz-box-shadow: -2px 10px 19px -12px rgba(0, 0, 0, 1);
}

.message {
  border-radius: 10px !important;
}

.message.message-isOwner {
  box-shadow: 1px 5px 28px 1px rgba(138, 19, 140, 0.5) !important;
}

.message.message-isCompanion {
  box-shadow: 1px 5px 28px 1px rgba(255, 255, 255, 1) !important;
}

</style>
