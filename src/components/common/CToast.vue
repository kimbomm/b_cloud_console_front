<template>
  <template v-if="toastTypes===1">
    <div class="c_toast">
      <div class="inner">
        <p class="desc">{{ toastMsg }}</p>
        <button type="button" class="c_btn toast_close">
          <i class="ico close" /><span class="hidden">닫기</span>
        </button>
      </div>
    </div>
  </template>
  <template v-else-if="toastTypes===2">
    <div class="c_toast">
      <div class="inner">
        <p class="desc">{{ toastMsg }}</p>
        <button type="button" class="c_btn toast_close">
          <i class="ico close" /><span class="hidden">닫기</span>
        </button>
      </div>
    </div>
  </template>
  <template v-else-if="toastTypes===3">
    <div class="c_toast">
      <div class="inner">
        <p class="desc">{{ toastMsg }}</p>
        <a :href="link"><span>{{ linkName }}</span></a>
        <button type="button" class="c_btn toast_close">
          <i class="ico close" /><span class="hidden">닫기</span>
        </button>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="c_toast">
      <div class="inner">
        <p class="desc">{{ toastMsg }}</p>
        <button type="button" class="c_btn toast_close">
          <i class="ico close" /><span class="hidden">닫기</span>
        </button>
      </div>
    </div>
  </template>
</template>
<script>
export default {
  props: {
    toastTypes: {
      type: Number,
    },
    toastMsg: {
      type: String,
      required: true,
      default: "",
    },
    link: {
      type: String,
      default: "#",
    },
    linkName: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {

    };
  },
};
</script>
<script setup>
</script>
