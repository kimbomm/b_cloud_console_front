<template>
  <q-page class="p-content p-popup p-index">
    <div class="p-head">
      <h1 class="p-title">
        {{ ptitle }}
      </h1>
      <p class="desc">
        <span class="txt">Console 페이지에서 사용되는 전체 팝업</span>
      </p>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="psection">
        <h2 class="sub_title">공통 팝업</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertErrorModal = true"
          >
            <span class="txt">[Alert]공통 오류 팝업</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">소속된 워크스페이스가 없는 사용자</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertWorkspaceModal = true"
          >
            <span class="txt">[Alert]소속된 워크스페이스가 없는 사용자</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">프로젝트</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="projectCreateModal = true"
          >
            <span class="txt">SNB - 프로젝트 생성</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="projectChangeModal = true"
          >
            <span class="txt">프로젝트 - 프로젝트 이름/설명 변경</span>
          </q-btn>
          <q-btn
            class="c_btn"
            @click="quotaChangeModal = true"
          >
            <span class="txt">할당량 변경 요청 팝업 (TBD)</span>
          </q-btn>
        </div>
      </section>
      <section class="psection">
        <h2 class="sub_title">프로젝트 - 대시보드</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertProjectInstanceTaskInfoModal = true"
          >
            <span class="txt">[Alert]프로젝트내 이용중인 인스턴스/태스크가 있는 경우 안내 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertInstanceDelPossibleModal = true"
          >
            <span class="txt">[Alert]삭제 가능한경우, 삭제 확인 팝업</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">프로젝트 - 인스턴스</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertInstanceOverAddModal = true"
          >
            <span class="txt">[Alert]인스턴스 추가된 용량 (10GB 초과시 저장 되지 않음 안내 팝업)</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertInstanceDeleteModal = true"
          >
            <span class="txt">[Alert]인스턴스 삭제 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertInstanceResourceModal = true"
          >
            <span class="txt">[Alert]리소스 부족으로 인한 재시작 불가 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertInstanceOverImageModal = true"
          >
            <span class="txt">[Alert]인스턴스 용량 초과로 인한 이미지 생성 불가</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertProjectQuotaModal = true"
          >
            <span class="txt">[Alert]프로젝트 할당량이 부족한 경우</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertWorkspaceQuotaModal = true"
          >
            <span class="txt">[Alert]워크스페이스 할당량이 부족한 경우</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="projectInstanceImgCreateModal = true"
          >
            <span class="txt">프로젝트 - 인스턴스 - 이미지 생성</span>
          </q-btn>
          <!-- <q-btn
            class="c_btn"
            @click="workspaceHistoryAModal = true"
          >
            <span class="txt">A 워크스페이스 리소스 사용 이력(꺽은선 그래프 + 달력 + 시계)(TBD)</span>
          </q-btn>
          <q-btn
            class="c_btn"
            @click="workspaceHistoryBModal = true"
          >
            <span class="txt">B 워크스페이스 리소스 사용 이력(꺽은선 그래프 + 달력 + 시계)(TBD)</span>
          </q-btn> -->
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">프로젝트 - 태스크</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertTaskGroupDeleteModal = true"
          >
            <span class="txt">[Alert]태스크 그룹 삭제 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertTaskDeleteModal = true"
          >
            <span class="txt">[Alert]태스크 삭제 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="taskLogModal = true"
          >
            <span class="txt">태스크 - 로그 stdout(+ Full Size)</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">프로젝트 - 멤버관리</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertMemberAuthNotModal = true"
          >
            <span class="txt">[Alert]권한 변경 불가 안내 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertMemberDelNotModal = true"
          >
            <span class="txt">[Alert]삭제 불가 안내 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="projectMemberAddModal = true"
          >
            <span class="txt">프로젝트 - 멤버 - 추가</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="projectMemberAuthChangeModal = true"
          >
            <span class="txt">프로젝트 - 멤버 - 권한변경</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="projectMemberDeleteModal = true"
          >
            <span class="txt">프로젝트 - 멤버 - 멤버삭제</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">스토리지</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertStorageDeleteModal = true"
          >
            <span class="txt">[Alert]스토리지 삭제 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertStorageDelNotModal = true"
          >
            <span class="txt">[Alert]스토리지 삭제 불가 안내 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="storageAddModal = true"
          >
            <span class="txt">개인스토리지 추가</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="storageShareMngModal = true"
          >
            <span class="txt">스토리지 - 공유관리</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="storageShareMngIngModal = true"
          >
            <span class="txt">스토리지 - 공유관리(현재 이용중인 사용자가 있는 경우)</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="storageUsageStatusModal = true"
          >
            <span class="txt">스토리지 - 이용 현황</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="storageVolumeChangeModal = true"
          >
            <span class="txt">스토리지 - 용량 변경</span>
          </q-btn>
          <q-btn
            class="c_btn"
            @click="storageChangeRequestModal = true"
          >
            <span class="txt">스토리지 용량 변경 요청 (TBD)</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">내 이미지</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertImageDeleteModal = true"
          >
            <span class="txt">[Alert]이미지 삭제 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="imageShareMngModal = true"
          >
            <span class="txt">이미지 - 내이미지 - 공유관리</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">멤버</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertMemberProjectModal = true"
          >
            <span class="txt">[Alert]소속된 프로젝트가 있는 경우 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertMemberStorageModal = true"
          >
            <span class="txt">[Alert]개인이 생성한 스토리지가 있는 경우 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertMemberUserDelModal = true"
          >
            <span class="txt">[Alert]사용자 삭제 가능한 경우 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertMemberDeleteModal = true"
          >
            <span class="txt">[Alert]멤버 삭제 가능한 경우 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertMemberEditCancelModal = true"
          >
            <span class="txt">[Alert]수정된 내용이 있는 경우(멤버편집) 취소 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="memberWorkspaceAddModal = true"
          >
            <span class="txt">워크스페이스 멤버 추가</span>
          </q-btn>
          <q-btn
            class="c_btn"
            @click="memberInviteModal = true"
          >
            <span class="txt">멤버 초대 요청 (TBD)</span>
          </q-btn>
          <q-btn
            class="c_btn"
            @click="memberInviteConfirmModal = true"
          >
            <span class="txt">멤버 초대 요청 확인 (TBD)</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">내정보</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="LDAPLoginModal = true"
          >
            <span class="txt">LDAP 로그인(오픈 이후 개발)</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">회원탈퇴</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn"
            @click="alertWithDrawalInfoModal = true"
          >
            <span class="txt">[Alert]회원탈퇴 안내 팝업 (TBD)</span>
          </q-btn>
          <q-btn
            class="c_btn"
            @click="alertWithDrawalConfirmModal = true"
          >
            <span class="txt">[Alert]회원탈퇴 완료 팝업 (TBD)</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">sshkey & apikey</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertSshkeyDeleteModal = true"
          >
            <span class="txt">[Alert]SSH Key 삭제 선택시, 삭제 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertApikeyDeleteModal = true"
          >
            <span class="txt">[Alert]API Key 삭제 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="sshkeyWriteModal = true"
          >
            <span class="txt">계정 - SSH Key&API Key - 등록</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="apikeyCreateModal = true"
          >
            <span class="txt">API Key 생성</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">관리 - 프로젝트</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertProjectDelInfoModal = true"
          >
            <span class="txt">[Alert]프로젝트 삭제 안내 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertProjectDelConfirmModal = true"
          >
            <span class="txt">[Alert]프로젝트 삭제 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="workspaceMngEditModal = true"
          >
            <span class="txt">워크스페이스 관리자 기능 - 프로젝트 편집</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="workspaceMngSetModal = true"
          >
            <span class="txt">워크스페이스 관리자 기능 - 프로젝트 기본 할당량 설정</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertInstanceTaskInfoModal = true"
          >
            <span class="txt">[Alert]인스턴스, 태스크 생성하기 선택시 안내 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertTaskGroupReCreateInfoModal = true"
          >
            <span class="txt">[Alert]태스크 그룹 재생성, 태스크 재생성 선택시 안내 팝업</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">관리 - 인스턴스</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertInstanceAddVolumeInfoModal = true"
          >
            <span class="txt">[Alert]인스턴스 추가된 용량 (10GB 초과시 저장 되지 않음 안내 팝업)</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertInstanceDelConfirmModal = true"
          >
            <span class="txt">[Alert]인스턴스 삭제 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertResouceCantRestartModal = true"
          >
            <span class="txt">[Alert]리소스 부족으로 인한 재시작 불가 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertImageCreateCantModal = true"
          >
            <span class="txt">[Alert]이미지 생성 불가 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn"
            @click="workspaceResouceHistoryModal = true"
          >
            <span class="txt">워크스페이스 리소스 사용이력 조회 (TBD) - (꺽은선 그래프 + 달력)</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">관리 - 태스크</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertTaskRecreateInfoModal = true"
          >
            <span class="txt">[Alert]프로젝트 구성원이 아닌경우 선택시 안내 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertTaskGroupDelConfirmModal = true"
          >
            <span class="txt">[Alert]태스크 그룹 삭제 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertTaskDelConfirmModal = true"
          >
            <span class="txt">[Alert]태스크 삭제 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertTaskRecreateAuthModal = true"
          >
            <span class="txt">[Alert]재생성 권한 없음 팝업(프로젝트 구성원이 아닌경우) - 워크스페이스 관리자만 확인 가능</span>
          </q-btn>
        </div>
      </section>

      <section class="psection">
        <h2 class="sub_title">관리 - 스토리지</h2>
        <div class="c_btngroup f_wrap">
          <q-btn
            class="c_btn line"
            @click="alertStorageDeleteInfoModal = true"
          >
            <span class="txt">[Alert]스토리지 삭제 확인 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="alertStorageCantDeleteModal = true"
          >
            <span class="txt">[Alert]스토리지를 이용중인 사용자가 있는 경우 삭제 불가 안내 팝업</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="mngStorageAddModal = true"
          >
            <span class="txt">관리자 스토리지 추가</span>
          </q-btn>
          <q-btn
            class="c_btn"
            @click="mngStorageChangeRequestModal = true"
          >
            <span class="txt">워크스페이스 관리자 기능 - 스토리지 - 용량 변경 요청 (TBD)</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="mngStorageQuotaChangeModal = true"
          >
            <span class="txt">워크스페이스 관리자 - 스토리지 - 멤버 탭 - 스토리지 할당량 변경</span>
          </q-btn>
          <q-btn
            class="c_btn line"
            @click="mngStorageShareModal = true"
          >
            <span class="txt">워크스페이스 관리자 - 스토리지 - 공유 관리</span>
          </q-btn>
        </div>
      </section>
    </div>

    <!-- Start : [공통 팝업] 공통 오류 Alert 팝업 -->
    <q-dialog
      v-model="alertErrorModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>알 수 없는 오류가 발생하였습니다.<br />다시 시도해주세요.</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [공통 팝업] 공통 오류 Alert 팝업 -->

    <!-- Start : [공통 팝업] 소속된 워크스페이스 Alert 팝업 -->
    <q-dialog
      v-model="alertWorkspaceModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>소속된 워크스페이스가 없습니다.</strong>
          </p>
          <p class="desc">
            워크스페이스 관리자에게 초대를 요청하거나<br />서비스 이용문의를 남겨주세요
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="서비스 이용문의"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [공통 팝업] 소속된 워크스페이스 Alert 팝업 -->

    <!-- Start : [프로젝트] SNB - 프로젝트 생성 팝업 -->
    <q-dialog
      v-model="projectCreateModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>프로젝트 생성</strong>
          </p>
          <section class="section">
            <p class="sub_title">프로젝트 이름<i class="ess">*</i></p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textName"
                placeholder="최소 2자 최대 30자 입력"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section class="section">
            <p class="sub_title">프로젝트 설명</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="프로젝트 설명 입력"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{height: '100%'}"
              >
                <!-- <template v-slot:hint>
                    Description
                  </template> -->
              </q-input>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            @click="triggerSuccess('top-right')"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트] SNB - 프로젝트 생성 팝업 -->

    <!-- Start : [프로젝트] 프로젝트 이름/설명 변경 팝업 -->
    <q-dialog
      v-model="projectChangeModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>프로젝트 이름/설명 변경</strong>
          </p>
          <section
            class="section"
            aria-label="프로젝트 이름"
          >
            <p class="sub_title">프로젝트 이름</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textChangeName"
                placeholder="최소 2자 최대 30자 입력"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section
            class="section"
            aria-label="프로젝트 설명"
          >
            <p class="sub_title">프로젝트 설명</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textChangeDesc"
                bottom-slots
                type="textarea"
                placeholder="프로젝트 설명 입력"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{height: '100%'}"
              >
                <!-- <template v-slot:hint>
                    Description
                  </template> -->
              </q-input>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="저장"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트] 프로젝트 이름/설명 변경 팝업 -->

    <!-- Start : [프로젝트] 할당량 변경 요청 팝업 (TBD) 팝업 -->
    <q-dialog
      v-model="quotaChangeModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>할당량 변경 요청</strong>
          </p>
          <div class="c_form">
            <section class="section">
              <p class="sub_title">CPU</p>
              <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota1"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
            <section class="section">
              <p class="sub_title">Tesla V100</p>
              <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota2"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
            <section class="section">
              <p class="sub_title">Tesla A100_40G</p>
              <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota3"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
            <section class="section">
              <p class="sub_title">Tesla V100_80G</p>
              <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota4"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
          </div>
          <!-- //.c_form -->
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            disable
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트] 할당량 변경 요청 팝업 (TBD) 팝업 -->

    <!-- Start : [프로젝트 - 대시보드] 프로젝트내 이용중인 인스턴스/태스크가 있는 경우 안내 Alert 팝업 -->
    <q-dialog
      v-model="alertProjectInstanceTaskInfoModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>이용중인 인스턴스/태스크가 있어<br />프로젝트 삭제가 불가능합니다.</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 대시보드] 프로젝트내 이용중인 인스턴스/태스크가 있는 경우 안내 Alert 팝업 -->

    <!-- Start : [프로젝트 - 대시보드] 삭제 가능한경우, 삭제 확인 Alert 팝업 -->
    <q-dialog
      v-model="alertInstanceDelPossibleModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>프로젝트를 삭제하시겠습니까?</strong>
          </p>
          <p class="desc">
            프로젝트 관련 정보는 모두 삭제되며,<br />삭제된 내용은 복구되지 않습니다.
          </p>
          <div class="info negative">
            aa프로젝트 1
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 대시보드] 삭제 가능한경우, 삭제 확인 Alert 팝업 -->

    <!-- Start : [프로젝트 - 인스턴스] 인스턴스 추가된 용량 (10GB 초과시 저장 되지 않음 안내) Alert 팝업 -->
    <q-dialog
      v-model="alertInstanceOverAddModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>인스턴스 저장 가능 용량을 초과하여 현재 상태가 저장되지 않습니다. 정지하시겠습니까?</strong>
          </p>
          <div class="info">
            현재 용량 : 21GB (10BG 이하 저장 가능)
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 인스턴스] 인스턴스 추가된 용량 (10GB 초과시 저장 되지 않음 안내) Alert 팝업 -->

    <!-- Start : [프로젝트 - 인스턴스] 인스턴스 삭제 확인 Alert 팝업 -->
    <q-dialog
      v-model="alertInstanceDeleteModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>인스턴스를 삭제하시겠습니까?</strong>
          </p>
          <p class="desc">
            삭제된 인스턴스는 복구되지 않습니다.
          </p>
          <div class="info negative">
            AA인스턴스
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 인스턴스] 인스턴스 삭제 확인 Alert 팝업 -->

    <!-- Start : [프로젝트 - 인스턴스] 인스턴스 용량 초과로 인한 이미지 생성 불가 Alert 팝업 -->
    <q-dialog
      v-model="alertInstanceOverImageModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>용량이 초과하여 이미지 생성이 불가능합니다.</strong>
          </p>
          <p class="desc">
            추가된 용량이 10GiB 이하만 이미지 생성가능
          </p>
          <div class="info negative">
            현재 추가된 용량 : 21GB
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 인스턴스] 인스턴스 용량 초과로 인한 이미지 생성 불가 Alert 팝업 -->

    <!-- Start : [프로젝트 - 인스턴스] 리소스 부족으로 인한 재시작 불가 Alert 팝업 -->
    <q-dialog
      v-model="alertInstanceResourceModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>000리소스 할당량이 부족하여<br />인스턴스를 실행 할 수 없습니다.</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 인스턴스] 리소스 부족으로 인한 재시작 불가 Alert 팝업 -->

    <!-- Start : [프로젝트 - 인스턴스] 프로젝트 할당량이 부족한 경우 Alert 팝업 -->
    <q-dialog
      v-model="alertProjectQuotaModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>프로젝트 리소스 할당량이 부족하여<br />인스턴스 생성이 불가능합니다.</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 인스턴스] 프로젝트 할당량이 부족한 경우 Alert 팝업 -->

    <!-- Start : [프로젝트 - 인스턴스] 워크스페이스 할당량이 부족한 경우 Alert 팝업 -->
    <q-dialog
      v-model="alertWorkspaceQuotaModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>워크스페이스 리소스 할당량이 부족하여<br />인스턴스 생성이 불가능합니다.</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 인스턴스] 워크스페이스 할당량이 부족한 경우 Alert 팝업 -->

    <!-- Start : [프로젝트 - 인스턴스] 프로젝트 - 인스턴스 - 이미지 생성 팝업 -->
    <q-dialog
      v-model="projectInstanceImgCreateModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>이미지 생성</strong>
          </p>
          <section
            class="section"
            aria-label="이미지 이름"
          >
            <p class="sub_title">이미지 이름</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textName"
                placeholder="최소 2자 최대 100자 입력"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section
            class="section"
            aria-label="이미지 설명"
          >
            <p class="sub_title">이미지 설명</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="이미지 설명 입력"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{height: '100%'}"
              >
                <!-- <template v-slot:hint>
                    Description
                  </template> -->
              </q-input>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            @click="triggerImgWarning('top-right')"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            @click="triggerImgSuccess('top-right')"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 인스턴스] 프로젝트 - 인스턴스 - 이미지 생성 팝업 -->

    <!-- Start : [프로젝트 - 인스턴스] A 워크스페이스 리소스 사용 이력(꺽은선 그래프 + 달력 + 시계) 팝업 -->
    <q-dialog
      v-model="workspaceHistoryAModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>모니터링</strong>
          </p>
          <section
            class="section"
            aria-label="인스턴스 이름"
          >
            <p class="sub_title">인스턴스 이름</p>
            <p class="desc">V1.Xlarge(v100 GPU 1 / CPU 14 / MEM 122GB / DISK 80GB)</p>
            <div class="chartarea">
              chart area
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="닫기"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 인스턴스] A 워크스페이스 리소스 사용 이력(꺽은선 그래프 + 달력 + 시계) 팝업 -->

    <!-- Start : [프로젝트 - 인스턴스] B 워크스페이스 리소스 사용 이력(꺽은선 그래프 + 달력 + 시계) 팝업 -->
    <q-dialog
      v-model="workspaceHistoryBModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>모니터링</strong>
          </p>
          <section
            class="section"
            aria-label="인스턴스 이름"
          >
            <p class="sub_title">인스턴스 이름</p>
            <p class="desc">V1.Xlarge(v100 GPU 1 / CPU 14 / MEM 122GB / DISK 80GB)</p>
            <div class="chartarea">
              chart area
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="닫기"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 인스턴스] B 워크스페이스 리소스 사용 이력(꺽은선 그래프 + 달력 + 시계) 팝업 -->

    <!-- Start : [프로젝트 - 태스크] 태스크 그룹 삭제 확인 Alert 팝업 -->
    <q-dialog
      v-model="alertTaskGroupDeleteModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>태스크 그룹을 삭제하시겠습니까?</strong>
          </p>
          <p class="desc">
            삭제된 태스크 그룹은 복구되지 않습니다.
          </p>
          <div class="info negative">
            Taskgroup1
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
            @click="triggerTaskGroupWarning('top-right')"
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
            @click="triggerTaskGroupSuccess('top-right')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 태스크] 태스크 그룹 삭제 확인 Alert 팝업 -->

    <!-- Start : [프로젝트 - 태스크] 태스크 삭제 확인 Alert 팝업 -->
    <q-dialog
      v-model="alertTaskDeleteModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>태스크를 삭제하시겠습니까?</strong>
          </p>
          <p class="desc">
            삭제된 태스크는 복구되지 않습니다.
          </p>
          <div class="info negative">
            task1
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
            @click="triggerTaskWarning('top-right')"
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
            @click="triggerTaskSuccess('top-right')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 태스크] 태스크 삭제 확인 Alert 팝업 -->

    <!-- Start : [프로젝트 - 태스크] 태스크 - 로그 stdout(+ Full Size) 팝업 -->
    <q-dialog
      v-model="taskLogModal"
      class="c_dialog"
      :class="taskLog ? 'full' : 'large'"
    >
      <q-card v-model="taskLog">
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>태스크 로그</strong>
          </p>
          <section class="section command">
            <p class="sub_title">명령어</p>
            <div class="subject">
              command command command command command command
              command command command command command command command
            </div>
          </section>
          <div class="tasklog_group">
            <div class="tasklog_header">
              <q-tabs
                v-model="taskLogTab"
                align="left"
                class="c_tabs"
              >
                <q-tab
                  name="stdout"
                  label="stdout"
                />
                <q-tab
                  name="stderr"
                  label="stderr"
                />
              </q-tabs>
              <div class="c_btngroup">
                <q-btn class="ibtn download">
                  <span class="hidden">txt 파일 다운로드</span>
                </q-btn>
                <q-btn
                  class="ibtn fullscreen"
                  @click="taskLog = !taskLog"
                >
                  <template v-if="taskLog === false">
                    <span class="hidden">전체화면</span>
                  </template>
                  <template v-else>
                    <span class="hidden">화면축소</span>
                  </template>
                </q-btn>
                <q-btn
                  class="ibtn close"
                  v-close-popup
                  @click="taskLog = !taskLog"
                >
                  <span class="hidden">닫기</span>
                </q-btn>
              </div>
            </div>
            <div class="tasklog_body">
              <q-item-section class="item_stdlog">
                <pre>
                  101 04:09:31.131465 97509 exec.cpp:162] Version: 1.5.1
                  I1101 04:09:31.133281 97583 exec.cpp:236] Executor registered on agent
                  c537b15d-ad89-472f-aa2c-e4d35aefa82e-S340
                  I1101 04:09:31.133646 97584 executor.cpp:121] Registered docker executor
                  on gpu-cloud-anode2.dakao.io
                  I1101 04:09:31.134100 97586 executor.cpp:161] Starting task
                  arthur.kyg@kakaobrain.com&lt;@&gt;task&lt;@&gt;
                  4453b5bb-21ec-46af-993b-e861c6cc7407:2,
                  grad, grad
                </pre>
              </q-item-section>
            </div>
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="닫기"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 태스크] 태스크 - 로그 stdout(+ Full Size) 팝업 -->

    <!-- Start : [프로젝트 - 멤버관리] 권한 변경 불가 안내 Alert 팝업 -->
    <q-dialog
      v-model="alertMemberAuthNotModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>프로젝트 관리자가 1명인 경우,<br />관리자에 대한 권한 변경이 불가능합니다.</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 멤버관리] 권한 변경 불가 안내 Alert 팝업 -->

    <!-- Start : [프로젝트 - 멤버관리] 삭제 불가 안내 Alert 팝업 -->
    <q-dialog
      v-model="alertMemberDelNotModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>이용중인 태스크/인스턴스가 있어<br />멤버 삭제가 불가능합니다.</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 멤버관리] 삭제 불가 안내 Alert 팝업 -->

    <!-- Start : [프로젝트 - 멤버관리] 멤버 - 추가 -->
    <q-dialog
      v-model="projectMemberAddModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>프로젝트 멤버 추가</strong>
          </p>

          <div class="c_group">
            <div class="c_inpgroup">
              <q-select
                outlined
                v-model="shareChipModel"
                placeholder="사용자 이메일 입력"
                use-input
                use-chips
                multiple
                input-debounce="0"
                @new-value="createValue"
                :options="filterOptions"
                @filter="chipFilterFn"
                class="c_inpchip"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="search"
                    class="ico_search"
                  />
                </template>
                <template v-slot:append>
                  <div class="slotopt"></div>
                </template>
                <template v-slot:no-option>
                  <q-item class="no_data">
                    <q-item-section>
                      검색 결과 없습니다.
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <div class="c_selectgroup f_start">
                <CDropdown
                  v-model:selected="memberSelModel"
                  :label="'프로젝트 관리자'"
                  :options="memberSelOptions"
                  :type="'text'"
                />
              </div>
            </div>
            <q-btn class="c_btn medium add">
              <span class="txt">추가하기</span>
            </q-btn>
          </div>
          <!-- 검색 완료 -->
          <!-- <q-list class="p_list membermng">
            <q-item class="item">
              <i class="ico member" />
              <q-item-section class="item_card">
                <q-item-label class="name">root.choi</q-item-label>
                <q-item-label class="mail">root.choi@kakaobrain.com</q-item-label>
              </q-item-section>
              <CDropdown
                v-model:selected="memberSelModel"
                :label="'멤버'"
                :options="memberSelOptions"
                :type="'text'"
              />
            </q-item>
            <q-item class="item">
              <i class="ico member" />
              <q-item-section class="item_card">
                <q-item-label class="name">김나온</q-item-label>
                <q-item-label class="mail">naon12@gmail.com</q-item-label>
              </q-item-section>
              <CDropdown
                v-model:selected="memberSelModel"
                :label="'멤버'"
                :options="memberSelOptions"
                :type="'text'"
              />
            </q-item>
            <q-item class="item">
              <i class="ico member" />
              <q-item-section class="item_card">
                <q-item-label class="name">김나온</q-item-label>
                <q-item-label class="mail">naon12@gmail.com</q-item-label>
              </q-item-section>
              <CDropdown
                v-model:selected="memberSelModel"
                :label="'멤버'"
                :options="memberSelOptions"
                :type="'text'"
              />
            </q-item>
          </q-list> -->
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 멤버관리] 멤버 - 추가 -->

    <!-- Start : [프로젝트 - 멤버관리] 권한변경 -->
    <q-dialog
      v-model="projectMemberAuthChangeModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>프로젝트 권한 변경</strong>
          </p>
          <q-item-section class="item_card member bg f_start">
            <q-item-label class="name">{{ memberName }}</q-item-label>
            <q-item-label class="mail">{{ memberMail }}</q-item-label>
          </q-item-section>

          <div class="c_radiogroup f_wrap choice_group">
            <q-radio
              v-model="radCheck"
              val="rad1"
              label="프로젝트 관리자"
              class="c_radio"
            />
            <q-radio
              v-model="radCheck"
              val="rad2"
              label="멤버"
              class="c_radio"
            />
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="저장"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 멤버관리] 권한변경 -->

    <!-- Start : [프로젝트 - 멤버관리] 멤버삭제 -->
    <q-dialog
      v-model="projectMemberDeleteModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>프로젝트에서 삭제 하시겠습니까?</strong>
          </p>
          <q-item-section class="item_card member negative f_start">
            <q-item-label class="name">{{ memberName }}</q-item-label>
            <q-item-label class="mail">{{ memberMail }}</q-item-label>
          </q-item-section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="삭제"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [프로젝트 - 멤버관리] 멤버삭제 -->

    <!-- Start : [스토리지] 스토리지 삭제 확인 Alert 팝업 -->
    <q-dialog
      v-model="alertStorageDeleteModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>스토리지를 삭제하시겠습니까?</strong>
          </p>
          <p class="desc">
            스토리지에 저장된 데이터는 모두 삭제되며,<br />삭제된 내용은 복구되지 않습니다.
          </p>
          <div class="info negative">
            aa스토리지 이름
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [스토리지] 스토리지 삭제 확인 Alert 팝업 -->

    <!-- Start : [스토리지] 스토리지 삭제 불가 안내 Alert 팝업 -->
    <q-dialog
      v-model="alertStorageDelNotModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>현재 이용중인 사용자가 있어<br />스토리지 삭제가 불가능합니다. </strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [스토리지] 스토리지 삭제 불가 안내 Alert 팝업 -->

    <!-- Start : [스토리지] 개인스토리지 추가 -->
    <q-dialog
      v-model="storageAddModal"
      class="c_dialog large"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>개인 스토리지 추가</strong>
          </p>
          <section class="section">
            <p class="sub_title">이름<i class="ess">*</i></p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textName"
                placeholder="최소 2자 최대 30자"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section class="section">
            <p class="sub_title">설명</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="스토리지 설명"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{height: '100%'}"
              >
                <!-- <template v-slot:hint>
                    Description
                  </template> -->
              </q-input>
            </div>
          </section>
          <section class="section mt24">
            <p class="sub_title">스토리지 용량</p>
            <div class="c_inpgroup flex-end">
              <q-input
                outlined
                v-model="quota2"
                type="number"
                placeholder="50GiB 단위 입력"
                clearable
                class="inp_unit"
              >
                <template v-slot:append>
                  <span class="unit">GiB</span>
                </template>
              </q-input>
              <span class="desc">최대 50,000</span>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [스토리지] 개인스토리지 추가 -->

    <!-- Start : [스토리지] 공유관리 -->
    <q-dialog
      v-model="storageShareMngModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section
          class="c_dialog_body"
          style="max-height:684px"
        >
          <p class="title">
            <strong>공유 관리</strong>
          </p>
          <!-- <q-banner class="c_banner caution small">
            <template v-slot:avatar>
              <q-icon class="noti" />
            </template>
            <div class="bn_head">
              <strong class="title">스토리지 공유 설정 불가</strong>
            </div>
            <div class="bn_body">
              현재 이용중인 사용자가 있어 설정이 불가능 합니다.
            </div>
          </q-banner> -->
          <div class="info storage">
            <i class="ico" />
            <span class="name">root 공유용</span>
          </div>
          <div class="c_group">
            <div class="c_inpgroup">
              <q-select
                outlined
                v-model="shareChipModel"
                placeholder="사용자, 프로젝트, 워크스페이스 검색"
                use-input
                use-chips
                multiple
                input-debounce="0"
                @new-value="createValue"
                :options="filterOptions"
                @filter="chipFilterFn"
                class="c_inpchip"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="search"
                    class="ico_search"
                  />
                </template>
                <template v-slot:append>
                  <div class="slotopt"></div>
                </template>
                <template v-slot:no-option>
                  <q-item class="no_data">
                    <q-item-section>
                      검색 결과 없습니다.
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <div class="c_selectgroup f_start">
                <CDropdown
                  v-model:selected="shareSelModel"
                  :label="'읽기쓰기'"
                  :options="shareSelOptions"
                  :type="'text'"
                />
              </div>
            </div>
            <q-btn class="c_btn medium add">
              <span class="txt">추가하기</span>
            </q-btn>
          </div>
          <template v-if="listData === listData">
            <q-list class="p_list sharemng">
              <template
                v-for="k in 5"
                :key="k"
              >
                <q-item class="item">
                  <i class="ico member" />
                  <q-item-section class="item_card">
                    <q-item-label class="name">{{ memberName }}</q-item-label>
                    <q-item-label class="mail">{{ memberMail }}</q-item-label>
                  </q-item-section>
                  <CDropdown
                    v-model:selected="shareSelModel"
                    :label="'읽기쓰기'"
                    :options="shareSelOptions"
                    :type="'text'"
                  />
                </q-item>
                <q-item class="item">
                  <i class="ico note" />
                  <q-item-section class="item_card">
                    <q-item-label class="name">00프로젝트</q-item-label>
                    <q-item-label class="mail">프로젝트</q-item-label>
                  </q-item-section>
                  <CDropdown
                    v-model:selected="shareSelModel"
                    :label="'읽기쓰기'"
                    :options="shareSelOptions"
                    :type="'text'"
                  />
                </q-item>
              </template>
            </q-list>
          </template>
          <template v-else>
            <div class="nodata bg_white">
              <p class="text">공유된 사용자가 없습니다.</p>
            </div>
          </template>
        </q-card-section>
        <q-card-actions class="c_dialog_foot bdr">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [스토리지] 공유관리 -->

    <!-- Start : [스토리지] 공유관리(현재 이용중인 사용자가 있는 경우) -->
    <q-dialog
      v-model="storageShareMngIngModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section
          class="c_dialog_body"
          style="max-height:684px"
        >
          <p class="title">
            <strong>공유 관리</strong>
          </p>
          <q-banner class="c_banner caution small">
            <template v-slot:avatar>
              <q-icon class="noti" />
            </template>
            <div class="bn_head">
              <strong class="title">스토리지 공유 설정 불가</strong>
            </div>
            <div class="bn_body">
              현재 이용중인 사용자가 있어 설정이 불가능 합니다.
            </div>
          </q-banner>
          <div class="info storage">
            <i class="ico" />
            <span class="name">root 공유용</span>
          </div>
          <div class="c_group">
            <div class="c_inpgroup">
              <q-select
                outlined
                v-model="shareChipModel"
                placeholder="사용자, 프로젝트, 워크스페이스 검색"
                use-input
                use-chips
                multiple
                input-debounce="0"
                @new-value="createValue"
                :options="filterOptions"
                @filter="chipFilterFn"
                class="c_inpchip"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="search"
                    class="ico_search"
                  />
                </template>
                <template v-slot:append>
                  <div class="slotopt"></div>
                </template>
                <template v-slot:no-option>
                  <q-item class="no_data">
                    <q-item-section>
                      검색 결과 없습니다.
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <div class="c_selectgroup f_start">
                <CDropdown
                  v-model:selected="shareSelModel"
                  :label="'읽기쓰기'"
                  :options="shareSelOptions"
                  :type="'text'"
                />
              </div>
            </div>
            <q-btn class="c_btn medium add">
              <span class="txt">추가하기</span>
            </q-btn>
          </div>
          <template v-if="listData === listData">
            <q-list class="p_list sharemng">
              <template
                v-for="k in 5"
                :key="k"
              >
                <q-item class="item">
                  <i class="ico member" />
                  <q-item-section class="item_card">
                    <q-item-label class="name">{{ memberName }}</q-item-label>
                    <q-item-label class="mail">{{ memberMail }}</q-item-label>
                  </q-item-section>
                  <CDropdown
                    v-model:selected="shareSelModel"
                    :label="'읽기쓰기'"
                    :options="shareSelOptions"
                    :type="'text'"
                  />
                </q-item>
                <q-item class="item">
                  <i class="ico note" />
                  <q-item-section class="item_card">
                    <q-item-label class="name">00프로젝트</q-item-label>
                    <q-item-label class="mail">프로젝트</q-item-label>
                  </q-item-section>
                  <CDropdown
                    v-model:selected="shareSelModel"
                    :label="'읽기쓰기'"
                    :options="shareSelOptions"
                    :type="'text'"
                  />
                </q-item>
              </template>
            </q-list>
          </template>
          <template v-else>
            <div class="nodata bg_white">
              <p class="text">공유된 사용자가 없습니다.</p>
            </div>
          </template>
        </q-card-section>
        <q-card-actions class="c_dialog_foot bdr">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [스토리지] 공유관리(현재 이용중인 사용자가 있는 경우) -->

    <!-- Start : [스토리지] 이용 현황 -->
    <q-dialog
      v-model="storageUsageStatusModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section
          class="c_dialog_body"
          style="max-height:684px"
        >
          <p class="title">
            <strong>스토리지 이용 현황</strong>
          </p>
          <template v-if="listData === listData">
            <q-list class="p_list stglist">
              <q-item
                v-for="i in 10"
                :key="i"
                class="item"
              >
                <i class="ico storage" />
                <q-item-section class="item_card">
                  <q-item-label class="name">MLOPS 용</q-item-label>
                  <q-item-label class="desc">
                    <span>인스턴스</span>
                    <span>김카브 (root.choi@kakaobrain.com)</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
          <template v-else>
            <div class="nodata">
              <p class="text">현재 사용중인 사용자가 없습니다.</p>
            </div>
          </template>
        </q-card-section>
        <q-card-actions class="c_dialog_foot bdr">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [스토리지] 이용 현황 -->

    <!-- Start : [스토리지] 용량 변경 -->
    <q-dialog
      v-model="storageVolumeChangeModal"
      class="c_dialog large"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>스토리지 용량 변경</strong>
          </p>
          <q-list class="p_list storage bg">
            <q-item class="item">
              <i class="ico storage" />
              <q-item-section class="item_card">
                <q-item-label class="name">MLOPS 용</q-item-label>
                <q-item-label class="desc">
                  <span>인스턴스</span>
                  <span>김카브 (root.choi@kakaobrain.com)</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <section class="section">
            <!-- <p class="sub_title">스토리지 용량</p> -->
            <div class="unit_type">
              <span class="tit">현재 사용량</span>
              <span class="counter">
                <em class="usage">190</em>
                <i class="bar">/</i>
                <strong class="quota">450</strong>
              </span>
            </div>
            <div class="c_inpgroup flex-end">
              <q-input
                outlined
                v-model="quota2"
                type="number"
                placeholder="50GiB 단위 입력"
                clearable
                class="inp_unit"
              >
                <template v-slot:append>
                  <span class="unit">GiB</span>
                </template>
              </q-input>
              <span class="desc">최대 50,000</span>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="저장"
            class="primary"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [스토리지] 용량 변경 -->

    <!-- Start : [스토리지] 용량 변경 요청 (TBD) -->
    <q-dialog
      v-model="storageChangeRequestModal"
      class="c_dialog large"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>개인 용량 변경 요청</strong>
          </p>
          <div class="info black">
            스토리지 용량 : 150GiB / 200GiB
          </div>
          <section class="section mt24">
            <p class="sub_title">요청 용량</p>
            <div class="c_inpgroup flex-end">
              <q-input
                outlined
                v-model="quota2"
                type="number"
                placeholder="50GiB 단위 입력"
                clearable
                class="inp_unit wsize_full"
              >
                <template v-slot:append>
                  <span class="unit">GiB</span>
                </template>
              </q-input>
            </div>
          </section>
          <section class="section">
            <p class="sub_title">요청사유</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="요청 사유 입력"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{height: '100%'}"
              >
                <!-- <template v-slot:hint>
                    Description
                  </template> -->
              </q-input>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [스토리지] 용량 변경 요청 (TBD) -->

    <!-- Start : [내 이미지] 이미지 삭제 확인  Alert 팝업 -->
    <q-dialog
      v-model="alertImageDeleteModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>이미지를 삭제하시겠습니까?</strong>
          </p>
          <div class="info">
            <strong>내 이미지 1</strong>
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="삭제"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [내 이미지] 이미지 삭제 확인  Alert 팝업 -->

    <!-- Start : [내 이미지] 이미지 - 내이미지 - 공유관리 -->
    <q-dialog
      v-model="imageShareMngModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>내 이미지 공유 관리</strong>
          </p>
          <q-item-section class="item_card medium bg">
            <q-item-label class="name">{{ itemImageName }}</q-item-label>
            <q-item-label class="desc">{{ itemImageDesc }}</q-item-label>
          </q-item-section>
          <section class="section">
            <p class="sub_title">공유 여부</p>
            <q-list class="p_list share">
              <q-item class="item chkall">
                <i class="ico folder" />
                <q-item-section class="item_card">
                  <q-item-label class="name">{{ itemName }}</q-item-label>
                  <q-item-label class="desc">{{ itemDesc }}</q-item-label>
                </q-item-section>
                <q-checkbox
                  v-model="chkAll"
                  class="c_checkbox check_all"
                />
              </q-item>
              <q-item class="item subitem">
                <i class="ico note" />
                <q-item-section class="item_card">
                  <q-item-label class="name">{{ itemName1 }}</q-item-label>
                  <q-item-label class="desc">{{ itemDesc1 }}</q-item-label>
                </q-item-section>
                <q-checkbox
                  v-model="chk1"
                  disable
                  class="c_checkbox"
                />
              </q-item>
              <q-item class="item subitem">
                <i class="ico note" />
                <q-item-section class="item_card">
                  <q-item-label class="name">{{ itemName2 }}</q-item-label>
                  <q-item-label class="desc">{{ itemDesc1 }}</q-item-label>
                </q-item-section>
                <q-checkbox
                  v-model="chk2"
                  disable
                  class="c_checkbox"
                />
              </q-item>
              <q-item class="item subitem">
                <i class="ico note" />
                <q-item-section class="item_card">
                  <q-item-label class="name">{{ itemName3 }}</q-item-label>
                  <q-item-label class="desc">{{ itemDesc1 }}</q-item-label>
                </q-item-section>
                <q-checkbox
                  v-model="chk3"
                  disable
                  class="c_checkbox"
                />
              </q-item>
            </q-list>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="저장"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [내 이미지] 이미지 - 내이미지 - 공유관리 -->

    <!-- Start : [멤버] 소속된 프로젝트가 있는 경우 Alert 팝업 -->
    <q-dialog
      v-model="alertMemberProjectModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>소속된 프로젝트가 있어 멤버 삭제가<br />불가능합니다.</strong>
          </p>
          <div class="info">
            aaProject1, 개인작업용prj
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [멤버] 소속된 프로젝트가 있는 경우 Alert 팝업 -->

    <!-- Start : [멤버] 개인이 생성한 스토리지가 있는 경우 Alert 팝업 -->
    <q-dialog
      v-model="alertMemberStorageModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>이용중인 스토리지가 있어 멤버 삭제가<br />불가능합니다.</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [멤버] 개인이 생성한 스토리지가 있는 경우 Alert 팝업 -->

    <!-- Start : [멤버] 사용자 삭제 가능한 경우 Alert 팝업 -->
    <q-dialog
      v-model="alertMemberUserDelModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>삭제하시겠습니까?</strong>
          </p>
          <p class="desc">
            삭제된 사용자의 개인 스토리지 데이터는 삭제되며,<br />복구 불가능합니다.
          </p>
          <div class="info negative">
            <span class="black">김카브(root.choi@kakaobrain.com)</span> 외 3명
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [멤버] 사용자 삭제 가능한 경우 Alert 팝업 -->

    <!-- Start : [멤버] 멤버 삭제 가능한 경우 Alert 팝업 -->
    <q-dialog
      v-model="alertMemberDeleteModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>멤버를 삭제 하시겠습니까?</strong>
          </p>
          <q-item-section class="item_card member negative f_start">
            <q-item-label class="name">{{ memberName }}</q-item-label>
            <q-item-label class="mail">{{ memberMail }}</q-item-label>
          </q-item-section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [멤버] 멤버 삭제 가능한 경우 Alert 팝업 -->

    <!-- Start : [멤버] 수정된 내용이 있는 경우(멤버편집) 취소 확인 Alert 팝업 -->
    <q-dialog
      v-model="alertMemberEditCancelModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>멤버 편집을 취소하시겠습니까?</strong>
          </p>
          <p class="desc">
            변경사항은 저장되지 않습니다.
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [멤버] 수정된 내용이 있는 경우(멤버편집) 취소 확인 Alert 팝업 -->

    <!-- Start : [멤버] 워크스페이스 멤버 추가 -->
    <q-dialog
      v-model="memberWorkspaceAddModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>워크스페이스 멤버 추가</strong>
          </p>
          <div class="c_form">
            <section class="section">
              <p class="sub_title">이메일<i class="ess">*</i></p>
              <div class="c_inpgroup">
                <q-input
                  outlined
                  v-model="textInviteName"
                  placeholder="이름 또는 이메일 입력"
                  clearable
                  class="wsize_full"
                />
              </div>
            </section>
            <section class="section">
              <p class="sub_title">워크스페이스 역할<i class="ess">*</i></p>
              <div class="c_radiogroup f_wrap wsize-50">
                <q-radio
                  v-model="radCheck"
                  val="rad1"
                  label="워크스페이스 관리자"
                  class="c_radio"
                />
                <q-radio
                  v-model="radCheck"
                  val="rad2"
                  label="워크스페이스 멤버"
                  class="c_radio"
                />
                <q-radio
                  v-model="radCheck"
                  val="rad2"
                  label="정산 관리자"
                  class="c_radio"
                />
                <q-radio
                  v-model="radCheck"
                  val="rad3"
                  label="게스트"
                  class="c_radio mr0"
                />
                <q-btn class="ibtn help">
                  <i class="ico help" /><span class="hidden">도움말</span>
                  <q-popup-edit
                    v-model="helpShow"
                    anchor="top middle"
                    self="top middle"
                    class="c_popover"
                  >
                    <div class="inner">
                      게스트는 워크스페이스 멤버 조회 및 프로젝트 생성 기능이 제한됩니다.
                    </div>
                  </q-popup-edit>
                </q-btn>
              </div>
            </section>
            <section class="section">
              <p class="sub_title">개인 스토리지 용량<i class="ess">*</i></p>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota2"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
          </div>
          <!-- //.c_form -->
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            disable
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [멤버] 워크스페이스 멤버 추가 -->

    <!-- Start : [멤버] 멤버 초대 요청 (TBD) 팝업 -->
    <q-dialog
      v-model="memberInviteModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>멤버 초대 요청</strong>
          </p>
          <section class="section">
            <p class="sub_title">이메일</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textInviteName"
                placeholder="이름 또는 이메일 입력"
                clearable
                class="wsize_full"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="search"
                    class="ico_search"
                  />
                </template>
              </q-input>
            </div>
          </section>
          <section class="section">
            <p class="sub_title">워크스페이스 역할</p>
            <div class="c_radiogroup mt20">
              <q-radio
                v-model="radCheck"
                val="rad1"
                label="워크스페이스 멤버"
                class="c_radio"
              />
              <q-radio
                v-model="radCheck"
                val="rad2"
                label="정산 관리자"
                class="c_radio"
              />
              <q-radio
                v-model="radCheck"
                val="rad3"
                label="게스트"
                class="c_radio mr0"
              />
              <q-btn class="ibtn help">
                <i class="ico help" /><span class="hidden">도움말</span>
                <q-popup-edit
                  v-model="helpShow"
                  anchor="top middle"
                  self="top middle"
                  class="c_popover"
                >
                  <div class="inner">
                    게스트는 워크스페이스 멤버 조회 및 프로젝트 생성 기능이 제한됩니다.
                  </div>
                </q-popup-edit>
              </q-btn>
            </div>
          </section>
          <section class="section">
            <p class="sub_title">프로젝트</p>
            <div class="c_selectgroup">
              <CDropdown
                v-model:selected="selectedCheck"
                :label="label"
                :options="options"
                :multiple="true"
                class="full_size"
              />
            </div>
          </section>
          <section class="section">
            <p class="sub_title">초대사유</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textInviteDesc"
                bottom-slots
                type="textarea"
                placeholder="초대사유 입력"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{height: '100%'}"
              >
                <!-- <template v-slot:hint>
                    Description
                  </template> -->
              </q-input>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            @click="triggerSuccess1('top-right')"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [멤버] 초대 요청 (TBD) 팝업 -->

    <!-- Start : [멤버] 멤버 초대 요청 확인 (TBD) -->
    <q-dialog
      v-model="memberInviteConfirmModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section
          style="max-height:684px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>멤버 초대 요청 확인</strong>
          </p>
          <div class="c_form">
            <section class="section bg padding">
              <q-item-section class="item_card request f_start">
                <q-item-label class="requester">요청자</q-item-label>
                <q-item-label class="requester_name">
                  {{ memberName }}({{ memberMail }})
                </q-item-label>
              </q-item-section>
              <q-item class="subject">
                같이 협업을 위해 신규 사용자를 초대했습니다. 확인해주세요~
                같이 협업을 위해 신규 사용자를 초대했습니다. 확인해주세요~
                같이 협업을 위해 신규 사용자를 초대했습니다. 확인해주세요~
                같이 협업을 위해 신규 사용자를 초대했습니다. 확인해주세요~
                같이 협업을 위해 신규 사용자를 초대했습니다. 확인해주세요~
                같이 협업을 위해 신규 사용자를 초대했습니다. 확인해주세요~
                같이 협업을 위해 신규 사용자를 초대했습니다. 확인해주세요~
                같이 협업을 위해 신규 사용자를 초대했습니다. 확인해주세요~
                같이 협업을 위해 신규 사용자를 초대했습니다. 확인해주세요~
              </q-item>
              <q-item-section class="item_card member bg_white f_start">
                <q-item-label class="name">{{ memberName }}</q-item-label>
                <q-item-label class="mail">{{ memberMail }}</q-item-label>
              </q-item-section>
              <q-item-section class="item_card info bg_white f_start f_wrap row">
                <q-item-label class="name">{{ itemDesc1 }}</q-item-label>
                <q-item-label class="proj">
                  AA프로젝트, BB프로젝트,
                  AA프로젝트, BB프로젝트,
                  AA프로젝트, BB프로젝트
                </q-item-label>
              </q-item-section>
            </section>
            <section class="section">
              <p class="sub_title">워크스페이스 역할</p>
              <div class="c_radiogroup f_wrap wsize-50">
                <q-radio
                  v-model="radCheck"
                  val="rad1"
                  label="워크스페이스 관리자"
                  class="c_radio"
                />
                <q-radio
                  v-model="radCheck"
                  val="rad2"
                  label="워크스페이스 멤버"
                  class="c_radio"
                />
                <q-radio
                  v-model="radCheck"
                  val="rad3"
                  label="정산 관리자"
                  class="c_radio"
                />
                <q-radio
                  v-model="radCheck"
                  val="rad4"
                  label="게스트"
                  class="c_radio mr0"
                />
                <q-btn class="ibtn help">
                  <i class="ico help" /><span class="hidden">도움말</span>
                  <q-popup-edit
                    v-model="helpShow"
                    anchor="top middle"
                    self="top middle"
                    class="c_popover"
                  >
                    <div class="inner">
                      게스트는 워크스페이스 멤버 조회 및 프로젝트 생성 기능이 제한됩니다.
                    </div>
                  </q-popup-edit>
                </q-btn>
              </div>
            </section>
            <section class="section">
              <p class="sub_title">개인 스토리지 용량</p>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota2"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
          </div>
          <!-- //.c_form -->
        </q-card-section>
        <q-card-actions class="c_dialog_foot bdr">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            disable
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [멤버] 멤버 초대 요청 확인 (TBD) -->

    <!-- Start : [내정보] LDAP 로그인(오픈 이후 개발) -->
    <q-dialog
      v-model="LDAPLoginModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>LDAP 로그인</strong>
          </p>
          <section class="section">
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="ldapID"
                placeholder="LDAP ID"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section class="section">
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="ldapPW"
                placeholder="PW"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="로그인"
            class="primary"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [내정보] LDAP 로그인(오픈 이후 개발) -->

    <!-- Start : [회원탈퇴] 회원탈퇴 안내 (TBD) Alert 팝업 -->
    <q-dialog
      v-model="alertWithDrawalInfoModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>회원탈퇴 하시겠습니까?</strong>
          </p>
          <p class="desc">
            회원탈퇴시, 계정 관련 모든 데이터가 삭제되며<br />복구되지 않습니다.
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [회원탈퇴] 회원탈퇴 안내 (TBD) Alert 팝업 -->

    <!-- Start : [회원탈퇴] 회원탈퇴 완료 (TBD) Alert 팝업 -->
    <q-dialog
      v-model="alertWithDrawalConfirmModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>회원 탈퇴가 완료되었습니다.<br />B^Cloud를 이용해주셔서 감사합니다.</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [회원탈퇴] 회원탈퇴 완료 (TBD) Alert 팝업 -->

    <!-- Start : [sshkey & apikey] SSH Key 삭제 선택시, 삭제 확인  Alert 팝업 -->
    <q-dialog
      v-model="alertSshkeyDeleteModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>SSH Key를 삭제하시겠습니까?</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [sshkey & apikey] SSH Key 삭제 선택시, 삭제 확인  Alert 팝업 -->

    <!-- Start : [sshkey & apikey] API Key 삭제  Alert 팝업 -->
    <q-dialog
      v-model="alertApikeyDeleteModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>API Key를 삭제하시겠습니까?</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [sshkey & apikey] API Key 삭제  Alert 팝업 -->

    <!-- Start : [sshkey & apikey] SSH Key&API Key - 등록 -->
    <q-dialog
      v-model="sshkeyWriteModal"
      class="c_dialog large"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>SSH Key 등록</strong>
          </p>
          <section class="section">
            <p class="sub_title">이름</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textName"
                placeholder="최소 2자 최대 30자 입력"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section class="section relative">
            <p class="sub_title">Public key</p>
            <label class="c_file btntype absolute top-20 right">
              <input
                type="file"
                @update:model-value="val => { files = val }"
              />
              <span class="file_text">파일업로드</span>
            </label>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="Public key 를 입력하거나 파일을 업로드 해주세요."
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{height: '100%'}"
              >
                <!-- <template v-slot:hint>
                    Description
                  </template> -->
              </q-input>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="저장"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [sshkey & apikey] SSH Key&API Key - 등록 -->

    <!-- Start : [sshkey & apikey] API Key 생성 -->
    <q-dialog
      v-model="apikeyCreateModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>API Key 생성</strong>
          </p>
          <q-banner class="c_banner caution small">
            <template v-slot:avatar>
              <q-icon class="noti" />
            </template>
            <div class="bn_head">
              <strong class="title">주의</strong>
            </div>
            <div class="bn_body">
              Secret Key는 최초 1회만 확인 가능합니다. 복사 후 이용해주세요.
            </div>
          </q-banner>
          <section class="section">
            <p class="sub_title">Access Key</p>
            <div class="c_inpgroup keygroup">
              <q-input
                outlined
                v-model="textKeyName"
                disable
              />
              <q-btn class="c_icon ibtn copy">
                <i class="ico copy" />
                <span class="hidden">Key 복사</span>
              </q-btn>
            </div>
          </section>
          <section class="section">
            <p class="sub_title">Secret Key</p>
            <div class="c_inpgroup keygroup">
              <q-input
                outlined
                v-model="textKeyName"
                disable
              />
              <q-btn class="c_icon ibtn copy">
                <i class="ico copy" />
                <span class="hidden">Key 복사</span>
              </q-btn>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [sshkey & apikey] API Key 생성 -->

    <!-- Start : [관리 - 프로젝트] 프로젝트 삭제 안내  Alert 팝업 -->
    <q-dialog
      v-model="alertProjectDelInfoModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>현재 이용중인 인스턴스/태스크가 있어<br />프로젝트 삭제가 불가능합니다.</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 프로젝트] 프로젝트 삭제 안내  Alert 팝업 -->

    <!-- Start : [관리 - 프로젝트] 프로젝트 삭제 확인  Alert 팝업 -->
    <q-dialog
      v-model="alertProjectDelConfirmModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>프로젝트를 삭제하시겠습니까?</strong>
          </p>
          <p class="desc">
            삭제된 프로젝트는 복구되지 않습니다.
          </p>
          <div class="info negative">
            aa프로젝트1
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
            @click="triggerProjectWarning('top-right')"
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
            @click="triggerProjectSuccess('top-right')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 프로젝트] 프로젝트 삭제 확인  Alert 팝업 -->

    <!-- Start : [관리 - 프로젝트] 인스턴스, 태스크 생성하기 선택시 안내  Alert 팝업 -->
    <q-dialog
      v-model="alertInstanceTaskInfoModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>인스턴스/태스크 생성 권한이 없습니다.</strong>
          </p>
          <p class="desc">
            프로젝트 구성원만 인스턴스/태스크 생성이 가능합니다.
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 프로젝트] 인스턴스, 태스크 생성하기 선택시 안내  Alert 팝업 -->

    <!-- Start : [관리 - 프로젝트] 태스크 그룹 재생성, 태스크 재생성 선택시 안내  Alert 팝업 -->
    <q-dialog
      v-model="alertTaskGroupReCreateInfoModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>태스크 그룹/태스크 재생성 권한이 없습니다.</strong>
          </p>
          <p class="desc">
            프로젝트 구성원만 태스크 그룹/태스크 재생성 가능합니다.
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 프로젝트] 태스크 그룹 재생성, 태스크 재생성 선택시 안내  Alert 팝업 -->

    <!-- Start : [관리 - 프로젝트] 워크스페이스 관리자 기능 - 프로젝트 편집 -->
    <q-dialog
      v-model="workspaceMngEditModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section
          class="c_dialog_body"
          style="max-height:684px"
        >
          <p class="title">
            <strong>프로젝트 편집</strong>
          </p>
          <section class="section">
            <p class="sub_title">프로젝트 이름<i class="ess">*</i></p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textProjectName"
                placeholder="최소 2자 최대 30자 입력"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section class="section">
            <p class="sub_title">프로젝트 설명</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textProjectDesc"
                bottom-slots
                type="textarea"
                placeholder="프로젝트 설명 입력"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{height: '100%'}"
              >
                <!-- <template v-slot:hint>
                    Description
                  </template> -->
              </q-input>
            </div>
          </section>
          <div class="c_form mt24">
            <section class="section relative">
              <p class="sub_title">프로젝트 할당량</p>
              <div class="desc">
                프로젝트에서 이용가능한 리소스 한도를 설정합니다.<br />
                입력시 해당 자원을 할당하지 않습니다.
              </div>
              <q-toggle
                v-model="quotaOn"
                class="quotaToggle"
              />
            </section>
            <section class="section">
              <p class="sub_title">CPU</p>
              <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota1"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
            <section class="section">
              <p class="sub_title">Tesla V100</p>
              <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota2"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
            <section class="section">
              <p class="sub_title">Tesla A100_40G</p>
              <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota3"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
            <section class="section">
              <p class="sub_title">Tesla V100_80G</p>
              <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota4"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
          </div>
          <!-- //.c_form -->
        </q-card-section>
        <q-card-actions class="c_dialog_foot bdr">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="저장"
            class="primary"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 프로젝트] 워크스페이스 관리자 기능 - 프로젝트 편집 -->

    <!-- Start : [관리 - 프로젝트] 워크스페이스 관리자 기능 - 프로젝트 기본 할당량 설정 -->
    <q-dialog
      v-model="workspaceMngSetModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>프로젝트 리소스 기본 할당량 설정</strong>
          </p>
          <div class="c_form mt24">
            <section class="section relative">
              <p class="sub_title">프로젝트 기본 할당량</p>
              <div class="desc">
                워크스페이스 멤버들이 프로젝트 생성시 적용되는 기본 할당량을 설정합니다.<br />
                (기본 할당량 설정된 시점 이후 생성된 프로젝트만 적용)<br />
              </div>
              <div class="desc etc mt10">
                0 입력시 미할당
              </div>
              <q-toggle
                v-model="quotaOn"
                class="quotaToggle"
              />
            </section>
            <section class="section">
              <p class="sub_title">CPU</p>
              <!-- <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div> -->
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota1"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 500 <i class="bar" /> 권장 30</span>
              </div>
            </section>
            <section class="section">
              <p class="sub_title">Tesla V100</p>
              <!-- <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div> -->
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota2"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
            <section class="section">
              <p class="sub_title">Tesla A100_40G</p>
              <!-- <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div> -->
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota3"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
            <section class="section">
              <p class="sub_title">Tesla V100_80G</p>
              <!-- <div class="unit_type">
                <span class="tit">현재 사용량</span>
                <span class="counter">
                  <em class="usage">190</em>
                  <i class="bar">/</i>
                  <strong class="quota">450</strong>
                </span>
              </div> -->
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota4"
                  type="number"
                  placeholder="50GiB 단위 입력"
                  clearable
                  class="inp_unit"
                >
                  <template v-slot:append>
                    <span class="unit">GiB</span>
                  </template>
                </q-input>
                <span class="desc">최대 50,000</span>
              </div>
            </section>
          </div>
          <!-- //.c_form -->
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="저장"
            class="primary"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 프로젝트] 워크스페이스 관리자 기능 - 프로젝트 기본 할당량 설정 -->

    <!-- Start : [관리 - 인스턴스] 인스턴스 추가된 용량 (10GB 초과시 저장 되지 않음 안내) Alert 팝업 -->
    <q-dialog
      v-model="alertInstanceAddVolumeInfoModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>인스턴스 용량이 초과되어 정지시 현재 상태가 저장되지 않습니다. 정지 하시겠습니까?</strong>
          </p>
          <div class="info">
            현재 용량 : 21GB (10BG 이하 저장 가능)
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 인스턴스] 인스턴스 추가된 용량 (10GB 초과시 저장 되지 않음 안내) Alert 팝업 -->

    <!-- Start : [관리 - 인스턴스] 인스턴스 삭제 확인 Alert 팝업 -->
    <q-dialog
      v-model="alertInstanceDelConfirmModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>인스턴스를 삭제하시겠습니까?</strong>
          </p>
          <p class="desc">
            삭제된 인스턴스는 복구되지 않습니다.
          </p>
          <div class="info negative">
            AA인스턴스
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
            @click="triggerInstanceWarning('top-right')"
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
            @click="triggerInstanceSuccess('top-right')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 인스턴스] 인스턴스 삭제 확인 Alert 팝업 -->

    <!-- Start : [관리 - 인스턴스] 이미지 생성 불가 Alert 팝업 -->
    <q-dialog
      v-model="alertImageCreateCantModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>용량이 초과하여 이미지 생성이 불가능합니다.</strong>
          </p>
          <p class="desc">
            추가된 용량이 10GiB 이하만 이미지 생성가능
          </p>
          <div class="info negative">
            현재 추가된 용량 : 21GB
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 인스턴스] 인스턴스 용량 초과로 인한 이미지 생성 불가 Alert 팝업 -->

    <!-- Start : [관리 - 인스턴스] 워크스페이스 리소스 사용이력 조회 (TBD) - (꺽은선 그래프 + 달력) -->
    <q-dialog
      v-model="workspaceResouceHistoryModal"
      class="c_dialog large"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>워크스페이스 리소스 사용 이력</strong>
          </p>
          <section class="section">
            <p class="sub_title">카카오 모빌리티(Public)</p>
            <div class="chartarea">
              chart area
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="닫기"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 인스턴스] 워크스페이스 리소스 사용이력 조회 (TBD) - (꺽은선 그래프 + 달력) -->

    <!-- Start : [관리 - 인스턴스] 리소스 부족으로 인한 재시작 불가 Alert 팝업 -->
    <q-dialog
      v-model="alertResouceCantRestartModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>000리소스 할당량이 부족하여<br />인스턴스를 실행 할 수 없습니다.</strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 인스턴스] 리소스 부족으로 인한 재시작 불가 Alert 팝업 -->

    <!-- Start : [관리 - 태스크] 프로젝트 구성원이 아닌경우 선택시 안내 Alert 팝업 -->
    <q-dialog
      v-model="alertTaskRecreateInfoModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>태스크 그룹/태스크 재생성 권한이 없습니다.</strong>
          </p>
          <p class="desc">
            프로젝트 구성원만 태스크 그룹/태스크 재생성 가능합니다.
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 태스크] 프로젝트 구성원이 아닌경우 선택시 안내 Alert 팝업 -->

    <!-- Start : [관리 - 태스크] 태스크 그룹 삭제 Alert 팝업 -->
    <q-dialog
      v-model="alertTaskGroupDelConfirmModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>태스크 그룹을 삭제하시겠습니까?</strong>
          </p>
          <p class="desc">
            삭제된 태스크 그룹은 복구되지 않습니다.
          </p>
          <div class="info negative">
            Taskgroup1
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 태스크] 태스크 그룹 삭제 Alert 팝업 -->

    <!-- Start : [관리 - 태스크] 태스크 삭제 확인 Alert 팝업 -->
    <q-dialog
      v-model="alertTaskDelConfirmModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>태스크를 삭제하시겠습니까?</strong>
          </p>
          <p class="desc">
            삭제된 태스크는 복구되지 않습니다.
          </p>
          <div class="info negative">
            task1
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 태스크] 태스크 삭제 확인 Alert 팝업 -->

    <!-- Start : [관리 - 태스크] 재생성 권한 없음 팝업(프로젝트 구성원이 아닌경우) - 워크스페이스 관리자만 확인 가능 Alert 팝업 -->
    <q-dialog
      v-model="alertTaskRecreateAuthModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>태스크 그룹/태스크 재생성 권한이 없습니다.</strong>
          </p>
          <p class="desc">
            프로젝트 구성원만 태스크 그룹/태스크 재생성 가능합니다.
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 태스크] 재생성 권한 없음 팝업(프로젝트 구성원이 아닌경우) - 워크스페이스 관리자만 확인 가능 Alert 팝업 -->

    <!-- Start : [관리 - 스토리지] 스토리지 삭제 확인 Alert 팝업 -->
    <q-dialog
      v-model="alertStorageDeleteInfoModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>스토리지를 삭제하시겠습니까?</strong>
          </p>
          <p class="desc">
            스토리지에 저장된 데이터는 모두 삭제되며, 삭제된 내용은 복구되지 않습니다.
          </p>
          <div class="info negative">
            aa스토리지 이름
          </div>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 스토리지] 스토리지 삭제 확인 Alert 팝업 -->

    <!-- Start : [관리 - 스토리지] 스토리지를 이용중인 사용자가 있는 경우 삭제 불가 안내 Alert 팝업 -->
    <q-dialog
      v-model="alertStorageCantDeleteModal"
      class="c_dialog"
    >
      <q-card>
        <q-card-section
          style="max-height:290px"
          class="c_dialog_body"
        >
          <p class="title">
            <strong>현재 이용중인 사용자가 있어<br />스토리지 삭제가 불가능합니다. </strong>
          </p>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 스토리지] 스토리지를 이용중인 사용자가 있는 경우 삭제 불가 안내 Alert 팝업 -->

    <!-- Start : [관리 - 스토리지] 관리자 스토리지 추가 팝업 -->
    <q-dialog
      v-model="mngStorageAddModal"
      class="c_dialog large"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>관리자 스토리지 추가</strong>
          </p>
          <section class="section">
            <p class="sub_title">이름<i class="ess">*</i></p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textName"
                placeholder="최소 2자 최대 30자"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section class="section">
            <p class="sub_title">설명</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="스토리지 설명"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{height: '100%'}"
              >
                <!-- <template v-slot:hint>
                    Description
                  </template> -->
              </q-input>
            </div>
          </section>
          <section class="section">
            <p class="sub_title">스토리지 용량</p>
            <div class="c_inpgroup flex-end">
              <q-input
                outlined
                v-model="quota2"
                type="number"
                placeholder="50GiB 단위 입력"
                clearable
                class="inp_unit"
              >
                <template v-slot:append>
                  <span class="unit">GiB</span>
                </template>
              </q-input>
              <span class="desc"> / 20,000 GiB</span>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            @click="triggerStorageWarning('top-right')"
            v-close-popup
          />
          <q-btn
            label="확인"
            class="primary"
            @click="triggerStorageSuccess('top-right')"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 스토리지] 관리자 스토리지 추가 팝업 -->

    <!-- Start : [관리 - 스토리지] 워크스페이스 관리자 기능 - 스토리지 - 용량 변경 요청 (TBD) -->
    <q-dialog
      v-model="mngStorageChangeRequestModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>스토리지 할당량 변경 요청</strong>
          </p>
          <section class="section bg padding">
            <q-item-section class="item_card request f_start">
              <q-item-label class="requester">요청자</q-item-label>
              <q-item-label class="requester_name">
                {{ memberName }}({{ memberMail }})
              </q-item-label>
            </q-item-section>
            <q-item class="subject">
              테스트 진행 및 데이터 추가 업로드를 위한 개인 스토리지 증량 요청
            </q-item>
            <q-item-section class="item_card info bg_white f_start row padding">
              <q-item-label class="capacity">요청용량</q-item-label>
              <q-item-label class="volume">500GiB</q-item-label>
            </q-item-section>
          </section>
          <section class="section">
            <p class="sub_title">스토리지 할당량 변경</p>
            <div class="unit_type">
              <span class="tit">현재 사용량</span>
              <span class="counter">
                <em class="usage">190</em>
                <i class="bar">/</i>
                <!-- 인풋 클릭시 (할당량 색 변경 후 실시간 반영) class blue 추가 또는 style blue 추가 -->
                <strong class="quota">450</strong>
                <!-- <strong class="quota blue">450</strong> -->
              </span>
            </div>
            <div class="c_inpgroup flex-end">
              <q-input
                outlined
                v-model="quota2"
                type="number"
                placeholder="50GiB 단위 입력"
                clearable
                class="inp_unit"
              >
                <template v-slot:append>
                  <span class="unit">GiB</span>
                </template>
              </q-input>
              <span class="desc">최대 50,000</span>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="저장"
            class="primary"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 스토리지] 워크스페이스 관리자 기능 - 스토리지 - 용량 변경 요청 (TBD) -->

    <!-- Start : [관리 - 스토리지] 워크스페이스 관리자 - 스토리지 - 멤버 탭 - 스토리지 할당량 변경 -->
    <q-dialog
      v-model="mngStorageQuotaChangeModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>개인 스토리지 할당량 변경</strong>
          </p>
          <q-item-section class="item_card member bg f_start">
            <q-item-label class="name">{{ memberName }}</q-item-label>
            <q-item-label class="mail">{{ memberMail }}</q-item-label>
          </q-item-section>
          <section class="section">
            <div class="unit_type">
              <span class="tit">현재 사용량</span>
              <span class="counter">
                <em class="usage">190</em>
                <i class="bar">/</i>
                <strong class="quota">450</strong>
              </span>
            </div>
            <div class="c_inpgroup flex-end">
              <q-input
                outlined
                v-model="quota2"
                type="number"
                placeholder="50GiB 단위 입력"
                clearable
                class="inp_unit"
              >
                <template v-slot:append>
                  <span class="unit">GiB</span>
                </template>
              </q-input>
              <span class="desc">최대 50,000</span>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="저장"
            class="primary"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 스토리지] 워크스페이스 관리자 - 스토리지 - 멤버 탭 - 스토리지 할당량 변경 -->

    <!-- Start : [관리 - 스토리지] 워크스페이스 관리자 - 스토리지 - 공유 관리 -->
    <q-dialog
      v-model="mngStorageShareModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section
          class="c_dialog_body"
          style="max-height:684px"
        >
          <p class="title">
            <strong>공유 관리</strong>
          </p>
          <!-- <q-banner class="c_banner caution small">
            <template v-slot:avatar>
              <q-icon class="noti" />
            </template>
            <div class="bn_head">
              <strong class="title">스토리지 공유 설정 불가</strong>
            </div>
            <div class="bn_body">
              현재 이용중인 사용자가 있어 설정이 불가능 합니다.
            </div>
          </q-banner> -->
          <div class="info storage">
            <i class="ico" />
            <span class="name">root 공유용</span>
          </div>
          <div class="c_group">
            <div class="c_inpgroup">
              <q-select
                outlined
                v-model="shareChipModel"
                placeholder="사용자, 프로젝트, 워크스페이스 검색"
                use-input
                use-chips
                multiple
                input-debounce="0"
                @new-value="createValue"
                :options="filterOptions"
                @filter="chipFilterFn"
                class="c_inpchip"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="search"
                    class="ico_search"
                  />
                </template>
                <template v-slot:append>
                  <div class="slotopt"></div>
                </template>
                <template v-slot:no-option>
                  <q-item class="no_data">
                    <q-item-section>
                      검색 결과 없습니다.
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <div class="c_selectgroup f_start">
                <CDropdown
                  v-model:selected="shareSelModel"
                  :label="'읽기쓰기'"
                  :options="shareSelOptions"
                  :type="'text'"
                />
              </div>
            </div>
            <q-btn class="c_btn medium add">
              <span class="txt">추가하기</span>
            </q-btn>
          </div>
          <template v-if="listData === listData">
            <q-list class="p_list sharemng">
              <template
                v-for="k in 5"
                :key="k"
              >
                <q-item class="item">
                  <i class="ico member" />
                  <q-item-section class="item_card">
                    <q-item-label class="name">{{ memberName }}</q-item-label>
                    <q-item-label class="mail">{{ memberMail }}</q-item-label>
                  </q-item-section>
                  <CDropdown
                    v-model:selected="shareSelModel"
                    :label="'읽기쓰기'"
                    :options="shareSelOptions"
                    :type="'text'"
                  />
                </q-item>
                <q-item class="item">
                  <i class="ico note" />
                  <q-item-section class="item_card">
                    <q-item-label class="name">00프로젝트</q-item-label>
                    <q-item-label class="mail">프로젝트</q-item-label>
                  </q-item-section>
                  <CDropdown
                    v-model:selected="shareSelModel"
                    :label="'읽기쓰기'"
                    :options="shareSelOptions"
                    :type="'text'"
                  />
                </q-item>
              </template>
            </q-list>
          </template>
          <template v-else>
            <div class="nodata bg_white">
              <p class="text">공유된 사용자가 없습니다.</p>
            </div>
          </template>
        </q-card-section>
        <q-card-actions class="c_dialog_foot bdr">
          <q-btn
            label="확인"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [관리 - 스토리지] 워크스페이스 관리자 - 스토리지 - 공유 관리 -->
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta, useQuasar } from "quasar";
import CDropdown from "components/common/CDropdown.vue";

