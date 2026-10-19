<template>
  <section class="resources">
    <div class="resource-group">
      <h2>Documentação</h2>

      <a
        class="primary-link"
        href="https://vuejs.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Acessar documentação do Vue
      </a>
    </div>

    <div class="resource-group">
      <h2>Ferramentas utilizadas</h2>

      <ul class="link-list">
        <li>
          <a
            href="https://cli.vuejs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vue CLI
          </a>
        </li>
        <li>
          <a
            href="https://babeljs.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Babel
          </a>
        </li>
        <li>
          <a
            href="https://eslint.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ESLint
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style scoped>
.resources {
  margin-top: 30px;
  display: grid;
  gap: 24px;
}

.resource-group {
  padding: 22px;
  border: 1px solid #e4e9ed;
  border-radius: 12px;
  background: #fafbfc;
}

h2 {
  margin: 0 0 14px;
  font-size: 18px;
}

a {
  color: #23835a;
  font-weight: 600;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.primary-link {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 8px;
  background: #23835a;
  color: #fff;
}

.primary-link:hover {
  background: #1b6949;
  text-decoration: none;
}

.link-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 22px;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
