<template>
  <v-card>
    <h1 class="dialog__title">{{ dialogTitle }}</h1>
    <v-form
      ref="form"
      class="dialog__input"
      lazy-validation
      v-model='isFormValid'
    >
      <v-text-field
        :rules="titleRules"
        label="Title"
        v-model="inputTitle"
      >
      </v-text-field>
      <v-textarea
        :rules="contentRules"
        label="Content"
        name="input-7-4" 
        solo
        v-model="inputContent"
      ></v-textarea>
      <v-btn
      :disabled="!isFormValid"
      @click="submitData()"
      class="dialog__input__submitButton"
      color="primary"
      depressed
      width="400"
      >Submit</v-btn>
    </v-form>
  </v-card>
</template>

<script>
 export default {
  name: 'AgileInputDialog',
  props: {
   objectToUpdate: {
    type: Object,
    required: true
   },
   type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isFormValid: false,
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 100) || 'Title must be less than 100 characters'
      ],
      contentRules: [
        v => !!v || 'Content is required',
        v => (v && v.length <= 1000) || 'Content must be less than 1000 characters'
      ],
      inputContent: this.objectToUpdate.content,
      inputTitle:  this.objectToUpdate.title
    };
  },
  computed: {
    screenType() {
      return {
        principle: "Principle",
        value: "Value"
      };
    },
    dialogTitle() {
      let inputMode = this.objectToUpdate.id ? 'Update' : 'Add';
      let screenType = this.screenType[this.type];
      return `${inputMode} ${screenType}`;
    }
  },
  methods: {
    submitData() {
      if(this.$refs.form.validate()){
        this.$emit(
          'submit',
          this.objectToUpdate.id ,
          { title: this.inputTitle, content: this.inputContent }
        );
      }
    }
   },
 }
</script>

<style lang="scss" scoped>
  .dialog__title {
    text-align: center;
    padding-top: 10px;
    color: #1976d2;
  }
  .dialog__input {
    width: 400px;
    padding-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
