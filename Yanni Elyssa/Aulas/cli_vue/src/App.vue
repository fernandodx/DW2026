<template>
  <di>
    <home-component />
  </di>
</template>

<script>

import HomeComponent from './components/HomeComponent.vue';

export default {
  name: 'App',
  components: {
    HomeComponent,
  },
  mounted() {
    console.log("Minha aplicaçãocriou minha tela e todos os elementos do DOM");

  },
  created() {
    console.log("Minha aplicação criou meus Objetos JS");
  },
  errorCapture() {
  alert("Erro!!!");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
