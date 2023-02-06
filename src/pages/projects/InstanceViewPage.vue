<template>
  <q-page class="p-content p-projects p-detail">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el
          label="Projects"
          to="/"
        />
        <q-breadcrumbs-el
          label="Test Project"
          to="/"
        />
        <q-breadcrumbs-el
          label="인스턴스"
          to="/"
        />
        <q-breadcrumbs-el label="aa인스턴스1" />
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
      <div class="warp p-instanceview">
        <div class="user_info">
          <div class="user_box com_border_box">
            <div class="user_box_head">
              <template v-if="datacheck === true">
                <div class="basis_view">
                  <p class="sub_title">aa인스턴스
                    <i class="ico modify" @click="datacheck = false" />
                  </p>
                  <span class="text">인스턴스 설명인스턴스 설명인스턴스 설명인스턴스 설명인스턴스 설명인스턴스 설명</span>
                </div>
              </template>
              <template v-else>
                <div class="modify_view">
                  <div class="ins_subtitle_input">
                    <p class="m_sub_title">인스턴스 이름</p>
                    <q-input
                      outlined
                      v-model="textName"
                      placeholder="최소 2자 최대 30자 입력"
                      clearable
                      class="wsize_full"
                    />
                  </div>
                  <div class="ins_text_input">
                    <p class="m_text">인스턴스 설명</p>
                    <q-input
                      outlined
                      v-model="textChangeDesc"
                      bottom-slots
                      type="textarea"
                      placeholder="변경 인스턴스 텍스트"
                      clearable
                      counter
                      :count="10"
                      maxlength="100"
                      class="wsize_full hsize136"
                      :input-style="{height: '100%'}"
                    />
                  </div>
                  <div class="modify_btn">
                    <q-btn
                      label="취소"
                      class="line"
                      @click="datacheck = true"
                    />
                    <q-btn
                      label="저장"
                      class="primary"
                      @click="datacheck = true"
                    />
                  </div>
                </div>
              </template>
            </div>

            <ul class="user_box_main">
              <li class="u_d01">
                <p class="user_data_title">인스턴스ID</p>
                <div class="user_data_value">
                  <p>01ws-00prj-inst-00001</p>
                </div>
              </li>
              <li class="u_d02">
                <p class="user_data_title">시작일시</p>
                <div class="user_data_value">
                  <p>2023.11.12 13:49pm</p>
                </div>
              </li>
              <li class="u_d03 making_user_data">
                <p class="user_data_title">생성자</p>
                <div class="user_data_value">
                  <p class="user_name">김카브</p>
                  <p class="user_mail">root.choi@kakaobrain.com</p>
                </div>
              </li>
              <li class="u_d04">
                <p class="user_data_title">생성일시</p>
                <div class="user_data_value">
                  <p>2023.10.11 13:49pm</p>
                </div>
              </li>
              <li class="u_d05">
                <p class="user_data_title">호스트</p>
                <div class="user_data_value">
                  <p>gpu-cloud-vnode224.dakao.io</p>
                </div>
              </li>
              <li class="u_d06 status_data">
                <p class="user_data_title">현재상태</p>
                <div class="user_data_value">
                  <span class="operating">운영중</span>
                </div>
              </li>
              <li class="u_d07 tpye_data">
                <p class="user_data_title">SSH / JupyterLab</p>
                <div class="user_data_value">
                  <p class="ssh_btn">ssh</p>
                  <p class="JupyterLab_btn">JupyterLab</p>
                </div>
              </li>
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
                  <p class="input_num_title">입력 포트 번호</p>
                  <p class="external_num_title">외부 포트 번호</p>
                </div>
                <q-scroll-area style="height:180px;">
                  <ul class="port_box">
                    <li>
                      <p class="p_input_data">23335</p>
                      <p class="p_external_data">23335</p>
                    </li>
                    <li>
                      <p class="p_input_data">23335</p>
                      <p class="p_external_data">23335</p>
                    </li>
                    <li>
                      <p class="p_input_data">23335</p>
                      <p class="p_external_data">23335</p>
                    </li>
                    <li>
                      <p class="p_input_data">23335</p>
                      <p class="p_external_data">23335</p>
                    </li>
                    <li>
                      <p class="p_input_data">23335</p>
                      <p class="p_external_data">23335</p>
                    </li>
                  </ul>
                </q-scroll-area>
              </div>
            </div>
            <div class="ins_etc com_box">
              <p class="sub_title">기타 정보</p>
              <table class="etc_cont">
                <tr>
                  <th>http proxy 설정</th>
                  <td>ON</td>
                </tr>
                <tr>
                  <th>ssh endpoint 주소</th>
                  <td>instance.cloud.kakaobrain.com:17783`</td>
                </tr>
                <tr>
                  <th>ssh 포트번호</th>
                  <td>23334</td>
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

const title = ref("인스턴스 상세정보");
const btnName = ref("모니터링");
const textName = ref(null);
const textChangeDesc = ref("변경 인스턴스 텍스트");
const datacheck = ref(true);
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
</style>
