<template>
  <div class="p-content p-guide p-pagination">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- 페이징 추가 -->
    <div>
      <div v-for="item in visibleItems" :key="item.id">{{ item }}</div>
      <div>
        <button v-for="size in pageSizes" :key="size" @click="() => pageSizeClick(size)">
          {{ size }}개씩 보기
        </button>
      </div>
      <button @click="() => prevPage()">이전</button>
      <button
        v-for="page in pageButtons"
        :key="page"
        @click="() => pageButtonsClick(page)"
      >
        {{ page }}
      </button>

      <button @click="() => nextPage()">다음</button>
    </div>
    <!-- 페이징 추가 -->

    <div class="p-body">
      <section class="section">
        <h2 class="h6">Default - class="c_pagination"</h2>
        <div class="group">
          <CPagination />
        </div>
      </section>
      <section class="section">
        <h2 class="h6">Default - 페이지가 5개 이상일 경우 class="c_pagination"</h2>
        <div class="group">
          <q-pagination
            v-model="type2"
            :max="10"
            :max-pages="6"
            direction-links
            boundary-numbers
            flat
            color="grey"
            active-color="primary"
            icon-prev="prev"
            icon-next="next"
            class="c_pagination"
          />
        </div>
      </section>
      <section class="section">
        <h2 class="h6">
          Default - 페이지가 5개 이상일 경우 - 5 클릭했을때 class="c_pagination"
        </h2>
        <div class="group">
          <q-pagination
            v-model="type3"
            :max="10"
            :max-pages="6"
            direction-links
            boundary-numbers
            flat
            color="grey"
            active-color="primary"
            icon-prev="prev"
            icon-next="next"
            class="c_pagination"
          />
        </div>
      </section>
    </div>

  </div>
</template>
<script setup>
import {
  ref, reactive, computed, watch
} from "vue";
import { useMeta } from "quasar";
import CPagination from "components/common/CPagination.vue";

import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const PAGE_SIZE = 10; // 한 페이지당 보여줄 아이템 수

const state = reactive({
  items: [
    {
      base_image_name: "1111111",
      created_at: "2021-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },
    {
      base_image_name: "222222",
      created_at: "2023-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },
    {
      base_image_name: "33333",
      created_at: "2023-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },
    {
      base_image_name: "44444",
      created_at: "2023-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },

    {
      base_image_name: "555555",
      created_at: "2021-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },
    {
      base_image_name: "66666",
      created_at: "2023-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },
    {
      base_image_name: "777777",
      created_at: "2023-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },
    {
      base_image_name: "88888",
      created_at: "2023-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },
    {
      base_image_name: "1111111",
      created_at: "2021-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },
    {
      base_image_name: "222222",
      created_at: "2023-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },
    {
      base_image_name: "33333",
      created_at: "2023-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },
    {
      base_image_name: "44444",
      created_at: "2023-02-07T23:16:40Z",
      description: "common image",
      id: 3,
      name: "common_image",
      status: "saved",
      tag: "b3ba43af",
    },
  ],
  page: 1, // 현재 페이지 번호
  pageSize: PAGE_SIZE, // 페이지당 아이템 수
});
const pageSizes = [5, 10, 20, 50]; // 페이지당 아이템 수 선택지

const visibleItems = computed(() => {
  const start = (state.page - 1) * state.pageSize;
  const end = start + state.pageSize;
  return state.items.slice(start, end);
});

// 현재 페이지
const currentPage = computed(() => {
  const maxPage = Math.ceil(state.items.length / state.pageSize);
  return Math.min(maxPage, Math.max(1, state.page));
});

const pageButtons = computed(() => {
  const maxPage = Math.ceil(state.items.length / state.pageSize);
  const middlePage = Math.floor((state.pageSize - 1) / 2) + 1;
  let startPage = Math.max(1, currentPage.value - middlePage + 1);
  const endPage = Math.min(maxPage, startPage + state.pageSize - 1);
  if (endPage - startPage + 1 < state.pageSize) {
    startPage = Math.max(1, endPage - state.pageSize + 1);
  }
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

/**
 * 페이지 router 업데이트
 * @param { Number } page 현재 페이지
 * @param { Number } pageSize n개씩 보기
 */
const updateUrl = (page, pageSize) => {
  console.log("page pageSize", page, pageSize);
  router.push({ path: route.path, query: { page, pageSize } });
};

const prevPage = () => {
  state.page = Math.max(1, state.page - 1);
  updateUrl(state.page, state.pageSize);
};
const nextPage = () => {
  const maxPage = Math.ceil(state.items.length / state.pageSize);
  state.page = Math.min(maxPage, state.page + 1);
  updateUrl(state.page, state.pageSize);
};

const pageButtonsClick = (value) => {
  state.page = value;
  updateUrl(state.page, state.pageSize);
};

const pageSizeClick = (value) => {
  state.pageSize = value;
  updateUrl(state.page, state.pageSize);
};

const currentQuery = computed(() => router.currentRoute.value.query);

console.log("router", router);
watch(currentQuery, (query) => {
  console.log("query", query);
  if (query.page) {
    state.page = Number(query.page);
  }
  if (query.pageSize) {
    state.pageSize = Number(query.pageSize);
  }
});

// ---------

const title = ref("Pagination");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const type2 = ref(1);
const type3 = ref(5);
</script>

<style lang="scss" scoped>
.section {
  h2 {
    margin-bottom: 10px;
  }
  ~ .section {
    margin-top: 50px;
  }
}
</style>
