<template>
  <div class="section-content">
      <router-view/>
  </div>
</template>
<script>
export default {
    name:"Section"
}
</script>
<style scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .section-content {
    height: 90vh;
    box-shadow: inset 0px 0px 15px -2px;
    background: whitesmoke;
  }
</style>