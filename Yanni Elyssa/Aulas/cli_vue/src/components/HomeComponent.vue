<template>
   <div>
    <header>
        <p>Seja bem-vindo: {{ nome }}</p>
        <img width="200" :height="altura" :src="urlImgFlamengo" />
    </header>
   </div>
</template>

<script>
export default {
    name: "HomeComponent",
    data() {
        return {
            nome: "Yanni Elyssa",
            altura: 150,
            urlImgFlamengo:
            "https://i.pinimg.com/736x/58/4b/3b/584b3b5bf8b3892cc567e10cfbfc0e76.jpg",
        }
    },
    mounted() {
        setTimeout(() => {
            this.urlImgFlamengo = 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGC70SC6xRWYX7vsuz-LSP5FKrwPX3PIBWKnhL9epGpiV6pk1XQUv69GU&s=10"
        }, 5 * 1000);
    },
};
</script>
