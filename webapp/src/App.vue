<template>
  <v-app>
     <v-card>
      <v-toolbar
        flat
        color="primary"
        dark
      >
        <v-toolbar-title>Agile Software Development</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          Values
        </v-tab>
        <v-tab>
          Principles
        </v-tab>

        <v-tab-item>
          <AgileBase 
            type='value'
          />
        </v-tab-item>
        <v-tab-item>
          <AgileBase 
            type='principle'
          />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-app>
</template>

<script>
import AgileBase from './components/AgileBase'
export default {
  name: 'App',
  components: 
  {
    AgileBase
  }
};
</script>
