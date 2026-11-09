const BASE_URL = 'https://rickandmortyapi.com/api'

// Cache em memória: buscas já feitas não fazem nova requisição.
const cache = new Map()

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const EMPTY = { info: { count: 0, pages: 0, next: null, prev: null }, results: [] }

// Busca uma página de personagens, com filtros opcionais
// (name, status, species, gender).
// A API devolve { info: { count, pages, next, prev }, results: [...] }
// A API tem limite de requisições (HTTP 429). Nesse caso esperamos e tentamos de novo.
export async function getCharacters(page = 1, filters = {}, retries = 3) {
  const params = new URLSearchParams({ page })
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value.trim())
  }
  const url = `${BASE_URL}/character?${params}`

  if (cache.has(url)) return cache.get(url)

  for (let attempt = 0; ; attempt++) {
    const response = await fetch(url)

    if (response.status === 429 && attempt < retries) {
      const retryAfter = Number(response.headers.get('Retry-After'))
      await wait(retryAfter > 0 ? retryAfter * 1000 : 1000 * 2 ** attempt)
      continue
    }

    // A API responde 404 quando nenhum personagem combina com os filtros.
    if (response.status === 404) return EMPTY

    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao buscar personagens`)
    }

    const data = await response.json()
    cache.set(url, data)
    return data
  }
}
