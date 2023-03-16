<script setup>
</script>

<template>
  <router-view />
</template>

<style lang="scss">
:root {

}

* {
  font-family: 'Noto Sans TC', sans-serif;
  box-sizing: border-box;
}

html {
  background-color: rgb(223, 223, 223);
  height: 100vh;
}

body {
  margin:0;
  height: 100vh;
}

button {

}

#app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem
  }
}
</style>
