<template>
  <div>
    <DarkModeSwitcher />
    <div class="container">
      <!-- BEGIN: Error Page -->
      <div class="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left">
        <div class="-intro-x lg:mr-20">
          <img alt="" class="h-48 lg:h-auto"
            src="@/assets/images/error-illustration.svg" />
        </div>
        <div class="text-white mt-10 lg:mt-0">
          <div class="intro-x text-8xl font-medium">404</div>
          <div class="intro-x text-xl lg:text-3xl font-medium mt-5">
            Lỗi. Trang này đã biến mất.
          </div>
          <div class="intro-x text-lg mt-3">
            Bạn có thể đã nhập sai địa chỉ hoặc trang có thể đã di chuyển.
          </div>
          <button @click="backHome"
            class="intro-x btn py-3 px-4 text-white border-white dark:border-darkmode-400 dark:text-slate-200 mt-10">
            Quay lại trang chủ
          </button>
        </div>
      </div>
      <!-- END: Error Page -->
    </div>
  </div>
</template>
<script>

export default {
  name: 'MainError',
  data() {

  },
  created() {

  },

  methods: {
    backHome() {
      this.$router.push('/')
    }
  },
}
</script>
<script setup>
import { onMounted } from "vue";
import dom from "@left4code/tw-starter/dist/js/dom";

onMounted(() => {
  dom("body").removeClass("main").removeClass("login").addClass("error-page");
});
</script>
