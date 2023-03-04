<script setup>
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
if (!me.value) initMe();
</script>
