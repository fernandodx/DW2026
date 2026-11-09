<template>
  <header class="header">
    <div class="container header-content">
      <div class="brand">
        <img src="./assets/portal.png" alt="" class="portal" />
        <span class="logo">Rick <em>and</em> Morty</span>
        <span class="divider"></span>
        <span class="subtitle">Catálogo de personagens</span>
      </div>

      <ul class="legend">
        <li class="alive">Vivo</li>
        <li class="dead">Morto</li>
        <li class="unknown">Desconhecido</li>
      </ul>
    </div>
  </header>

  <main class="container">
    <section class="intro">
      <h1>Personagens</h1>
      <p v-if="info">
        <strong>{{ info.count }}</strong> personagens encontrados ·
        página <strong>{{ page }}</strong> de {{ info.pages }}
      </p>
    </section>

    <!-- Filtros -->
    <form class="filters" @submit.prevent>
      <input
        v-model="filters.name"
        type="search"
        placeholder="Buscar por nome…"
        class="search"
      />
      <select v-model="filters.status">
        <option value="">Todos os status</option>
        <option value="alive">Vivo</option>
        <option value="dead">Morto</option>
        <option value="unknown">Desconhecido</option>
      </select>
      <select v-model="filters.gender">
        <option value="">Todos os gêneros</option>
        <option value="female">Feminino</option>
        <option value="male">Masculino</option>
        <option value="genderless">Sem gênero</option>
        <option value="unknown">Desconhecido</option>
      </select>
      <select v-model="filters.species">
        <option value="">Todas as espécies</option>
        <option value="Human">Humano</option>
        <option value="Alien">Alienígena</option>
        <option value="Humanoid">Humanoide</option>
        <option value="Robot">Robô</option>
        <option value="Animal">Animal</option>
        <option value="Mythological Creature">Criatura mitológica</option>
        <option value="Cronenberg">Cronenberg</option>
        <option value="Disease">Doença</option>
        <option value="Poopybutthole">Poopybutthole</option>
      </select>
      <button v-if="hasFilters" type="button" class="clear" @click="clearFilters">
        Limpar
      </button>
    </form>

    <!-- Erro -->
    <div v-if="error" class="feedback">
      <p>Não foi possível carregar os personagens.</p>
      <small>{{ error }}</small>
      <button @click="loadCharacters(page)">Tentar novamente</button>
    </div>

    <!-- Carregando -->
    <section v-else-if="loading" class="grid">
      <div v-for="n in 8" :key="n" class="skeleton"></div>
    </section>

    <!-- Nenhum resultado -->
    <div v-else-if="characters.length === 0" class="empty">
      <img src="./assets/portal.png" alt="" />
      <p>Nenhum personagem encontrado nessa dimensão.</p>
      <button @click="clearFilters">Limpar filtros</button>
    </div>

    <!-- Lista -->
    <section v-else class="grid">
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </section>

    <PaginationBar
      v-if="info && info.pages > 1 && !error"
      class="pagination"
      :page="page"
      :total-pages="info.pages"
      :has-prev="!!info.prev"
      :has-next="!!info.next"
      @change="changePage"
    />
  </main>

  <footer class="footer">
    Dados da <a href="https://rickandmortyapi.com" target="_blank">The Rick and Morty API</a>
  </footer>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { getCharacters } from './services/api'
import CharacterCard from './components/CharacterCard.vue'
import PaginationBar from './components/PaginationBar.vue'

const characters = ref([])
const info = ref(null) // { count, pages, next, prev }
const page = ref(1)
const loading = ref(false)
const error = ref('')

const filters = reactive({ name: '', status: '', gender: '', species: '' })
const hasFilters = computed(() => Object.values(filters).some(Boolean))

function clearFilters() {
  Object.assign(filters, { name: '', status: '', gender: '', species: '' })
}

// Ao mudar um filtro, volta para a página 1.
// A busca por nome espera o usuário parar de digitar (400 ms) para não estourar o limite da API.
let debounce
watch(
  () => ({ ...filters }),
  (now, before) => {
    clearTimeout(debounce)
    const delay = now.name !== before.name ? 400 : 0
    debounce = setTimeout(() => loadCharacters(1), delay)
  }
)

