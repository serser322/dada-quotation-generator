<script setup>
import { ref, computed } from 'vue'
import GithubButton from 'vue-github-button'
import BaseLoader from '../components/BaseLoader.vue'
const isTruthShow = ref(false)

// Loading
const footerImagesNum = ref(0)
const isLoadDown = computed(() => footerImagesNum.value === 2)
const footerImagesLoad = () => {
  footerImagesNum.value++
}
</script>

<template>
  <BaseLoader v-show="!isLoadDown" />
  <footer v-show="isLoadDown">
    <div class="footer">
      <div class="dada">
        <div class="image">
          <img
            v-show="!isTruthShow"
            src="../assets/images/footer_image1.png"
            alt=""
            @load="footerImagesLoad"
          >
          <img
            v-show="isTruthShow"
            src="../assets/images/footer_image2.png"
            alt=""
            @load="footerImagesLoad"
          >
        </div>
        <div class="info">
          <div v-show="!isTruthShow">
            灰妲，人稱「台V大波鸚」，廚藝精湛，優雅美麗，是粉絲心中最婆的氣質系偶像Vtuber。
          </div>
          <div v-show="isTruthShow">
            <b>
              灰妲，人稱「台V香雞腿」，暗黑料理大師，中二混沌，是五星好平的搞笑型諧咖Vtuber。
            </b>
          </div>
          <button @click="isTruthShow = !isTruthShow">
            點此查看真相
          </button>
        </div>
      </div>

      <div class="link">
        <div class="title">
          訂閱灰妲 人生騰達
        </div>
        <div class="link__list">
          <a href="https://www.youtube.com/@ReLiveDaDa">
            <img
              src="@/assets/icons/youtube.svg"
              alt=""
            >
            <span>灰妲Youtube</span>
          </a>
          <a href="https://twitter.com/DadaRelive">
            <img
              src="@/assets/icons/twitter.png"
              alt=""
            >
            <span>灰妲Twitter</span>
          </a>
          <a href="https://www.facebook.com/da.gray.524">
            <img
              src="@/assets/icons/facebook.svg"
              alt=""
            >
            <span>灰妲Facebook</span>
          </a>
          <a href="https://relive-project0.com/">
            <img
              src="@/assets/icons/web.svg"
              alt=""
            >
            <span>Relive官網</span>
          </a>
        </div>
      </div>

      <div class="source">
        <div class="title">
          圖片來源
        </div>
        <div>本站所有圖片，均取自灰妲官方非營利二創素材包。</div>
      </div>
      <div class="about">
        <div class="title">
          關於本站
        </div>
        <div class="containt">
          本站由<span class="secret">雞腿幫成員</span>小魯蛇蛇製作，無任何營利，歡迎大家多加紀錄灰妲的名言錦句<span class="secret">
            或混沌發言
          </span>。
        </div>
        <div class="github">
          <!-- Place this tag where you want the button to render. -->
          <github-button
            href="https://github.com/serser322/vtuber-quotation-generator"
            data-color-scheme="no-preference: light_high_contrast; light: light; dark: light;"
            data-icon="octicon-star"
            data-size="large"
            aria-label="Star serser322/vtuber-quotation-generator on GitHub"
          >
            Github給我顆星QQ
          </github-button>
        </div>
      </div>
    </div>
    <div class="copyright">
      <div class="line" />
      <div>Copyright©2023. All rights reserved.</div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: var(--tertiary-grey);
  padding: 1rem 2rem;
  gap: 2rem;
  position: relative;
  opacity: 0;
  animation: footerAnimate 0.6s ease-in-out 0.2s forwards;

  .dada {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;

    .image {
      width: 100%;
      max-width: 8.5rem;

      img {
        width: 100%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
    }
  }

  .link {
    .link__list {
      display: flex;
      flex-direction: column;
      align-items: center;

      a {
        display: flex;
        align-items: end;
        gap: 5px;
        color: white;
        margin-bottom: 0.7rem;

        img {
          width: 18px;
        }

      }
    }
  }

  .about {
    display: flex;
    flex-direction: column;
    align-items: center;

    .github {
      display: flex;
      margin-top: 1rem;
    }
  }

  .source {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

}

.copyright {
  font-size: 0.8rem;
  color: white;
  background-color: var(--tertiary-grey);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.5rem;

  .line {
    height: 1px;
    width: 95vw;
    background: rgb(84, 84, 84);
    margin-bottom: 0.5rem;
  }

  div {
    display: flex;
    justify-content: center;
  }
}

.title {
  color: var(--primary-yellow);
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 0.5rem
}

.secret {
  background-color: black;
  color: black;

  &:hover,
  &:active {
    color: white
  }
}

button {
  border: 0;
  color: white;
  background-color: var(--primary-red);
  border-radius: 5px;
  font-size: 0.8rem;
  width: 6rem;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-yellow);
  }

  &:active {
    background-color: var(--primary-yellow);
  }
}

@keyframes footerAnimate {
  0% {
    opacity: 0%;
    top: 30px;
  }

  100% {
    opacity: 100%;
    top: 0;
  }
}

@media (min-width:576px) {
  .footer {
    padding: 1rem 2rem;
    align-items: start;

    .dada {
      display: flex;
      flex-direction: row;

      .image {
        align-items: start;
      }

      .info {
        display: block;

        button {
          margin-top: 1rem;
          float: right;
        }
      }
    }

    .link {
      .link__list {
        /* display: block; */
        flex-direction: row;
        align-items: start;
        gap: 1rem;

        a {
          margin-bottom: 0;
        }
      }
    }

    .about {
      align-items: start;
    }

    .source {
      align-items: start;
    }
  }
}

@media (min-width: 768px) {
  .footer {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    grid-template-rows: 1fr 0.6fr;
    gap: 2rem 4rem;

    .link {

      .link__list {
        flex-direction: column;
        gap: 10px;

        a {
          gap: 10px;
        }
      }
    }

    .source {
      order: 4;
    }
  }

}

@media (min-width: 992px) {
  .footer {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 1fr 0.4fr;

  }

}

@media (min-width: 1200px) {
  .footer {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    grid-template-rows: 0.4fr;

    .source {
      order: 0;
    }
  }
}
</style>
