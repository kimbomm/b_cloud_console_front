<template>
  <!-- Start : Size, Small -->
  <template v-if="sizeTypes===1">
    <!-- Default -->
    <button v-if="btnTypes===1" type="button" class="c_btn">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===11" type="button" class="c_btn" disabled>
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===12" type="button" class="c_btn hover">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===13" type="button" class="c_btn focus">
      <span>{{btnNames}}</span>
    </button>

    <!-- Icon Left -->
    <button v-else-if="btnTypes===2" type="button" class="c_btn">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===21" type="button" class="c_btn" disabled>
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===22" type="button" class="c_btn hover">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===23" type="button" class="c_btn focus">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>

    <!-- Icon Right -->
    <button v-else-if="btnTypes===3" type="button" class="c_btn">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===31" type="button" class="c_btn" disabled>
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===32" type="button" class="c_btn hover">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===33" type="button" class="c_btn focus">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>

    <!-- Line Default -->
    <button v-else-if="btnTypes===4" type="button" class="c_btn line">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===41" type="button" class="c_btn line" disabled>
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===42" type="button" class="c_btn line hover">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===43" type="button" class="c_btn line focus">
      <span>{{btnNames}}</span>
    </button>

    <!-- Line Icon Left -->
    <button v-else-if="btnTypes===5" type="button" class="c_btn line">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===51" type="button" class="c_btn line" disabled>
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===52" type="button" class="c_btn line hover">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===53" type="button" class="c_btn line focus">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>

    <!-- Line Icon Right -->
    <button v-else-if="btnTypes===6" type="button" class="c_btn line">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===61" type="button" class="c_btn line" disabled>
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===62" type="button" class="c_btn line">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===63" type="button" class="c_btn line">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
  </template>
  <!-- End : Size, Small -->

  <!-- Start : Size, Medium -->
  <template v-else-if="sizeTypes===2">
    <!-- Default -->
    <button v-if="btnTypes===1" type="button" class="c_btn medium">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===11" type="button" class="c_btn medium" disabled>
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===12" type="button" class="c_btn medium hover">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===13" type="button" class="c_btn medium focus">
      <span>{{btnNames}}</span>
    </button>

    <!-- Icon Left -->
    <button v-else-if="btnTypes===2" type="button" class="c_btn medium">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===21" type="button" class="c_btn medium" disabled>
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===22" type="button" class="c_btn medium hover">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===23" type="button" class="c_btn medium focus">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>

    <!-- Icon Right -->
    <button v-else-if="btnTypes===3" type="button" class="c_btn medium">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===31" type="button" class="c_btn medium" disabled>
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===32" type="button" class="c_btn medium hover">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===33" type="button" class="c_btn medium focus">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>

    <!-- Line Default -->
    <button v-else-if="btnTypes===4" type="button" class="c_btn line medium">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===41" type="button" class="c_btn line medium" disabled>
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===42" type="button" class="c_btn line medium hover">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===43" type="button" class="c_btn line medium focus">
      <span>{{btnNames}}</span>
    </button>

    <!-- Line Icon Left -->
    <button v-else-if="btnTypes===5" type="button" class="c_btn line medium">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===51" type="button" class="c_btn line medium" disabled>
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===52" type="button" class="c_btn line medium hover">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===53" type="button" class="c_btn line medium focus">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>

    <!-- Line Icon Right -->
    <button v-else-if="btnTypes===6" type="button" class="c_btn line medium">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===61" type="button" class="c_btn line medium" disabled>
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===62" type="button" class="c_btn line medium">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===63" type="button" class="c_btn line medium">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
  </template>
  <!-- End : Size, Medium -->

  <!-- Start : Size, Large -->
  <template v-else-if="sizeTypes===3">
    <!-- Default -->
    <button v-if="btnTypes===1" type="button" class="c_btn large">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===11" type="button" class="c_btn large" disabled>
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===12" type="button" class="c_btn large hover">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===13" type="button" class="c_btn large focus">
      <span>{{btnNames}}</span>
    </button>

    <!-- Icon Left -->
    <button v-else-if="btnTypes===2" type="button" class="c_btn large">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===21" type="button" class="c_btn large" disabled>
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===22" type="button" class="c_btn large hover">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===23" type="button" class="c_btn large focus">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>

    <!-- Icon Right -->
    <button v-else-if="btnTypes===3" type="button" class="c_btn large">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===31" type="button" class="c_btn large" disabled>
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===32" type="button" class="c_btn large hover">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===33" type="button" class="c_btn large focus">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>

    <!-- Line Default -->
    <button v-else-if="btnTypes===4" type="button" class="c_btn line large">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===41" type="button" class="c_btn line large" disabled>
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===42" type="button" class="c_btn line large hover">
      <span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===43" type="button" class="c_btn line large focus">
      <span>{{btnNames}}</span>
    </button>

    <!-- Line Icon Left -->
    <button v-else-if="btnTypes===5" type="button" class="c_btn line large">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===51" type="button" class="c_btn line large" disabled>
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===52" type="button" class="c_btn line large hover">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>
    <button v-else-if="btnTypes===53" type="button" class="c_btn line large focus">
      <i class="ico plus" /><span>{{btnNames}}</span>
    </button>

    <!-- Line Icon Right -->
    <button v-else-if="btnTypes===6" type="button" class="c_btn line large">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===61" type="button" class="c_btn line large" disabled>
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===62" type="button" class="c_btn line large">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
    <button v-else-if="btnTypes===63" type="button" class="c_btn line large">
      <span>{{btnNames}}</span><i class="ico plus" />
    </button>
  </template>
  <!-- End : Size, Large -->
</template>
<script>
export default {
  props: {
    sizeTypes: {
      type: Number,
      default: 1,
    },
    btnTypes: {
      type: Number,
      default: 1,
    },
    btnNames: {
      type: String,
      required: true,
      default: 'Button',
    },
  },
  setup() {
    return {

    };
  },
};
</script>