const $q = useQuasar();
const title = ref("Popup(Modal)");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const label = ref("프로젝트 선택");
const selectedCheck = ref(null);
const options = ref([
  { label: "프로젝트1", value: 0 },
  { label: "프로젝트2", value: 1 },
  { label: "프로젝트3", value: 2 },
  { label: "프로젝트4", value: 3 },
  { label: "프로젝트5", value: 4 },
]);

const alertErrorModal = ref(false);
const alertWorkspaceModal = ref(false);
const alertProjectInstanceTaskInfoModal = ref(false);
const alertInstanceDelPossibleModal = ref(false);
const alertInstanceOverAddModal = ref(false);
const alertInstanceDeleteModal = ref(false);
const alertInstanceOverImageModal = ref(false);
const alertInstanceResourceModal = ref(false);
const alertProjectQuotaModal = ref(false);
const alertWorkspaceQuotaModal = ref(false);
const alertTaskGroupDeleteModal = ref(false);
const alertTaskDeleteModal = ref(false);
const alertMemberAuthNotModal = ref(false);
const alertMemberDelNotModal = ref(false);
const alertStorageDeleteModal = ref(false);
const alertStorageDelNotModal = ref(false);
const alertImageDeleteModal = ref(false);
const alertMemberProjectModal = ref(false);
const alertMemberStorageModal = ref(false);
const alertMemberUserDelModal = ref(false);
const alertMemberDeleteModal = ref(false);
const alertMemberEditCancelModal = ref(false);
const alertWithDrawalInfoModal = ref(false);
const alertWithDrawalConfirmModal = ref(false);
const alertSshkeyDeleteModal = ref(false);
const alertApikeyDeleteModal = ref(false);
const alertProjectDelInfoModal = ref(false);
const alertProjectDelConfirmModal = ref(false);
const alertInstanceTaskInfoModal = ref(false);
const alertTaskGroupReCreateInfoModal = ref(false);
const alertInstanceAddVolumeInfoModal = ref(false);
const alertInstanceDelConfirmModal = ref(false);
const alertResouceCantRestartModal = ref(false);
const alertImageCreateCantModal = ref(false);
const alertTaskRecreateInfoModal = ref(false);
const alertTaskGroupDelConfirmModal = ref(false);
const alertTaskDelConfirmModal = ref(false);
const alertTaskRecreateAuthModal = ref(false);
const alertStorageDeleteInfoModal = ref(false);
const alertStorageCantDeleteModal = ref(false);

