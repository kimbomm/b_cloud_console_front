<template>
  <div>
    <h6>Axios TEST</h6>
    <button @click="onClick">getMe</button>
  </div>
</template>
<script setup>
import { UserService } from "src/services";

const onClick = async () => {
  try {
    await UserService.getMe();
  } catch (e) {
    console.log(e.response);
  }
};
</script>
