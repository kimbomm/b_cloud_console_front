<template>
  <div class="p-content p-guide p-index">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">공통 컴포넌트</h2>
        <ul class="list">
          <li>- Color - 완료(작업 시 필요에 따라 추가)</li>
          <li>- Typo - 완료(작업 시 필요에 따라 추가)</li>
          <li>- Icon - 완료(작업 시 필요에 따라 추가)</li>
          <li>
            - Button - 완료(수정 중)  (Quasar UI : [https://quasar.dev/vue](https://quasar.dev/vue-components/button)<br />
            다른 컴포넌트에서 사용되는 버튼과 style이 상속되는 부분들이 발생하여 버튼 부분은 계속 수정 및 추가
          </li>
          <li>- Input - 진행 중  (Quasar UI : [https://quasar.dev/vue-components/input](https://quasar.dev/vue-components/input))</li>
          <li>- Checkbox - 진행 중  (Quasar UI : [https://quasar.dev/vue-components/checkbox](https://quasar.dev/vue-components/checkbox))</li>
          <li>- Radio - 진행 중  (Quasar UI : [https://quasar.dev/vue-components/radio](https://quasar.dev/vue-components/radio))</li>
          <li>- Pagination - 완료  (Quasar UI : [https://quasar.dev/vue-components/pagination](https://quasar.dev/vue-components/pagination))</li>
          <li>- SegmentedControl - 완료  (Quasar UI : [https://quasar.dev/vue-components/button-toggle](https://quasar.dev/vue-components/button-toggle))</li>
          <li>- **Table** - 예정(front에서 선 진행 후 UI 수정)  (Quasar UI : [https://quasar.dev/vue-components/table](https://quasar.dev/vue-components/table))</li>
          <li>- **DropDown** - (front 선 진행 완료) 진행 중  (Quasar UI : [https://quasar.dev/vue-components/select](https://quasar.dev/vue-components/select))</li>
          <li>- Tabs - 완료  (Quasar UI : [https://quasar.dev/vue-components/tabs](https://quasar.dev/vue-components/tabs))</li>
          <li>- Breadcrumb - 완료  (Quasar UI : [https://quasar.dev/vue-components/breadcrumbs](https://quasar.dev/vue-components/breadcrumbs))</li>
          <li>- Popover - 완료  (Quasar UI : [https://quasar.dev/vue-components/popup-edit](https://quasar.dev/vue-components/button))</li>
          <li>- Popup - 예정  (Quasar UI : [https://quasar.dev/vue-components/dialog](https://quasar.dev/vue-components/dialog))</li>
          <li>- Toast - 완료  (Pure)</li>
          <li>- Form - 진행 중  (Quasar UI : [https://quasar.dev/vue-components/form](https://quasar.dev/vue-components/form))</li>
          <li>- Tooltip - 완료(추가)  (Quasar UI : [https://quasar.dev/vue-components/tooltip](https://quasar.dev/vue-components/tooltip))</li>
          <li>- Notify - 예정(추가)  (Quasar UI : [https://quasar.dev/quasar-plugins/notify](https://quasar.dev/quasar-plugins/notify))</li>
          <li>- DatePicker - 예정(추가) (Quasr UI : [https://quasar.dev/vue-components/date](https://quasar.dev/vue-components/date))</li>
          <li>- Badge -  예정(추가) (Quasr UI : [https://quasar.dev/vue-components/badge](https://quasar.dev/vue-components/badge))</li>
          <li>- Carousel -  예정(추가) (Quasr UI : [https://quasar.dev/vue-components/carousel](https://quasar.dev/vue-components/carousel))</li>
          <li>- CircularProgress -  예정(추가) (Quasr UI : [https://quasar.dev/vue-components/circular-progress](https://quasar.dev/vue-components/circular-progress))</li>
          <li>- Toggle-  예정 (Quasr UI : [https://quasar.dev/vue-components/toggle](https://quasar.dev/vue-components/toggle))</li>
          <li>- Knob -  예정(추가) (Quasr UI : [https://quasar.dev/vue-components/knob](https://quasar.dev/vue-components/knob))</li>
          <li>- Progress -  예정(추가) (Quasr UI : [https://quasar.dev/vue-components/linear-progress#example--indeterminate-state](https://quasar.dev/vue-components/linear-progress#example--indeterminate-state))</li>
          <li>- Menu -  예정(추가) (Quasr UI : [https://quasar.dev/vue-components/menu](https://quasar.dev/vue-components/menu))</li>
          <li>- Spinners(Loading) -  예정(추가) (Quasr UI : [https://quasar.dev/vue-components/spinners](https://quasar.dev/vue-components/spinners), [https://quasar.dev/vue-components/inner-loading](https://quasar.dev/vue-components/inner-loading), [https://quasar.dev/vue-components/inner-loading](https://quasar.dev/vue-components/inner-loading))</li>
          <li>- Banner -  예정(추가) (Quasr UI : [https://quasar.dev/vue-components/banner](https://quasar.dev/vue-components/banner))</li>
          <li>- **FilePicker Upload** -  (front에서 선 진행 후 UI 수정) 예정(추가) (Quasr UI : [https://quasar.dev/vue-components/file-picker](https://quasar.dev/vue-components/file-picker), [https://quasar.dev/vue-components/uploader](https://quasar.dev/vue-components/uploader))</li>
          <li>- Expansion(Collapse UI) -  예정(추가) (Quasr UI : [https://quasar.dev/vue-components/expansion-item](https://quasar.dev/vue-components/expansion-item))</li>
          <li>- Card -  예정(추가) (Quasr UI : [https://quasar.dev/vue-components/card](https://quasar.dev/vue-components/card))</li>
          <li>- Tree -  예정(추가) (Quasr UI : [https://quasar.dev/vue-components/tree))</li>
          <li>- 공통 레이아웃 - 예정</li>
          <li>- Sidebar - 예정</li>
          <li>- Console 페이지 작업 시 필요한 부분 추가 예정</li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMeta } from "quasar";

export default {
  name: "IndexPage",
  components: {

  },
  setup() {
    const title = ref("Guide");
    useMeta(() => ({
      title: title.value,
    }));
    return {
      ptitle: ref(title),
    };
  },
};
</script>
<script setup>
</script>

<style lang="scss" scoped>
.section{
  display:none;
  h2{
    margin-bottom:10px;
  }
  ~ .section{
    margin-top:50px;
  }
}
.list{
  >li{
    &:not(:first-child){
      margin-top:10px;
    }
  }
}
</style>
