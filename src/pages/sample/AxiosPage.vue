<template>
  <div>
    <h6>
      Axios TEST
    </h6>
    <button @click="onClick">sampleAuth</button>
  </div>
</template>
<script setup>
import { AuthService } from "src/services";

const onClick = async () => {
  try {
    await AuthService.sampleAuth();
  } catch (e) {
    console.log(e.response);
  }
};
</script>
