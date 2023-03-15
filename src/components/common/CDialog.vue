<template>
  <q-dialog
    :model-value="visible"
    :persistent="persistent"
    :class="`c_dialog ${size}`"
  >
    <q-card>
      <q-card-section :style="`${$slots.contents ? '' : 'max-height:290px' }`" class="c_dialog_body">
        <p class="title">
          <strong>{{ message }}</strong>
        </p>
        <p v-if="description" class="desc" v-html="description"></p>
        <div v-if="$slots.positive || $slots.negative" :class="slotClassList">
          <slot name="positive"></slot>
          <slot name="negative"></slot>
        </div>
        <slot v-if="$slots.contents" name="contents" />
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <slot name="footer"/>
        <!-- <q-btn
          v-if="buttonNegative"
          :label="buttonNegative"
          class="line"
          @click="onNegative()"
        />
        <q-btn
          :label="buttonPositive"
          class="primary"
          @click="onPositive()"
        /> -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import {
  ref, watch, computed, useSlots
} from "vue";
// import { $utils } from "src/utils/utils";

const slots = useSlots();
const isSlotNegative = computed(() => !!slots.negative);
const slotClassList = computed(() => {
  const classList = ["info"];
  if (isSlotNegative.value) {
    classList.push("negative");
  }
  return classList.join(" ");
});
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  persistent: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: "" // medium, large
  },
  message: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
});

const lazyVisible = ref(false);

watch(() => props.visible, () => {
  lazyVisible.value = props.visible;
});
</script>
