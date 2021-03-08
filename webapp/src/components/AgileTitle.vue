<template>
 <h2 class="title">
    {{ titleContent[type] }} 
    <v-btn
      class="title__button"
      color="primary"
      text
      @click="openDialog()"
    >Add New
    <v-icon>mdi-plus</v-icon>
    </v-btn>
  </h2>
</template>

<script>
 export default {
  name: 'AgileTitle',
  props: {
    type: {
      type: String,
      required: true
    }
  },
   computed: {
      titleContent() {
        return {
          principle: "Agile Method Principles",
          value: "Agile Method Values"
        }
      }
    },
  methods: {
    openDialog() {
      this.$emit('openDialog');
    }
  }
 };
</script>
