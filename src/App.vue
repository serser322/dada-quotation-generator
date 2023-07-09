<script setup>
</script>

<template>
  <router-view />
</template>

<style lang="scss">
:root {
  --primary-color: rgb(255, 195, 98);
  --text-color: #373b3e
}

* {
  font-family: 'Noto Sans TC', sans-serif;
  box-sizing: border-box;
}

html {
  background-color: rgb(223, 223, 223);
  height: 100%;
}

#app {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
}

/* #app {
  display: flex;

  main {
    flex: 1 1 0;
  }
} */
</style>
