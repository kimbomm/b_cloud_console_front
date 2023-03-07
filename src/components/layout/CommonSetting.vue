<script setup>
import { defineEmits } from "vue";
import { UserService } from "src/services";
import { useCommonStore } from "stores/useCommonStore.js";
import { storeToRefs } from "pinia";

const { me } = storeToRefs(useCommonStore());
const { setMe } = useCommonStore();
const initMe = async () => {
  await UserService.getMe().then((user) => {
    setMe(user);
  });
};

const emit = defineEmits(["load"]);
const init = async () => {
  if (!me.value) await initMe();

  await emit("load");
};
init();
</script>
