<template>
    <div>
        <header>
            <p>Seja Bem Vindo: {{ nome }}</p>
            <img
                :width="largura"
               :height="altura"
                :src="urlImgCinenciasDaComputacao"
            />
        </header>
    </div>
</template>

<script>
export default {
    name: "HomeComponent",
    data() {
        return {
            nome: "Sarah Monteiro",
            urlImgCinenciasDaComputacao:
            "https://png.pngtree.com/png-clipart/20230403/original/pngtree-data-science-line-icon-png-image_9020883.png",
            largura:"200",
            altura: "200"
        };
    },
    mounted() {
        setTimeout( () => {
            this.urlImgCinenciasDaComputacao =
            "https://png.pngtree.com/png-clipart/20230403/original/pngtree-data-science-line-icon-png-image_9020883.png"
        }, 5 * 1000)
    }
    
};
</script>
