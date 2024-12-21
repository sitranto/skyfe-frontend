<template>
  <!-- кнопка для выдвижения меню -->
  <div class="white" style=" ">
    <div style="height: 53px ; border-bottom: 1px solid gray;">
      <div>
        <v-btn class="ma-2 ml-3"
          color="white"
          fab
          small
          @click=""
          elevation="0">
          <v-icon dark>
            mdi-menu
          </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class buttonMenu extends Vue {

}
</script>
<style scoped>

</style>
