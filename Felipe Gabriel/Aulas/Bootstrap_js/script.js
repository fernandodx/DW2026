const cursos = [
    {
        id: 1,
        nome : "HTML e CSS",
        descricao: "Aprenda a estrutura",
        cargaHoraria: 40,
        ativo: true,
        categoria: "Frontend"
    },
    {
        id: 2,
        nome : "javaScript",
        descricao: "Aprenda a programar",
        cargaHoraria: 40,
        ativo: true,
        categoria: "Backend"
    }
];
const listaCursos = document.querySelector("#listaCursos");
const btnTodos = document.querySelector("#btnTodos");
const btnAtivos = document.querySelector("#btnAtivos")

function redenzirarCursos(lista) {
    listaCursos.innerHTML = "";

    lista.forEach(curso => {
        const card = `
        <div>
            <span>
                ${curso.categoria}
            </span>
            <h3>
                ${curso.nome}
            </h3>
            <p>
                ${curso.descricao}
            </p>

        </div>
        `;
        listaCursos.insertAdjacentHTML("beforeend", card);
    });
}
redenzirarCursos(cursos);

btnTodos.addEventListener("click", () => {});