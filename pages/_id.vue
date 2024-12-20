<template>
  <div class="chat__container ">

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
              v-for="index in messages.lenght"
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

    <div v-else>
      <!-- тут показываем сообщения, которые есть -->
      <div class="d-flex flex-column" v-if="messages.length">
        <v-card v-for="(item, i) in messages" :key="i"
                width="fit-content"
                max-width="500px"
                :class="'message px-2 py-1 mb-4 ' + whoIsUser(item.userId).class"
                :color="whoIsUser(item.userId).color">
          <div class="message-container">
            {{ item.text }}
          </div>
        </v-card>
      </div>

      <div v-else>
        Разметка, в случае если сообщений с пользователем нету
      </div>

      <div style="bottom: 0 !important">
        <v-card-actions
          class="d-flex justify-center align-center position-absolute"
          style="width: 70%; margin: 0 auto; padding: 20px 0; bottom: 0 !important;">

          <v-text-field
            class="custom-input"
            label="Сообщение"
            placeholder="Введите сообщение"
            type="text"
            v-model="message"
            outlined
            style="flex-grow: 1; margin-right: 8px; top: 15px"
          />

          <v-btn
            fab
            dark
            color="#8A138C"
            @click="sendMessage"
            @refreshItems="initMessages"
          >
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

@Component({})
export default class _id extends Vue {
  loadMessages: boolean = true

  message: string = ""

  @Inject () chatId!: number

  messages: any = []

  async initMessages() {
    await this.$axios.get("/api/message", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        chatId: this.chatId
      }
    })
      .then((response) => {
        logger(response)
        this.messages = response.data
      })
      .catch((error) => {
        logger(error)
      })
  }

  async mounted() {
    this.initMessages()

    setTimeout(() => {
      this.loadMessages = false
    }, 1000)
  }

  async sendMessage() {
    await this.$axios.post("/api/message/send", {
        content: this.message
      },
      {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        chatId: this.chatId
      })
  }

  // Генерация ширины Skeleton сообщений
  getSkeletonWidth(index: number) {
    const widths = [80, 70, 90, 60, 75];
    return `${widths[index % widths.length]}%`;
  }

  // Тут подставляются стили для сообщений, в зависимости от того, кто сообщение отправил, текущий пользователь или собеседник
  whoIsUser(id: number) {
    return this.ownerId == id ? {
      color: 'white',
      class: 'message-isOwner align-self-end black--text'
    } : {
      color: 'var(--main-color-transparent)',
      class: 'message-isCompanion align-self-start white--text'
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

.message {
  border-radius: 10px !important;
}

.message.message-isCompanion {
  box-shadow: 1px 5px 28px 1px rgba(138, 19, 140, 0.5) !important;
}

.message.message-isOwner {
  box-shadow: 1px 5px 28px 1px rgba(255, 255, 255, 1) !important;
}

</style>
