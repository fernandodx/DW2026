
const cursos = [
{
nome: "HTML e CSS",
descricao: "Aprenda a criar páginas web utilizando HTML e CSS.",
tecnologia: "HTML/CSS",
ativo: true
},
{
nome: "JavaScript",
descricao: "Aprenda lógica de programação e interatividade com JavaScript.",
tecnologia: "JavaScript",
ativo: true
},
{
nome: "Bootstrap",
descricao: "Aprenda a criar interfaces responsivas utilizando Bootstrap.",
tecnologia: "Bootstrap",
ativo: true
},
{
nome: "Node.js",
descricao: "Conheça o desenvolvimento back-end utilizando Node.js.",
tecnologia: "Node.js",
ativo: false
},
{
nome: "Banco de Dados",
descricao: "Aprenda conceitos básicos de bancos de dados e SQL.",
tecnologia: "SQL",
ativo: false
}
];


const listaCursos = document.getElementById("listaCursos");
const btnTodos = document.getElementById("btnTodos");
const btnAtivos = document.getElementById("btnAtivos");


function mostrarCursos(lista) {

listaCursos.innerHTML = "";

if (lista.length === 0) {
    listaCursos.innerHTML = `
        <div class="col-12">
            <div class="alert alert-warning">
                Nenhum curso encontrado.
            </div>
        </div>
    `;

    return;
}

lista.forEach(curso => {

    const status = curso.ativo
        ? "Ativo"
        : "Em breve";

    const statusClass = curso.ativo
        ? "text-bg-success"
        : "text-bg-secondary";

    const cursoHTML = `
        <div class="col-12 col-md-6 col-lg-4">

            <div class="card h-100 shadow-sm">

                <div class="card-body">

                    <div class="d-flex justify-content-between align-items-center mb-3">

                        <span class="badge text-bg-primary">
                            ${curso.tecnologia}
                        </span>

                        <span class="badge ${statusClass}">
                            ${status}
                        </span>

                    </div>

                    <h3 class="card-title h5 fw-bold">
                        ${curso.nome}
                    </h3>

                    <p class="card-text text-secondary">
                        ${curso.descricao}
                    </p>

                </div>

            </div>

        </div>
    `;

    listaCursos.innerHTML += cursoHTML;
});
}


btnTodos.addEventListener("click", () => {

mostrarCursos(cursos);

btnTodos.classList.remove("btn-outline-primary");
btnTodos.classList.add("btn-primary");

btnAtivos.classList.remove("btn-primary");
btnAtivos.classList.add("btn-outline-primary");

});


btnAtivos.addEventListener("click", () => {

const cursosAtivos = cursos.filter(curso => curso.ativo);

mostrarCursos(cursosAtivos);

btnAtivos.classList.remove("btn-outline-primary");
btnAtivos.classList.add("btn-primary");

btnTodos.classList.remove("btn-primary");
btnTodos.classList.add("btn-outline-primary");

});


mostrarCursos(cursos);
