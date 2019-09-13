<template>
  <div id="app">
    <Header />
    <Section />
    <!-- <div id="nav">
       <md-button class="md-raised md-primary"><router-link to="/">Home</router-link></md-button>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Section from './components/Section.vue'

export default {
  name: 'app',
  components: {
    Header,
    Section
  }
}
</script>

<style>
#app {
  background: #FAFAFA;
}
</style>
