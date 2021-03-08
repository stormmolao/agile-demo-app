<template>
 <div class="value">
  <AgileTitle 
    :type="type"
    @openDialog="openDialog"
  />

  <AgileList
    :dataList="propertyList"
    @delete="deleteAgileProperty"
    @update="openDialog" 
    v-if="propertyList"
  />

  <v-dialog
    v-model="isDialogOpen"
    width="500"
  >
    <AgileInputDialog
      :objectToUpdate="propertyToUpdate"
      :type="type"
      @submit="submitAgileProperty"
      v-if="isDialogOpen"
    />
  </v-dialog>

  <v-snackbar
      v-model="notificationSent"
    >
      {{ notificationMesage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="notificationSent = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
 </div>
</template>

<script>
import AgileInputDialog from './AgileInputDialog';
import AgileList from './AgileList'
import AgileTitle from './AgileTitle'

import http from  "../service/http";
import { baseAPI } from "../config";

  export default {
    name: 'AgileBase',
    components: {
      AgileInputDialog,
      AgileList,
      AgileTitle
    },
    props: {
      type: {
        type: String,
        required: true 
      },
    },
    data() {
        return {
          isDialogOpen: false,
          notificationSent: false,
          notificationMesage: '',
          propertyList: null,
          propertyToUpdate: {},
        }
    },
    created() {
      this.fetchAgilePropertyList();
    },
    methods: {
      addAgileProperty(value) {
        http.post(`${baseAPI}${this.type}`, value)
          .then(() => {
             this.isDialogOpen = false;
             this.fetchAgilePropertyList();
             this.sendNotification(`Added ${this.type} successfully`);
          })
          .catch(error => {
            this.sendNotification(error.message);
          });
      },
      deleteAgileProperty(valueId) {
        http.delete(`${baseAPI}${this.type}/${valueId}`)
          .then(() => {
            this.fetchAgilePropertyList();
             this.sendNotification(`Deleted ${this.type} successfully`);
          })
          .catch(error => {
            this.sendNotification(error.message);
          });
      },
      fetchAgilePropertyList() {
        return http.get(`${baseAPI}${this.type}`)
          .then(response => {
            this.propertyList = response.data;
          })
          .catch(error => {
            this.sendNotification(error.message);
          })
      },
      openDialog(value) {
        this.isDialogOpen = true;
        this.propertyToUpdate = value ? value : { title: '', content: ''};
      },
      sendNotification(message) {
        this.notificationSent = true;
        this.notificationMesage = message;
      },
      submitAgileProperty(valueId, value) {
        if (valueId) {
          this.updateAgileProperty(valueId, value);
        } else {
          this.addAgileProperty(value);
        }
      },
      updateAgileProperty(valueId, value) {
        http.put(`${baseAPI}${this.type}/${valueId}`, value)
          .then(() => {
            this.isDialogOpen = false;
            this.fetchAgilePropertyList();
            this.sendNotification(`Updated ${this.type} successfully`);
          })
          .catch(error => {
            this.sendNotification(error.message);
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .value {
    padding-top: 10px;
    &__list {
      padding-top: 10px;;
    };
  }
</style>
