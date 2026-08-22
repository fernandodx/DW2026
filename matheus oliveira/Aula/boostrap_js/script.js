const cursos = [
    {
        id: 1,
        nome: "HTML e CSS",
        descricao: "Aprenda a estrutura",
        cargaHoraria: 40,
        ativo: true,
        categoria: "Frontend"
    },
    {
        id: 2,
        nome: "javascript",
        descricao: "Aprenda a programar",
        cargaHoraria: 40,
        ativo: true,
        categoria: "Backend"
    }
];
const listaCursos = document.querySelector("#lista-Cursos");
const btntodos = document.querySelector("#btn-Todos");
const btnativos = document.querySelector("#btn-Ativos");

function renderizarCursos(lista) {
    listacursos.innerHTML = "";
    lista.forEach(curso => {
    const card = `
        <div>
            <span>
                ${curso.categoria}
            </span>
            <h3>${curso.nome}</h3>
            <p>${curso.descricao}</p>
            <p>${curso.descricao}h</p>
        </div>
        `;
        listaCursos.insertAdjacentHTML("beforeend", card);
    });
}
renderizarCursos(cursos);
btntodos.addEventListener("click", () => {});
    