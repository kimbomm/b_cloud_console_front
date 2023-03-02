<template>
  <q-btn
    @click="onClick"
    :class="classList"
    :disabled="disabled"
  >
    <template v-if="!onlyIcon">
      <slot name="prepend" />
      <span class="txt">{{ btnNames }}</span>
      <slot name="append" />
    </template>
    <template v-else>
      <slot />
    </template>
  </q-btn>
</template>
<script setup>
import { defineEmits, computed } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "", // medium || large
  },
  outline: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onlyIcon: {
    type: Boolean,
    default: false,
  },
  btnNames: {
    type: String,
    required: true,
    default: "Button",
  },
});

const classList = computed(() => {
  const className = ["c_btn"];
  if (props.size) className.push(props.size);
  if (props.outline) className.push("line");
  if (props.onlyIcon) className.push("c_icon");

  return className.join(" ");
});
const emit = defineEmits(["click"]);
const onClick = () => {
  emit("click");
};
</script>
