<template>
  <div class="p-content p-guide p-popover">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">class="c_popover"</h2>
        <div class="group">
          <CPopover />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import CPopover from 'components/common/CPopover.vue';

export default {
  name: 'PopoverPage',
  components: {
    CPopover,
  },
  setup() {
    return {
      ptitle: ref('Popover'),
    };
  },
};
</script>
<script setup>
</script>

<style lang="scss" scoped>
.section{
  h2{
    margin-bottom:10px;
  }
  ~ .section{
    margin-top:50px;
  }
}
.group{
  margin-top:20px;
}
</style>
