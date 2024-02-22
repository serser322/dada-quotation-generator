<script setup>
import { register } from 'swiper/element/bundle'

// register Swiper custom elements
register()

const emit = defineEmits(['onImageLoaded'])

let imageLoadedNum = 0
const imageLoad = () => {
  imageLoadedNum++
  imageLoadedNum === 5 && emit('onImageLoaded')
}
</script>

<template>
  <swiper-container
    :speed="2500"
    :navigation="true"
    :pagination="true"
    :pagination-clickable="true"
    :slides-per-view="1"
    :autoplay="{
      delay: 4000,
    }"
    :breakpoints="{
      768: {
        slidesPerView: 2,
      },
      1250: {
        slidesPerView: 3,
      },
    }"
  >
    <swiper-slide>
      <img
        src="../assets/images/example1.png"
        @load="imageLoad"
      >
    </swiper-slide>
    <swiper-slide>
      <img
        src="../assets/images/example2.png"
        @load="imageLoad"
      >
    </swiper-slide>
    <swiper-slide>
      <img
        src="../assets/images/example3.png"
        @load="imageLoad"
      >
    </swiper-slide>
    <swiper-slide>
      <img
        src="../assets/images/example4.png"
        @load="imageLoad"
      >
    </swiper-slide>
    <swiper-slide>
      <img
        src="../assets/images/example5.png"
        @load="imageLoad"
      >
    </swiper-slide>
    <swiper-slide>
      <img
        src="../assets/images/example6.png"
        @load="imageLoad"
      >
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss">
swiper-container {
  width: 100%;
  height: 10rem;
}

swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: auto;
    height: 100%;
  }
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  color: var(--secondary-yellow);
  width: 15px;
}

swiper-container::part(bullet) {
  background-color: white;
  opacity: 0.5;
}

swiper-container::part(bullet-active) {
  background-color: var(--secondary-yellow);
}

@media (min-width: 576px) {
  swiper-container {
    height: 11rem;
  }
}

@media (min-width: 768px) {
  swiper-container {
    height: 10rem;
  }
}

@media (min-width: 992px) {
  swiper-container {
    height: 13rem;
  }
}

@media (min-width: 1250px) {
  swiper-container {
    height: 11rem;
  }
}

@media (min-width: 1450px) {
  swiper-container {
    height: 13rem;
  }
}
</style>
