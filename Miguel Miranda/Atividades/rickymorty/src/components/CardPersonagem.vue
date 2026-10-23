<template>
  <div class="card h-100 shadow-sm card-personagem">
    <div class="position-relative">
      <img class="card-img-top" :src="imagem" :alt="nome" loading="lazy" />
      <span
        class="badge rounded-pill position-absolute top-0 end-0 m-2 fs-6"
        :class="infoStatus.classe"
        :title="infoStatus.texto"
      >
        <i class="bi" :class="infoStatus.icone"></i>
        {{ infoStatus.texto }}
      </span>
    </div>

    <div class="card-body">
      <h5 class="card-title mb-3">{{ nome }}</h5>
      <p class="card-text small text-muted mb-1">Onde vive:</p>
      <p class="card-text">
        <i class="bi bi-geo-alt-fill text-success"></i>
        {{ local }}
      </p>
    </div>
  </div>
</template>

<script>
// Ícone, cor e texto para cada status que a API pode devolver
const STATUS = {
  Alive: { texto: "Vivo", icone: "bi-heart-pulse-fill", classe: "text-bg-success" },
  Dead: { texto: "Morto", icone: "bi-heartbreak-fill", classe: "text-bg-danger" },
  unknown: { texto: "Desconhecido", icone: "bi-question-circle-fill", classe: "text-bg-secondary" },
};

export default {
  name: "CardPersonagem",
  props: {
    nome: String,
    imagem: String,
    local: String,
    status: String,
  },
  computed: {
    infoStatus() {
      return STATUS[this.status] || STATUS.unknown;
    },
  },
};
</script>

<style scoped>
.card-personagem {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-personagem:hover {
  transform: translateY(-4px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2) !important;
}

.card-img-top {
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
</style>
