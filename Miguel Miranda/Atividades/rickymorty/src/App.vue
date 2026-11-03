<template>
  <header class="cabecalho text-white text-center py-5 mb-4">
    <h1 class="display-5 fw-bold">Rick and Morty App</h1>
    <p class="lead mb-0">Todos os personagens do multiverso em um só lugar</p>
  </header>

  <main class="container pb-5">
    <filtro-personagens v-model:nome="nome" v-model:status="status" />

    <carregando-spinner v-if="carregando" />

    <div v-else-if="erro" class="alert alert-danger text-center">
      <p class="mb-2">{{ erro }}</p>
      <button class="btn btn-outline-danger btn-sm" @click="carregarPersonagens">
        Tentar novamente
      </button>
    </div>

    <p v-else-if="personagens.length === 0" class="text-center text-muted py-5">
      Nenhum personagem encontrado nesta dimensão.
    </p>

    <template v-else>
      <p class="text-muted small">
        {{ totalPersonagens }} personagens encontrados · página {{ pagina }} de
        {{ totalPaginas }}
      </p>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mb-4">
        <div class="col" v-for="personagem in personagens" :key="personagem.id">
          <card-personagem
            :nome="personagem.name"
            :imagem="personagem.image"
            :local="personagem.location.name"
            :status="personagem.status"
          />
        </div>
      </div>

      <paginacao-personagens
        :pagina-atual="pagina"
        :total-paginas="totalPaginas"
        @mudar-pagina="mudarPagina"
      />
    </template>
  </main>
</template>

<script>
import CardPersonagem from "./components/CardPersonagem.vue";
import CarregandoSpinner from "./components/CarregandoSpinner.vue";
import FiltroPersonagens from "./components/FiltroPersonagens.vue";
import PaginacaoPersonagens from "./components/PaginacaoPersonagens.vue";
import { buscarPersonagens } from "./services/rickMortyApi";

export default {
  name: "App",
  components: {
    CardPersonagem,
    CarregandoSpinner,
    FiltroPersonagens,
    PaginacaoPersonagens,
  },
  data() {
    return {
      personagens: [],
      pagina: 1,
      totalPaginas: 0,
      totalPersonagens: 0,
      nome: "",
      status: "",
      carregando: true,
      erro: null,
      timerBusca: null,
    };
  },
  mounted() {
    this.carregarPersonagens();
  },
  watch: {
    // Espera o usuário parar de digitar para não chamar a API a cada letra
    nome() {
      clearTimeout(this.timerBusca);
      this.timerBusca = setTimeout(() => {
        this.pagina = 1;
        this.carregarPersonagens();
      }, 400);
    },
    status() {
      this.pagina = 1;
      this.carregarPersonagens();
    },
  },
  methods: {
    async carregarPersonagens() {
      this.carregando = true;
      this.erro = null;
      try {
        const dados = await buscarPersonagens(this.pagina, this.nome.trim(), this.status);
        this.personagens = dados.results;
        this.totalPaginas = dados.info.pages;
        this.totalPersonagens = dados.info.count;
      } catch (error) {
        console.error("Erro na API do Rick and Morty: ", error);
        this.erro = "Não foi possível carregar os personagens.";
      } finally {
        this.carregando = false;
      }
    },
    mudarPagina(novaPagina) {
      this.pagina = novaPagina;
      this.carregarPersonagens();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style>
body {
  background-color: #f4f7f2;
}

.cabecalho {
  background: linear-gradient(135deg, #0b3d2e, #198754 60%, #97ce4c);
}
</style>
