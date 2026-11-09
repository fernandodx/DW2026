<template>
  <nav class="pagination" aria-label="Paginação">
    <button class="nav" :disabled="!hasPrev" @click="emit('change', page - 1)">
      ← Anterior
    </button>

    <div class="pages">
      <template v-for="(item, index) in visiblePages" :key="index">
        <span v-if="item === '...'" class="dots">…</span>
        <button
          v-else
          class="number"
          :class="{ active: item === page }"
          @click="emit('change', item)"
        >
          {{ item }}
        </button>
      </template>
    </div>

    <button class="nav" :disabled="!hasNext" @click="emit('change', page + 1)">
      Próxima →
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  hasPrev: { type: Boolean, default: false },
  hasNext: { type: Boolean, default: false }
})

const emit = defineEmits(['change'])

// Mostra a primeira, a última e duas páginas ao redor da atual.
// Ex.: 1 ... 6 7 [8] 9 10 ... 42
const visiblePages = computed(() => {
  const total = props.totalPages
  const atual = props.page
  const lista = []

  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - atual) <= 2) {
      lista.push(p)
    } else if (lista[lista.length - 1] !== '...') {
      lista.push('...')
    }
  }

  return lista
})
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.pages {
  display: flex;
  gap: 6px;
  align-items: center;
}

button {
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

button:hover:not(:disabled) {
  border-color: var(--portal);
  color: var(--portal-light);
}

button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.nav {
  padding: 9px 16px;
  font-weight: 500;
}

.number {
  min-width: 38px;
  height: 38px;
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 700;
}

.number.active {
  background: var(--portal);
  border-color: var(--portal);
  color: #10200a;
}

.dots {
  color: var(--muted);
  padding: 0 2px;
}

@media (max-width: 560px) {
  .pagination { gap: 8px; }
  .pages { order: -1; width: 100%; justify-content: center; }
  .nav { flex: 1; }
}
</style>
