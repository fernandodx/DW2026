<template>
  <div
    class="text-bg-dark py-5 banner-img"
    :style="{ background: 'url(/img/banner.jpeg) center/cover' }"
  >
    <div class="container text-end py-3">
      <h1 class="fw-bold text-warning">Hambúrguer de Churrasqueiro</h1>
      <p>Sabor do Churrasco</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>
