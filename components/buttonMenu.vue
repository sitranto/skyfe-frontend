<template>
  <div>
    <!-- кнопка для выдвижения меню -->
    <div>
      <v-btn class="ma-2 ml-3"
             color="white"
             fab
             small
             @click.stop="drawer = !drawer"
             elevation="0">
        <v-icon dark>
          mdi-menu
        </v-icon>
      </v-btn>
    </div>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      width="360px"
    >
      <v-list>
        <v-list-item class="mb-10">
          <v-row justify="space-between" align="center">
            <v-btn
              class="ma-1"
              color="black"
              icon
              large
              @click="drawer = !drawer">
              <v-icon>
                mdi-keyboard-backspace
              </v-icon>
            </v-btn>

            <div>
              <v-btn
                color="orange"
                elevation="2"
                icon
                large
                @click="patch = !patch"
                outlined>
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>

              <v-btn
                class="ma-1"
                color="red"
                elevation="2"
                icon
                large
                @click="exitAccount"
                outlined>
                <v-icon>
                  mdi-exit-to-app
                </v-icon>
              </v-btn>
            </div>
          </v-row>
        </v-list-item>
        <v-list-item>
          <div v-if="patch" class="d-flex flex-column align-center pa-4" style="width: 100%">
            <v-card outlined class="pa-3 mb-4" style="width: 100%; max-width: 320px;">
              <v-card-title>
                <v-icon class="mr-2" color="blue">mdi-information-outline</v-icon>
                <span class="text-h6">Личная информация</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <div class="mb-2">
                  <strong>Телефон:</strong> {{ model.phone || 'Не указано' }}
                </div>
                <div class="mb-2">
                  <strong>Имя:</strong> {{ model.firstName || 'Не указано' }}
                </div>
                <div class="mb-2">
                  <strong>Фамилия:</strong> {{ model.lastName || 'Не указано' }}
                </div>
                <div class="mb-2">
                  <strong>Имя пользователя:</strong> {{ model.username || 'Не указано' }}
                </div>
                <div class="mb-2">
                  <strong>О себе:</strong> {{ model.bio || 'Не указано' }}
                </div>
              </v-card-text>
            </v-card>
          </div>
          <div v-else
            class="d-flex justify-center align-center flex-column" style="width: 100%">
            <v-card outlined class="pa-3 mb-4" style="width: 100%; max-width: 320px;">
              <v-card-title>
                <v-icon class="mr-2" color="orange">mdi-pencil</v-icon>
                <span class="text-h6">Редактировать данные</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <div class="mb-2">
                  <v-text-field
                    v-model="model.phone"
                    label="Телефон"
                    type="text"
                    outlined
                  />
                </div>
                <div class="mb-2">
                  <v-text-field
                    v-model="model.firstName"
                    label="Имя"
                    type="text"
                    outlined
                  />
                </div>
                <div class="mb-2">
                  <v-text-field
                    v-model="model.lastName"
                    label="Фамилия"
                    type="text"
                    outlined
                  />
                </div>
                <div class="mb-2">
                  <v-text-field
                    v-model="model.username"
                    label="Имя пользователя"
                    type="text"
                    outlined
                  />
                </div>
                <div class="mb-2">
                  <v-textarea
                    v-model="model.bio"
                    label="О себе"
                    outlined
                  ></v-textarea>
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  color="green"
                  @click="saveChanges"
                >
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class buttonMenu extends Vue {

  model: any = {
    phone: "",
    firstName: "",
    lastName: "",
    username: "",
    bio: ""
  }

  //Отслеживание состояния меню
  drawer = false;

  //Отслеживание изменения информации профиля
  patch = true;

  async exitAccount() {
    await localStorage.removeItem('accessToken');
    return await this.$router.push('/auth/login');
  }

  async saveChanges() {

  }
}
</script>
<style scoped>

</style>
