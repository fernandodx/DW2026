<template>
  <div class="row g-2 mb-4">
    <div class="col-md-8">
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input
          type="text"
          class="form-control"
          placeholder="Buscar personagem pelo nome..."
          :value="nome"
          @input="$emit('update:nome', $event.target.value)"
        />
      </div>
    </div>
    <div class="col-md-4">
      <select
        class="form-select"
        :value="status"
        @change="$emit('update:status', $event.target.value)"
      >
        <option value="">Todos os status</option>
        <option value="alive">Vivos</option>
        <option value="dead">Mortos</option>
        <option value="unknown">Desconhecido</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "FiltroPersonagens",
  emits: ["update:nome", "update:status"],
  props: {
    nome: String,
    status: String,
  },
};
</script>
