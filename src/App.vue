<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'XinYao',
    async mounted(){
    }
  }
</script>

<style>

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
  }

  * {
    padding: 0;
    margin: 0;
  }
  html {
    font-size: calc(100vw/1920*100);
  }
</style>
