<template>
  <span class="status" :class="statusClass" :title="label">
    <!-- Vivo: coração pulsando -->
    <svg v-if="statusClass === 'alive'" viewBox="0 0 24 24" class="icon pulse">
      <path d="M12 21s-7.5-4.6-9.6-9.1C.9 8.6 3 4.5 6.9 4.5c2.2 0 3.6 1.3 5.1 3.1 1.5-1.8 2.9-3.1 5.1-3.1 3.9 0 6 4.1 4.5 7.4C19.5 16.4 12 21 12 21z" />
    </svg>

    <!-- Morto: caveira -->
    <svg v-else-if="statusClass === 'dead'" viewBox="0 0 24 24" class="icon">
      <path d="M12 2C6.9 2 3 5.7 3 10.5c0 2.7 1.3 5 3.3 6.5V20c0 .6.4 1 1 1h1.5v-2h1.5v2h3.4v-2h1.5v2h1.5c.6 0 1-.4 1-1v-3c2-1.5 3.3-3.8 3.3-6.5C21 5.7 17.1 2 12 2zM8.5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>

    <!-- Desconhecido -->
    <svg v-else viewBox="0 0 24 24" class="icon">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 16h-2v-2h2v2zm1.7-6.6-.9.9c-.6.6-.8 1.1-.8 2.2h-2v-.5c0-1 .4-1.9 1-2.5l1.2-1.3c.4-.3.6-.8.6-1.4a2 2 0 0 0-4 0H7.8a4.2 4.2 0 0 1 8.4 0c0 1-.5 1.9-1.5 2.6z" />
    </svg>

    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, required: true }
})

// A API retorna "Alive", "Dead" ou "unknown"
const statusClass = computed(() => props.status.toLowerCase())

const label = computed(() => {
  const labels = { alive: 'Vivo', dead: 'Morto' }
  return labels[statusClass.value] || 'Desconhecido'
})
</script>

<style scoped>
.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px 5px 8px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: #0b0f14d9;
  border: 1px solid color-mix(in srgb, currentColor 45%, transparent);
  backdrop-filter: blur(6px);
}

.icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.alive { color: var(--alive); }
.dead { color: var(--dead); }
.unknown { color: var(--unknown); }

.pulse {
  animation: pulse 1.4s ease-in-out infinite;
}

@media (max-width: 560px) {
  .status { font-size: 0.68rem; padding: 4px 8px 4px 6px; gap: 4px; }
  .icon { width: 13px; height: 13px; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
</style>
