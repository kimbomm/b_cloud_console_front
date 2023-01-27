<template>
  <q-page class="p-content p-projects p-detail">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el label="Test Project" to="/" />
        <q-breadcrumbs-el label="태스크" to="/" />
        <q-breadcrumbs-el label="00태스크 1-1" />
      </q-breadcrumbs>
      <div class="p-detail-head">
        <h1 class="p-title">
          {{ ptitle }}
        </h1>
        <div class="monitoring_btn">
          <CButton
            :size-types="2"
            :btn-types="1"
            :btn-names="btnName"
          />
        </div>
      </div>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="wrap p-taskView">
        <div class="user_info">
          <div class="user_box com_border_box">
            <p class="sub_title">기본정보</p>
            <ul class="user_box_main">
              <li class="u_d01">
                <p class="user_data_title">태스크 그룹 ID</p>
                <div class="user_data_value">
                  <p>01ws-00prj-inst-00001</p>
                </div>
              </li>
              <li class="u_d02 making_user_data">
                <p class="user_data_title">생성자</p>
                <div class="user_data_value">
                  <p class="user_name">김카브</p>
                  <p class="user_mail">root.choi@kakaobrain.com</p>
                </div>
              </li>
              <li class="u_d03">
                <p class="user_data_title">태스크 ID</p>
                <div class="user_data_value">
                  <p>01ws-00prj-task-12312</p>
                </div>
              </li>
              <li class="u_d04">
                <p class="user_data_title">시작일시</p>
                <div class="user_data_value">
                  <p>2023.10.11 12:33:44</p>
                </div>
              </li>
              <li class="u_d05">
                <p class="user_data_title">태스크 그룹 이름</p>
                <div class="user_data_value">
                  <p>taskgroup1</p>
                </div>
              </li>
              <li class="u_d06">
                <p class="user_data_title">완료일시</p>
                <div class="user_data_value">
                  <p>2023.11.12 13:49pm</p>
                </div>
              </li>
              <li class="u_d07">
                <p class="user_data_title">테스크 이름</p>
                <div class="user_data_value">
                  <p>task1</p>
                </div>
              </li>
              <li class="u_d08 status_data">
                <p class="user_data_title">현재상태</p>
                <div class="user_data_value">
                  <span class="operating">운영중</span>
                </div>
              </li>
              <li class="u_d09">
                <p class="user_data_title">호스트</p>
                <div class="user_data_value">
                  <p>gpu-cloud-vnode224.dakao.io</p>
                </div>
              </li>
              <li class="u_d10 tpye_data">
                <p class="user_data_title">SSH / JupyterLab</p>
                <div class="user_data_value">
                  <p class="ssh_btn">ssh</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="task_command">
          <div class="t_command_box com_box">
            <p class="sub_title">태스크 명령어</p>
            <ul class="command_list">
              <li><p class="com_txt">~~~celebAHQwobg_EG3D_fromfs_FrzGBbMapSyn16.yaml</p></li>
            </ul>
          </div>
        </div>

        <div class="instance_type">
          <div class="type_box com_box">
            <p class="sub_title">인스턴스 타입</p>
            <span class="text">V1.XLARGE (1GPU | 14CPU | MEM 122GiB | DISK 80GiB)</span>

            <ul class="type_list">
              <li class="t_list01">
                <p class="type_list_title">GPU 모델</p>
                <p class="type_list_vlaue">TESLA_V100</p>
              </li>
              <li class="t_list02">
                <p class="type_list_title">GPU</p>
                <p class="type_list_vlaue">2</p>
              </li>
              <li class="t_list03">
                <p class="type_list_title">CPU</p>
                <p class="type_list_vlaue">14</p>
              </li>
              <li class="t_list04">
                <p class="type_list_title">Memory</p>
                <p class="type_list_vlaue">122 GB</p>
              </li>
              <li class="t_list05">
                <p class="type_list_title">Disk <span>기본용량</span></p>
                <p class="type_list_vlaue">80 GiB</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="instance_date">
          <div class="ins_data_inner">
            <div class="ins_img com_box">
              <p class="sub_title">이미지</p>
              <ul class="ins_img_cont">
                <li class="img_list01">
                  <p>내이미지</p>
                  <span>테스트용 내 이미지 생성</span>
                </li>
              </ul>
            </div>
            <div class="ins_storage com_box">
              <p class="sub_title">스토리지</p>
              <ul class="ins_storage_cont">
                <li class="storage_list01">
                  <p class="s_title">MLTEST 프로젝트 스토리지</p>
                  <p class="s_type">읽기전용</p>
                </li>
                <li class="storage_list02">
                  <p class="s_title">MLTEST 프로젝트 스토리지</p>
                  <p class="s_type">읽기전용</p>
                </li>
                <li class="storage_list03">
                  <p class="s_title">MLTEST 프로젝트 스토리지</p>
                  <p class="s_type">읽기전용</p>
                </li>
                <li class="storage_list04">
                  <p class="s_title">MLTEST 프로젝트 스토리지</p>
                  <p class="s_type">읽기전용</p>
                </li>
                <li class="storage_list05">
                  <p class="s_title">MLTEST 프로젝트 스토리지</p>
                  <p class="s_type">읽기전용</p>
                </li>
              </ul>
            </div>
            <div class="ins_port com_box">
              <p class="sub_title">포트정보</p>
              <div class="port_list">
                <div class="p_title">
                  <p class="internal_title">Internal URL</p>
                  <p class="external_title">External URL</p>
                </div>
                <q-scroll-area style="height:180px;">
                <ul class="port_box">
                  <li>
                    <p class="p_input_data">task1:33221</p>
                    <p class="p_external_data">http://gpu-cloud-vnode95.dakao.io:10472</p>
                  </li>
                  <li>
                    <p class="p_input_data">task1:33221</p>
                    <p class="p_external_data">http://gpu-cloud-vnode95.dakao.io:10472</p>
                  </li>
                  <li>
                    <p class="p_input_data">task1:33221</p>
                    <p class="p_external_data">http://gpu-cloud-vnode95.dakao.io:10472</p>
                  </li>
                  <li>
                    <p class="p_input_data">task1:33221</p>
                    <p class="p_external_data">http://gpu-cloud-vnode95.dakao.io:10472</p>
                  </li>
                  <li>
                    <p class="p_input_data">task1:33221</p>
                    <p class="p_external_data">http://gpu-cloud-vnode95.dakao.io:10472</p>
                  </li>
                </ul>
                </q-scroll-area>
              </div>
            </div>
            <div class="ins_etc com_box">
              <p class="sub_title">기타 정보</p>
              <table class="etc_cont">
                <tr>
                  <th>호스트 전체 준비 완료시 실행</th>
                  <td>ON</td>
                </tr>
                <tr>
                  <th>태스크 동시실행 최대 개수</th>
                  <td>3</td>
                </tr>
                <tr>
                  <th>http proxy 설정</th>
                  <td>ON</td>
                </tr>
                <tr>
                  <th>재시도 횟수</th>
                  <td>0</td>
                </tr>
                <tr>
                  <th>추가 포트 번호</th>
                  <td>23335 ~ 23337</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "components/common/CButton.vue";

const title = ref("태스크 상세정보");
const btnName = ref("모니터링");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
</style>
