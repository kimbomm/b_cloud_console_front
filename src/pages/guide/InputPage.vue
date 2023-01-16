<template>
  <div class="p-content p-guide p-input">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">Input - type="text"</h2>
        <div class="group">
          <div class="c_inpgroup">
            <!-- Base Text -->
            <CInput />

            <!-- Base Text Disabled -->
            <CInput disable />

            <!-- Base Text Error -->
            <q-input
              outlined
              v-model="texterror"
              bottom-slots
              :error="!isValid"
              hint="Description"
              placeholder="Placeholder Text"
              class="c_inp"
            >
              <template v-slot:error>
                Error!
              </template>
            </q-input>

            <!-- Base Text Success -->
            <q-input
              outlined
              v-model="comfirm"
              placeholder="Placeholder Text"
              hint="Comfirmed!"
              clearable
              class="c_inp q-field--positive"
            >
              <template v-slot:hint>
                Comfirmed!
              </template>
            </q-input>
          </div>
        </div>

        <h2 class="h6">Input - type="password"</h2>
        <div class="group">
          <div class="c_inpgroup">
            <!-- Password -->
            <q-input
              outlined
              v-model="password"
              placeholder="비밀번호 입력"
              hint="Description"
              clearable
              class="c_inp c_password"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  :class="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <!-- Password Disabled -->
            <q-input
              outlined
              v-model="password"
              placeholder="1q2w3e4r%T"
              hint="Description"
              clearable
              disable
              class="c_inp c_password"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  :class="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <!-- Password Error -->
            <q-input
              outlined
              v-model="passworderror"
              bottom-slots
              hint="Description"
              placeholder="비밀번호 입력"
              class="c_inp c_password"
              :error="!isPwdValid"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  :class="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              <template v-slot:error>
                Error!
              </template>
            </q-input>

            <!-- Password Success -->
            <q-input
              outlined
              v-model="password"
              placeholder="비밀번호 입력"
              hint="Comfirmed!"
              clearable
              class="c_inp c_password q-field--positive"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  :class="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
        </div>

        <h2 class="h6">Input - type="Suffix"</h2>
        <div class="group">
          <div class="c_inpgroup">
            <q-input
              outlined
              v-model="suffix"
              placeholder="Placeholder Text"
              hint="Description"
              prefix="Prefix"
              suffix="Suffix"
              clearable
              class="wsize_full"
            >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </section>
      <section class="section">
        <h2 class="h6">Input - type="Suffix"</h2>
        <div class="group">
          <div class="c_inpgroup">
            <q-input
              outlined
              v-model="suffix"
              placeholder="Placeholder Text"
              hint="Description"
              prefix="Prefix"
              suffix="Suffix"
              clearable
              class="wsize_full"
            >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useMeta } from "quasar";
import CInput from "components/common/CInput.vue";

export default {
  name: "InputPage",
  components: {
    CInput,
  },
  props: {
    sizeTypes: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const title = ref("Input");
    const texterror = ref("Texterror");
    const passworderror = ref("1q2w3e4r%T");
    useMeta(() => ({
      title: title.value,
    }));
    return {
      ptitle: ref(title),
      text: ref(""),
      suffix: ref(""),
      comfirm: ref("Text"),
      password: ref(""),
      isPwd: ref(true),
      texterror,
      passworderror,
      isValid: computed(() => texterror.value.length <= 8),
      isPwdValid: computed(() => passworderror.value.length <= 8),
      input: {
        name: null,
        dob: null,
      },
    };
  },
};
</script>
<script setup>
</script>

<style lang="scss" scoped>
.section{
  &:not(:first-child){
    margin-top:50px;
  }
  h2{
    margin-bottom:10px;
  }
  .h6{
    &:not(:first-child){
      margin-top:50px;
    }
  }
}
.group{
  margin-top:20px;
}
.c_inp{
  &:not(:last-child){
    margin-right:20px;
  }
}
</style>
