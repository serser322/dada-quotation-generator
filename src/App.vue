<script setup>
</script>

<template>
  <router-view />
</template>

<style lang="scss">
:root {
  --primary-yellow: rgb(251, 196, 57);
  --secondary-yellow: #fab802;
  --primary-grey: #5E5A6B;
  --secondary-grey: #A29DB3;
  --tertiary-grey: #414141;
  --primary-red: #DF5761;
  /* --text-color: #373b3e; */
  --text-color: #fab802;
  --placeholder-color: #d4d4d4;
  --sidebar-background-color: rgb(62, 62, 62);
  --title-font-size: 1.2rem;
  --title-font-size-pad: 1.5rem;
  --invalid-text-size: 0.6rem;
  --invalid-text-size-pad: 0.8rem;
  --input-font-size: 1.1rem;
  --input-font-size-pad: 1.3rem;
  --image-shadow: 0 0 10px 4px rgb(0, 0, 0, 0.25);
  --element-shadow: 3px 3px 4px rgb(0, 0, 0, 0.2);
}

* {
  font-family: 'Noto Sans TC', sans-serif;
  box-sizing: border-box;
}

html {
  background-color: #ECECEC;
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
