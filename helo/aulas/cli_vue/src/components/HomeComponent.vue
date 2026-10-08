
<template>
    <div>
        <header>
            <p>Seja Bem Vindo: {{ nome }}</p>
            <img 
            :width="200"
            :height="altura"
            :src="urlImgCCO"
            />
        </header>
    </div>
</template>

<script>
export default {
    name: "HomeComponent",
    data() {
        return {
            nome: "Heloiza",
            urlImgCCO:
             "https://png.pngtree.com/png-clipart/20230403/original/pngtree-data-science-line-icon-png-image_9020883.png" ,
             width:"200",
            height: "200"

        };
    },
        onMounted(){
            setTimeout (() => {
                this.urlImgCCO = 
                "https://png.pngtree.com/png-clipart/20230403/original/pngtree-data-science-line-icon-png-image_9020883.png"
            
        }, 5 * 1000)
    },
};
</script>