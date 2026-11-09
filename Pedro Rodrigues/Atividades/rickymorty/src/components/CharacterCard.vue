<template>
  <article class="card" :class="statusClass">
    <div class="photo">
      <img :src="character.image" :alt="character.name" loading="lazy" />
      <StatusIcon :status="character.status" class="badge" />
      <span class="id">#{{ String(character.id).padStart(3, '0') }}</span>
    </div>

    <div class="info">
      <h2 class="name" :title="character.name">{{ character.name }}</h2>
      <p class="species">{{ character.species }} · {{ genero }}</p>

      <div class="location">
        <svg viewBox="0 0 24 24" class="pin">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
        </svg>
        <div>
          <span class="label">Onde vive</span>
          <span class="place">{{ character.location.name }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import StatusIcon from './StatusIcon.vue'

const props = defineProps({
  character: { type: Object, required: true }
})

// usado para colorir o card de acordo com o status
const statusClass = computed(() => props.character.status.toLowerCase())

const genero = computed(() => {
  const traducao = { Male: 'Masculino', Female: 'Feminino', Genderless: 'Sem gênero' }
  return traducao[props.character.gender] || 'Desconhecido'
})
</script>

<style scoped>
.card {
  --status-color: var(--unknown);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, border-color 0.25s, box-shadow 0.25s;
}

.card.alive { --status-color: var(--alive); }
.card.dead { --status-color: var(--dead); }

.card:hover {
  transform: translateY(-4px);
  border-color: #344050;
  box-shadow: 0 16px 32px -16px #000;
}

.photo {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--bg-soft);
}

/* linha na cor do status separando foto e informações */
.photo::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: var(--status-color);
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease, filter 0.3s;
}

.card:hover .photo img {
  transform: scale(1.04);
}

/* personagem morto fica com a foto em tons de cinza */
.card.dead .photo img {
  filter: grayscale(1) contrast(1.05) brightness(0.75);
}

.card.dead:hover .photo img {
  filter: grayscale(0.2);
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
}

.id {
  position: absolute;
  top: 12px;
  right: 12px;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #ffffffd9;
  background: #0b0f14b3;
  padding: 3px 8px;
  border-radius: 6px;
}

.info {
  padding: 16px 16px 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.name {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.species {
  color: var(--muted);
  font-size: 0.82rem;
  margin-top: 3px;
}

.location {
  margin-top: 14px;
  padding: 10px 12px;
  background: var(--bg-soft);
  border-radius: 8px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.pin {
  width: 16px;
  height: 16px;
  fill: var(--portal);
  flex-shrink: 0;
  margin-top: 3px;
}

.label {
  display: block;
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.place {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.3;
}

@media (max-width: 560px) {
  .info { padding: 12px 12px 10px; }
  .name { font-size: 1rem; }
  .location { padding: 8px 10px; gap: 8px; }
  .badge { top: 8px; left: 8px; }
  .id { display: none; }
}
</style>
