<script setup>
import { register } from 'swiper/element/bundle'
import sweetAlert from 'sweetalert2'
import exampleImage1 from '../assets/images/example1.png'
import exampleImage2 from '../assets/images/example2.png'
import exampleImage3 from '../assets/images/example3.png'
import exampleImage4 from '../assets/images/example4.png'
import exampleImage5 from '../assets/images/example5.png'
import exampleImage6 from '../assets/images/example6.png'

// register Swiper custom elements
register()

const emit = defineEmits(['onImageLoaded'])
const exampleImages = [
  exampleImage1,
  exampleImage2,
  exampleImage3,
  exampleImage4,
  exampleImage5,
  exampleImage6
]

let imageLoadedNum = 0
const imageLoad = () => {
  imageLoadedNum++
  imageLoadedNum === exampleImages.length && emit('onImageLoaded')
}

const previewImage = (customEvent) => {
  const [swiper] = customEvent.detail
  if (typeof swiper.clickedIndex !== 'number') return

  const image = exampleImages[swiper.clickedIndex]
  sweetAlert.fire({
    width: 600,
    imageUrl: image,
    imageWidth: 550,
    imageAlt: '預覽範例',
    confirmButtonText: '關閉'
  })
}
</script>

<template>
  <swiper-container
    :speed="2500"
    :navigation="true"
    :pagination="true"
    :slides-per-view="1"
    :autoplay="{
      delay: 4000,
      pauseOnMouseEnter:true,
      paginationClickable: true
    }"
    :breakpoints="{
      768: {
        slidesPerView: 2,
      },
      1250: {
        slidesPerView: 3,
      },
    }"
    @swiperclick="previewImage"
  >
    <swiper-slide
      v-for="image in exampleImages"
      :key="image"
    >
      <img
        :src="image"
        alt="預覽圖"
        @load="imageLoad"
      >
    </swiper-slide>
    <!-- <swiper-slide>
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
    </swiper-slide> -->
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

    &:hover {
      cursor: pointer;
    }
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
