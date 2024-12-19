<template>
  <div class="chat__container pt-4">

    <div v-if="loadMessages">
      Разметка для v-skeleton
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

    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class _id extends Vue {
  loadMessages: boolean = true

  // Для примера (messages остаётся, остальные данные подбиваются под текущие)
  ownerId: number = 2
  messages: any = [
    {
      text: `Текст сообщения от пользователя 1, asfas asf asf as fasf asf, текущий пользователь -  ${this.ownerId}`,
      userId: 1,
    },
    {
      text: `Текст сообщения от пользователя 2, текущий пользователь -  ${this.ownerId}`,
      userId: 2,
    },
    {
      text: `Текст сообщения от пользователя 2, текущий пользователь -  ${this.ownerId}`,
      userId: 2,
    },
    {
      text: `Текст сообщения от пользователя 1, текущий пользователь -  ${this.ownerId}`,
      userId: 1,
    },
    {
      text: `Текст сообщения от пользователя 2, текущий пользователь -  ${this.ownerId}`,
      userId: 2,
    },
    {
      text: `Текст сообщения от пользователя 1, текущий пользователь -  ${this.ownerId}`,
      userId: 1,
    },
  ]

  mounted() {
    setTimeout(() => {
      this.loadMessages = false
    }, 1000)
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
