<template>
  <main class="home-page">
    <span class="material-symbols-outlined">home</span>
    <h1>Home</h1>
    <p>This is the home page.</p>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  created () {
    this.test()
  },
  methods: {
    test () {
      console.log(4444)
    }
  }

}
</script>

<style lang="scss">

</style>
