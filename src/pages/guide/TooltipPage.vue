<template>
  <div class="p-content p-guide p-tooltip">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">class="c_tooltip"</h2>
        <div class="group">
          <q-btn label="Hover me" color="primary" class="c_btn">
            <CTooltip />
          </q-btn>
        </div>
        <div class="group">
          <q-btn label="Hover me" color="primary" class="c_btn">
            <q-tooltip
              v-model="showing1"
              aanchor="top middle" self="bottom middle"
              class="c_tooltip bottom"
            >
              <div class="inner">
                Tooltip text Tooltip text Tooltip text Tooltip text
              </div>
            </q-tooltip>
          </q-btn>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMeta } from "quasar";
import CTooltip from "components/common/CTooltip.vue";

export default {
  name: "TooltipPage",
  components: {
    CTooltip,
  },
  setup() {
    const title = ref("Tooltip");
    useMeta(() => ({
      title: title.value,
    }));
    return {
      ptitle: ref(title),
      showing1: ref(true),
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
