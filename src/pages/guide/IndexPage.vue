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
          <col style="width: 280px" />
          <col style="width: 300px" />
          <col style="width: 80px" />
          <col style="width: auto" />
        </colgroup>
        <thead>
          <tr>
            <th>메뉴명</th>
            <th>URL</th>
            <th>상태</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Popup</td>
            <td>
              <router-link to="popup" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>PopupPage - Console에 사용되는 전체 팝업 모음</td>
          </tr>
          <tr>
            <td>로그인</td>
            <td>
              <router-link to="login" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>
              IndexPage - 로그인 LoginLayout 생성 후 상단/좌측 메뉴 없는 구조
              생성
            </td>
          </tr>
          <tr>
            <td>회원탈퇴(TBD)</td>
            <td>
              <router-link to="common/withdrawal" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>
              WithdrawalPage - 회원탈퇴 SubLayout 생성 후 좌측 메뉴 없는 구조
              생성
            </td>
          </tr>
          <tr>
            <td>프로젝트 - Dashboard</td>
            <td>
              <router-link to="/" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>IndexPage</td>
          </tr>
          <tr>
            <td>프로젝트 - 인스턴스(탭)</td>
            <td>
              <router-link to="projects/instance" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>InstancePage</td>
          </tr>
          <tr>
            <td>프로젝트 - 인스턴스 상세(탭)</td>
            <td>
              <router-link to="projects/instanceview" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>InstanceViewPage</td>
          </tr>
          <tr>
            <td>프로젝트 - 인스턴스 생성(탭)</td>
            <td>
              <router-link to="projects/instancedetail" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>InstanceDetailPage</td>
          </tr>
          <tr>
            <td>프로젝트 - 태스크(탭)</td>
            <td>
              <router-link to="projects/task" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>TaskPage</td>
          </tr>
          <tr>
            <td>프로젝트 - 태스크 상세(탭)</td>
            <td>
              <router-link to="projects/taskview" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>TaskViewPage</td>
          </tr>
          <tr>
            <td>프로젝트 - 태스크 생성(탭)</td>
            <td>
              <router-link to="projects/taskdetail" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>TaskDetailPage</td>
          </tr>
          <tr>
            <td>프로젝트 - 태스크 그룹 상세정보(탭)</td>
            <td>
              <router-link to="projects/taskgroup" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>TaskGroupPage</td>
          </tr>
          <tr>
            <td>프로젝트 - 멤버관리(탭)</td>
            <td>
              <router-link to="projects" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>IndexPage</td>
          </tr>
          <tr>
            <td>스토리지</td>
            <td>
              <router-link to="storage" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>IndexPage</td>
          </tr>
          <tr>
            <td>내 이미지(탭)</td>
            <td>
              <router-link to="images" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>IndexPage</td>
          </tr>
          <tr>
            <td>기본 이미지(탭)</td>
            <td>
              <router-link to="images/basic" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>BasicPage</td>
          </tr>
          <tr>
            <td>공유받은 이미지(탭)</td>
            <td>
              <router-link to="images/shared" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>SharedPage</td>
          </tr>
          <tr>
            <td>멤버</td>
            <td>
              <router-link to="members" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>IndexPage</td>
          </tr>
          <tr>
            <td>멤버 상세</td>
            <td>
              <router-link to="members/memberdetail" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>MemberDetailPage</td>
          </tr>
          <tr>
            <td>요금 메인</td>
            <td>
              <router-link to="billing" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>IndexPage</td>
          </tr>
          <tr>
            <td>요금 - 멤버(탭)</td>
            <td>
              <router-link to="billing/member" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>MemberPage</td>
          </tr>
          <tr>
            <td>요금 - 프로젝트(탭)</td>
            <td>
              <router-link to="billing/project" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>ProjectPage</td>
          </tr>
          <tr>
            <td>요금 - 인스턴스 타입(탭)</td>
            <td>
              <router-link to="billing/instance" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>InstancePage</td>
          </tr>
          <tr>
            <td>요금 - 스토리지(탭)</td>
            <td>
              <router-link to="billing/storage" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>StoragePage</td>
          </tr>
          <tr>
            <td>고객지원(TBD)</td>
            <td>
              <router-link to="support" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>IndexPage</td>
          </tr>
          <tr>
            <td>고객지원(TBD) - 1:1 문의</td>
            <td>
              <router-link to="support/write" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>WritePage</td>
          </tr>
          <tr>
            <td>고객지원(TBD) - 문의하기 - 스토리지 할당량 변경</td>
            <td>
              <router-link to="support/writeb" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>WritebPage</td>
          </tr>
          <tr>
            <td>고객지원(TBD) - 문의하기 - 리소스 할당량 변경</td>
            <td>
              <router-link to="support/writec" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>WritecPage</td>
          </tr>
          <tr>
            <td>고객지원(TBD) - 문의하기 - 오류/버그 제보</td>
            <td>
              <router-link to="support/writed" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>WritedPage</td>
          </tr>
          <tr>
            <td>고객지원(TBD) - 문의하기 - 기타문의</td>
            <td>
              <router-link to="support/writee" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>WriteedPage</td>
          </tr>
          <tr>
            <td>고객지원(TBD) - 1:1문의 -스토리지 할당량 변경 문의내용 확인</td>
            <td>
              <router-link to="support/questiondetail" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>QuestionDetailPage</td>
          </tr>
          <tr>
            <td>고객지원(TBD) - 1:1문의 -리소스 할당량 변경 문의내용 확인</td>
            <td>
              <router-link to="support/questiondetailb" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>QuestionDetailbPage</td>
          </tr>
          <tr>
            <td>고객지원(TBD) - 1:1문의 -오류/버그제보 내용 확인</td>
            <td>
              <router-link to="support/questiondetailc" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>QuestionDetailcPage</td>
          </tr>
          <tr>
            <td>고객지원(TBD) - 1:1문의 -기타문의 내용 확인</td>
            <td>
              <router-link to="support/questiondetaild" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>QuestionDetaildPage</td>
          </tr>
          <tr>
            <td>내정보(탭)</td>
            <td>
              <router-link to="my" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>IndexPage</td>
          </tr>
          <tr>
            <td>내알림(탭)</td>
            <td>
              <router-link to="my/alarm" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>AlarmPage</td>
          </tr>
          <tr>
            <td>sshkey & apikey(탭)</td>
            <td>
              <router-link to="key" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>KeyPage</td>
          </tr>
          <tr>
            <td>관리 - 프로젝트</td>
            <td>
              <router-link to="manage/project" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>ProjectPage</td>
          </tr>
          <tr>
            <td>관리 - 인스턴스(탭)</td>
            <td>
              <router-link to="manage/instance" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>InstancePage</td>
          </tr>
          <tr>
            <td>관리 - 태스크(탭)</td>
            <td>
              <router-link to="manage/task" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>TaskPage</td>
          </tr>
          <tr>
            <td>관리 - 스토리지(탭)</td>
            <td>
              <router-link to="manage/storage" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>StoragePage</td>
          </tr>
          <tr>
            <td>관리 - 멤버(탭)</td>
            <td>
              <router-link to="manage/member" target="_blank" />
            </td>
            <td>
              <q-badge class="c_badge green">
                <span class="txt">완료</span>
              </q-badge>
            </td>
            <td>MemberPage</td>
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
<script setup></script>

<style lang="scss" scoped>
.section {
  h2 {
    margin-bottom: 10px;
  }
  ~ .section {
    margin-top: 50px;
  }
}
th {
  height: 40px !important;
  text-align: left;
}
tr {
  height: 40px !important;
  th:first-child,
  td:first-child {
    padding: 0 30px;
    text-align: left !important;
  }
  th:last-child,
  td:last-child {
    padding: 0 30px;
  }
}
a {
  width: 100%;
  color: $primary;
  &:before {
    content: attr(href);
    display: inline-block;
    text-decoration: underline;
  }
}
</style>
