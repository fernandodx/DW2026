
<template>
  <div class="container">
    <h1>Rick and Morty</h1>
    <p>Conheça os personagens da série!</p>

    <div class="personagens">
      <div
        class="card"
        v-for="personagem in personagens"
        :key="personagem.id"
      >
        <img :src="personagem.image" :alt="personagem.name">

        <div class="info">
          <h2>{{ personagem.name }}</h2>
          <p>
  <span
    class="status"
    :class="personagem.status.toLowerCase()"
  ></span>
  {{ personagem.status }}
</p>
          <p>Espécie: {{ personagem.species }}</p>
          <p>Localização: {{ personagem.location.name }}</p>
        </div>
      </div>
    </div>

    <div class="botoes">
      <button @click="paginaAnterior" :disabled="!anterior">
        Anterior
      </button>

      <button @click="proximaPagina" :disabled="!proxima">
        Próxima
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      personagens: [],
      anterior: null,
      proxima: null
    };
  },

  mounted() {
    this.buscarPersonagens(
      'https://rickandmortyapi.com/api/character'
    );
  },

  methods: {
    async buscarPersonagens(url) {
      try {
        const resposta = await axios.get(url);

        this.personagens = resposta.data.results;
        this.anterior = resposta.data.info.prev;
        this.proxima = resposta.data.info.next;
      } catch (erro) {
        console.log('Erro ao buscar personagens:', erro);
      }
    },

    paginaAnterior() {
      if (this.anterior) {
        this.buscarPersonagens(this.anterior);
      }
    },

    proximaPagina() {
      if (this.proxima) {
        this.buscarPersonagens(this.proxima);
      }
    }
  }
};
</script>

<style>
body {
  margin: 0;
  background: #202329;
  font-family: Arial, sans-serif;
  color: white;
}

.container {
  padding: 30px;
  text-align: center;
}

h1 {
  color: #97ce4c;
  font-size: 40px;
}

.personagens {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.card {
  background: #3c3e44;
  border-radius: 12px;
  overflow: hidden;
  text-align: left;
}

.card img {
  width: 100%;
}

.info {
  padding: 15px;
}

.info h2 {
  color: #97ce4c;
}

.botoes {
  margin: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

button {
  padding: 12px 25px;
  background: #97ce4c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;

}
.status {
  display: inline-block;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  margin-right: 7px;
}

.alive {
  background-color: #55cc44;
}

.dead {
  background-color: #d63d2e;
}

.unknown {
  background-color: gray;
}
</style>
