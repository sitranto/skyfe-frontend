<template>
  <div class="chat&#45;&#45;container">

    <div v-if="loadMessages">
      Здесь сделай разметку из v-skeleton'ов, пример есть в defult
      И задай стили
      - message-isOwner&#45;&#45;loader - справа на странице
      - message-isCompanion&#45;&#45;loader - слева на странице
    </div>

    <div v-else>
      Тут пропадает блок загрузки, и появляется новый блок
      <v-list-item>
        <v-skeleton-loader type="is Companion"/>
        <v-skeleton-loader type="isOwner"/>
      </v-list-item>

      <div v-if="messages.length">
        <div class="message">
          <div class="message__outer">
            <div class="message__avatar"></div>
            <div class="message__inner">
              <div class="message__bubble"></div>
              <div class="message__actions"></div>
              <div class="message__spacer"></div>
            </div>
            <div class="message__status"></div>
          </div>
        </div>
        Разметка с сообщениями
        -message-isOwner - справа на странице
        - message-isCompanion - слева на странице
      </div>

      <div v-else>
        Разметка, в случае если сообщений с пользователем нету
      </div>

    </div>

  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class _id extends Vue {

}
</script>
<style scoped>

.message__outer {
  display: flex;
}

.message__inner {
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
}

</style>
