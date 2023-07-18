<script setup>
</script>

<template>
  <router-view />
</template>

<style lang="scss">
:root {
  --primary-color: rgb(251, 196, 57);
  --text-color: #373b3e;
  --sidebar-background-color: rgb(62, 62, 62);
  --title-font-size: 1.2rem;
  --title-font-size-pad: 1.5rem;
  --invalid-text-size: 0.6rem;
  --invalid-text-size-pad: 0.8rem;
  --input-font-size: 1.1rem;
  --input-font-size-pad: 1.3rem;
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