const projectCreateModal = ref(false);
const projectChangeModal = ref(false);
const quotaChangeModal = ref(false);
const projectInstanceImgCreateModal = ref(false);
const workspaceHistoryAModal = ref(false);
const workspaceHistoryBModal = ref(false);
const taskLogModal = ref(false);
const taskLog = ref(false);
const projectMemberAddModal = ref(false);
const projectMemberAuthChangeModal = ref(false);
const projectMemberDeleteModal = ref(false);
const storageAddModal = ref(false);
const storageShareMngModal = ref(false);
const storageShareMngIngModal = ref(false);
const storageUsageStatusModal = ref(false);
const storageVolumeChangeModal = ref(false);
const storageChangeRequestModal = ref(false);
const imageShareMngModal = ref(false);
const memberWorkspaceAddModal = ref(false);
const memberInviteModal = ref(false);
const memberInviteConfirmModal = ref(false);
const LDAPLoginModal = ref(false);
const sshkeyWriteModal = ref(false);
const apikeyCreateModal = ref(false);
const workspaceMngEditModal = ref(false);
const workspaceMngSetModal = ref(false);
const workspaceResouceHistoryModal = ref(false);
const mngStorageAddModal = ref(false);
const mngStorageChangeRequestModal = ref(false);
const mngStorageQuotaChangeModal = ref(false);
const mngStorageShareModal = ref(false);

