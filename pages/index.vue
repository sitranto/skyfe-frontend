<template>
  <div>
    <v-text-field class="custom-input"
                  label="Outlined"
                  hide-details
                  outlined />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class Index extends Vue {
}
</script>

<style>
.v-text-field.v-text-field--outlined.custom-input * {
  border: none !important;
  outline: none !important;
}

.v-text-field.v-text-field--outlined.custom-input label {
  left: 13px !important;
  color: #8A138C !important;
  padding-inline: 10px !important;
  border-radius: 10px !important;
  background-color: #fff !important;
}

.v-text-field.v-input.custom-input {
  border: 2px solid #8A138C;
  border-radius: 30px !important;
}
</style>
