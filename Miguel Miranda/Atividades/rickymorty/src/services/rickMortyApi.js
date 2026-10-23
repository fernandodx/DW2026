const URL_BASE = "https://rickandmortyapi.com/api/character";

// Busca uma página de personagens. A API devolve { info, results },
// onde info traz o total de páginas e os links da próxima/anterior.
export async function buscarPersonagens(pagina = 1, nome = "", status = "") {
  const parametros = new URLSearchParams({ page: pagina });
  if (nome) parametros.append("name", nome);
  if (status) parametros.append("status", status);

  const resposta = await fetch(`${URL_BASE}?${parametros}`);

  // A API responde 404 quando a busca não encontra ninguém
  if (resposta.status === 404) {
    return { info: { count: 0, pages: 0 }, results: [] };
  }
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao buscar personagens`);
  }

  return resposta.json();
}
