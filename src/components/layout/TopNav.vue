<template>
  <div class="inner">
    <router-link to="/" class="logo">
      <img
        alt="B CLOUD logo"
        src="~assets/images/common/logo_bcloud.svg"
        style="width: 116px; height: 22px"
      />
    </router-link>
    <div class="c_selectgroup">
      <c-dropdown
        v-if="workspaces.length > 0"
        v-model:selected="workspaceModel"
        :options="workspaces"
        :filled="true"
        popup-content-class="smtext topmenu_opt"
        class="smtext"
        @selected="onSelected"
      />
      <span v-else>-</span>
    </div>
    <q-btn to="/" class="c_btn c_icon top_guidemenu">
      <i class="ico" /><span class="txt">메뉴</span>
    </q-btn>
  </div>
</template>
<script setup>
<<<<<<< HEAD
import { ref, watch, defineEmits } from "vue";
=======
import {
  ref, watch, defineEmits,
} from "vue";
import { useRoute } from "vue-router";
>>>>>>> develop
import CDropdown from "components/common/CDropdown.vue";

const route = useRoute();
const emit = defineEmits(["changeWorkspace"]);
const props = defineProps({
  workspaces: {
    type: Array,
    default: () => [],
  },
});
const workspaceModel = ref("");

<<<<<<< HEAD
watch(
  () => props.workspaces,
  (prop) => {
    menuopt.value = prop.workspaces
      ? prop.workspaces.map((item) => ({ value: item.id, label: item.name }))
      : [];
    workspaceModel.value = menuopt.value[0].label;
  }
);
=======
watch(() => props.workspaces, () => {
  const { workspaceId } = route.params;
  const findWorkspace = props.workspaces.find((item) => item.value === Number(workspaceId));
  workspaceModel.value = findWorkspace.label;
});
>>>>>>> develop

const onSelected = (option) => {
  emit("changeWorkspace", option);
};
</script>
<style lang="scss" scoped></style>
