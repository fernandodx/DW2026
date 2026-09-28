<template>
  <main class="page">
    <section class="card">
      <span class="tag">Projeto Vue</span>

      <h1>Sarah Monteiro dos Anjos</h1>

      <p class="intro">
        Uma página simples criada com Vue 3, organizada em componentes e
        pronta para continuar sendo desenvolvida.
      </p>

      <HelloWorld />

      <footer>
        <span>Vue 3</span>
        <span>•</span>
        <span>Vue CLI</span>
      </footer>
    </section>
  </main>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  background: #f4f6f8;
  color: #243447;
  font-family: Arial, Helvetica, sans-serif;
}

button,
a {
  font-family: inherit;
}

.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
}

.card {
  width: min(760px, 100%);
  padding: 42px;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 12px 35px rgba(36, 52, 71, 0.1);
  text-align: center;
}

.tag {
  display: inline-block;
  margin-bottom: 16px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #e8f5ef;
  color: #23835a;
  font-size: 13px;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(28px, 5vw, 42px);
}

.intro {
  max-width: 600px;
  margin: 16px auto 0;
  line-height: 1.7;
  color: #667585;
}

footer {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 34px;
  color: #8a96a3;
  font-size: 13px;
}
</style>