const ldapID = ref(null);
const ldapPW = ref(null);
const textName = ref(null);
const textKeyName = ref("UxEDrsKjrTYjzB1QsOJhQVUKDj8e150W");
const textProjectName = ref("테스트용 프로젝트 01");
const textChangeName = ref("aa인스턴스");
const textInviteName = ref(null);
const textDesc = ref(null);
const textProjectDesc = ref(
  "프로젝트 설명 프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명"
);
const memberName = ref("김카브");
const memberMail = ref("root.choi@kakaobrain.com");
const textChangeDesc = ref("프로젝트 설명 텍스트");
const textInviteDesc = ref(null);
const itemImageName = ref("내이미지 01");
const itemImageDesc = ref(
  "내 이미지 테스트 01 (tensorflow 2.9.0, Karlo 테스트용)"
);
const itemName = ref("카카오모빌리티 워크스페이스");
const itemName1 = ref("aaTEST");
const itemName2 = ref("MLTEST");
const itemName3 = ref("aa팀 프로젝트");
const itemDesc = ref("워크스페이스");
const itemDesc1 = ref("소속 프로젝트");

const quota1 = ref(null);
const quota2 = ref(null);
const quota3 = ref(null);
const quota4 = ref(null);
const radCheck = ref("rad1");
const helpShow = ref(false);
const quotaOn = ref(true);
const files = ref(null);

