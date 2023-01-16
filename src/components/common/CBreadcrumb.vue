<template>
  <q-breadcrumbs class="c_breadcrumb" gutter="none">
    <template v-slot:separator>
      <q-icon />
    </template>
    <q-breadcrumbs-el label="Home" to="/guide" />
    <q-breadcrumbs-el label="Guide" to="/guide/breadcrumb" />
    <q-breadcrumbs-el label="Breadcrumbs" />
  </q-breadcrumbs>
</template>
<script setup>

</script>