let lastRequest = 0

async function loadCharacters(pageNumber) {
  const requestId = ++lastRequest
  loading.value = true
  error.value = ''

  try {
    const data = await getCharacters(pageNumber, filters)
    if (requestId !== lastRequest) return // uma requisição mais nova já foi feita
    characters.value = data.results
    info.value = data.info
    page.value = pageNumber
  } catch (e) {
    if (requestId === lastRequest) error.value = e.message
  } finally {
    if (requestId === lastRequest) loading.value = false
  }
}

function changePage(newPage) {
  if (newPage < 1 || newPage > info.value.pages || newPage === page.value) return
  loadCharacters(newPage)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => loadCharacters(1))
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---------- Cabeçalho ---------- */
.header {
  border-bottom: 1px solid var(--border);
  background: #07140ad9;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 64px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.logo em {
  font-style: normal;
  color: var(--portal);
}

.divider {
  width: 1px;
  height: 20px;
  background: var(--border);
}

.subtitle {
  color: var(--muted);
  font-size: 0.85rem;
}

.legend {
  list-style: none;
  display: flex;
  gap: 18px;
  font-size: 0.8rem;
  color: var(--muted);
}

.legend li {
  display: flex;
  align-items: center;
  gap: 7px;
}

.legend li::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.legend .alive::before { background: var(--alive); box-shadow: 0 0 8px var(--alive); }
.legend .dead::before { background: var(--dead); }
.legend .unknown::before { background: var(--unknown); }

.portal {
  height: 44px;
  width: auto;
}

/* ---------- Filtros ---------- */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 26px;
}

.filters input,
.filters select {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text);
  font: inherit;
  font-size: 0.9rem;
}

.filters .search {
  flex: 1 1 240px;
}

.filters input:focus,
.filters select:focus {
  outline: none;
  border-color: var(--portal);
  box-shadow: 0 0 0 3px #97ce4c33;
}

.filters .clear {
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.filters .clear:hover {
  color: var(--text);
  border-color: var(--portal);
}

.empty {
  text-align: center;
  padding: 50px 20px;
  color: var(--muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.empty img {
  height: 120px;
  opacity: 0.8;
}

.empty button {
  padding: 9px 18px;
  border-radius: 8px;
  border: none;
  background: var(--portal);
  color: #10200a;
  font-weight: 600;
  cursor: pointer;
}

/* ---------- Introdução ---------- */
.intro {
  padding: 44px 0 28px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.intro h1 {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 2.4rem;
  line-height: 1;
}

.intro p {
  color: var(--muted);
  font-size: 0.9rem;
}

.intro strong {
  color: var(--text);
  font-weight: 600;
}

/* ---------- Grade de cards ---------- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 22px;
}

.skeleton {
  aspect-ratio: 3 / 4.2;
  border-radius: 12px;
  background: linear-gradient(100deg, var(--bg-card) 40%, #1a3a21 50%, var(--bg-card) 60%);
  background-size: 200% 100%;
  animation: shimmer 1.2s linear infinite;
}

@keyframes shimmer {
  to { background-position: -200% 0; }
}

.feedback {
  text-align: center;
  padding: 60px 20px;
  border: 1px dashed var(--dead);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.feedback small {
  color: var(--muted);
}

.feedback button {
  margin-top: 10px;
  padding: 9px 18px;
  border-radius: 8px;
  border: none;
  background: var(--portal);
  color: #10200a;
  font-weight: 600;
  cursor: pointer;
}

.pagination {
  margin: 44px 0 16px;
}

.footer {
  text-align: center;
  padding: 28px;
  color: var(--muted);
  font-size: 0.82rem;
}

.footer a {
  color: var(--text);
  text-decoration-color: var(--portal);
  text-underline-offset: 3px;
}

@media (max-width: 720px) {
  .subtitle, .divider { display: none; }
}

@media (max-width: 560px) {
  .container { padding: 0 14px; }
  .legend { gap: 12px; font-size: 0.72rem; }
  .logo { font-size: 1rem; }
  .portal { height: 34px; }
  .filters select { flex: 1 1 45%; }
  .intro { padding: 28px 0 18px; }
  .intro h1 { font-size: 1.8rem; }
  .grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
}
</style>
