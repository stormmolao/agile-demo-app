<template>
 <ol
    class="list"
  >
    <li 
      :key="data.id"
      class="list__item"
      v-for="data in dataList"
    >
      <b class="title">{{ data.title }}
      <v-btn
        @click="deleteData(data.id)"
        class="list__item__button__delete"
        color="error"
        text
        x-small
      >
        Delete
      </v-btn>

      <v-btn
        @click="updateData(data)"
        class="list__item__button__update"
        color="primary"
        text
        x-small
      >
        Update
      </v-btn>
      
      </b>
      <p class="content">{{ data.content }}</p>
    </li>
  </ol>
</template>

<script>
 export default {
  name: 'AgileList',
  props: {
    dataList: {
      type: Array,
      require: true
    }
  },
  methods: {
    updateData(value) {
      this.$emit('update', value);
    },
    deleteData(dataId) {
      this.$emit('delete', dataId);
    }
  }
 }
</script>

<style lang="scss" scoped>
  .list {
    padding-top: 10px;
  }
  .content {
    white-space: pre-line;
  }
</style>