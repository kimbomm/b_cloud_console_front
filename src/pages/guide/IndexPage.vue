<template>
  <div class="p-content p-guide p-index">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
      <p class="desc">공통 페이지 : pages/</p>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <table class="q-table">
        <colgroup>
          <col style="width:300px">
          <col style="width:300px">
          <col style="width:auto">
        </colgroup>
        <thead>
          <tr>
            <th>메뉴명</th>
            <th>URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Popup</td>
            <td><router-link to="popup" target="_blank" /></td>
            <td>PopupPage - Console에 사용되는 전체 팝업 모음</td>
          </tr>
          <tr>
            <td>로그인</td>
            <td><router-link to="common/login" target="_blank" /></td>
            <td>LoginPage - SubLayout 생성 후 좌측 메뉴 없는 구조 생성</td>
          </tr>
          <tr>
            <td>Dashboard</td>
            <td><router-link to="/" target="_blank" /></td>
            <td>IndexPage</td>
          </tr>
          <tr>
            <td>프로젝트</td>
            <td><router-link to="projects" target="_blank" /></td>
            <td>IndexPage</td>
          </tr>
          <tr>
            <td>프로젝트-인스턴스</td>
            <td><router-link to="projects/instance" target="_blank" /></td>
            <td>InstancePage</td>
          </tr>
          <tr>
            <td>프로젝트-인스턴스 생성</td>
            <td><router-link to="projects/instanceview" target="_blank" /></td>
            <td>InstanceViewPage</td>
          </tr>
          <tr>
            <td>프로젝트-인스턴스 상세</td>
            <td><router-link to="projects/instancedetail" target="_blank" /></td>
            <td>InstanceDetailPage</td>
          </tr>
          <tr>
            <td>프로젝트-태스크</td>
            <td><router-link to="projects/task" target="_blank" /></td>
            <td>TaskPage</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("Console Page UI 구조");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
</script>
<script setup>
</script>

<style lang="scss" scoped>
.section{
  h2{
    margin-bottom:10px;
  }
  ~ .section{
    margin-top:50px;
  }
}
th{
  height:40px!important;
  text-align:left;
}
tr{
  height:40px!important;
  th:first-child,
  td:first-child{
    padding:0 30px;
    text-align:left!important;
  }
  th:last-child,
  td:last-child{
    padding:0 30px;
  }
}
a{
  width:100%;
  color:$primary;
  &:before{
    content:attr(href);
    display:inline-block;
    text-decoration: underline;
  }
}
</style>