const chkAll = ref(true);
const chk1 = ref(true);
const chk2 = ref(true);
const chk3 = ref(true);

const taskLogTab = ref("stdout");

const listData = ref(true);

const shareChipModel = ref(null);
const shareSelModel = ref("읽기쓰기");
const memberSelModel = ref("프로젝트 관리자");
const shareSelOptions = ["읽기쓰기", "읽기전용"];
const memberSelOptions = ["프로젝트 관리자", "멤버"];
const stringOptions = [];
const filterOptions = ref(stringOptions);
const createValue = (val, done) => {
  if (val.length > 0) {
    if (!stringOptions.includes(val)) {
      stringOptions.push(val);
    }
    done(val, "toggle");
  }
};
const chipFilterFn = (val, update) => {
  update(() => {
    if (val === "") {
      filterOptions.value = stringOptions;
    } else {
      const needle = val.toLowerCase();
      filterOptions.value = stringOptions.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const triggerSuccess = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "신규 프로젝트가 생성되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerImgSuccess = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "이미지가 생성되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerSuccess1 = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "워크스페이스 멤버가 추가 요청이 완료되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerProjectSuccess = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "프로젝트가 삭제되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerTaskGroupSuccess = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "태스크 그룹 삭제가 완료되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerTaskSuccess = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "태스크 그룹 삭제가 완료되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerStorageSuccess = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "태스크 그룹 삭제가 완료되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerInstanceSuccess = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "인스턴스 삭제가 완료되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerImgWarning = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "negative",
      message: "이미지 생성을 실패하였습니다. 다시 시도해주세요.",
      icon: "negative",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerProjectWarning = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "negative",
      message: "프로젝트 삭제를 실패하였습니다. 다시 시도해주세요.",
      icon: "negative",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerTaskGroupWarning = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "negative",
      message: "태스크 그룹 삭제를 실패하였습니다. 다시 시도해주세요.",
      icon: "negative",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerTaskWarning = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "negative",
      message: "태스크 삭제를 실패하였습니다. 다시 시도해주세요.",
      icon: "negative",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerStorageWarning = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "negative",
      message: "스토리지 생성에 실패하였습니다. 다시 시도해주세요",
      icon: "negative",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
const triggerInstanceWarning = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "negative",
      message: "인스턴스 삭제를 실패하였습니다. 다시 시도해주세요.",
      icon: "negative",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
</script>

<style lang="scss" scoped>
.psection:not(:first-child) {
  margin-top: 78px;
}
</style>
