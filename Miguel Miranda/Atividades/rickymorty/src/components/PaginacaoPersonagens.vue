<template>
  <nav aria-label="Paginação dos personagens">
    <ul class="pagination justify-content-center flex-wrap">
      <li class="page-item" :class="{ disabled: paginaAtual === 1 }">
        <button class="page-link" @click="irPara(paginaAtual - 1)">
          <i class="bi bi-chevron-left"></i>
        </button>
      </li>

      <li
        v-for="(pagina, indice) in paginasVisiveis"
        :key="indice"
        class="page-item"
        :class="{ active: pagina === paginaAtual, disabled: pagina === '...' }"
      >
        <button class="page-link" @click="irPara(pagina)">{{ pagina }}</button>
      </li>

      <li class="page-item" :class="{ disabled: paginaAtual === totalPaginas }">
        <button class="page-link" @click="irPara(paginaAtual + 1)">
          <i class="bi bi-chevron-right"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PaginacaoPersonagens",
  emits: ["mudar-pagina"],
  props: {
    paginaAtual: Number,
    totalPaginas: Number,
  },
  computed: {
    // Mostra a primeira, a última e as vizinhas da atual, com "..." no meio
    // Ex.: 1 ... 6 7 8 ... 42
    paginasVisiveis() {
      const paginas = [];
      for (let p = 1; p <= this.totalPaginas; p++) {
        const pertoDaAtual = Math.abs(p - this.paginaAtual) <= 1;
        if (p === 1 || p === this.totalPaginas || pertoDaAtual) {
          paginas.push(p);
        } else if (paginas[paginas.length - 1] !== "...") {
          paginas.push("...");
        }
      }
      return paginas;
    },
  },
  methods: {
    irPara(pagina) {
      if (pagina === "..." || pagina < 1 || pagina > this.totalPaginas) return;
      if (pagina === this.paginaAtual) return;
      this.$emit("mudar-pagina", pagina);
    },
  },
};
</script>

<style scoped>
.page-item.active .page-link {
  background-color: #198754;
  border-color: #198754;
}

.page-link {
  color: #198754;
}
</style>
