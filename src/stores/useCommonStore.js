import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommonStore = defineStore("common", () => {
  /**
   * 설명: 내정보
   */
  const me = ref(null);
  function setMe(meInfo) {
    me.value = { ...meInfo };
  }

  /**
   * 설명: 유저 workspace 목록
   */
  const myWorkspaces = ref(null);
  function setMyWorkspaces(workspaces) {
    myWorkspaces.value = workspaces;
  }

  const messageInfo = ref({
    visible: false,
    message: "",
    description: "",
    positive: {
      value: "",
      callback: () => {}
    },
    negative: {
      value: "",
      callback: () => {}
    },
  });

  /**
   * 설명: 공통 메세지박스 On
   * @param { object } msgObj
   * @param { string } msgObj.message 메시지 타이틀 내용
   * @param { string } msgObj.description 서브메시지 내용
   * @param { object } msgObj.positive 확인 및 긍정버튼 정보
   * @param { object } msgObj.positive.value 버튼명: 확인(default) || 입력정보
   * @param { object } msgObj.positive.callback 버튼이벤트: 팝업닫기(default) || 입력이벤트
   * @param { object } msgObj.negative.value 버튼명: 취소(default) || 입력정보
   * @param { object } msgObj.negative.callback 버튼이벤트: 팝업닫기(default) || 입력이벤트
   */
  function setMessageInfo(msgObj) {
    const isNegative = Object.keys(msgObj).includes("negative");
    messageInfo.value = {
      visible: true,
      message: msgObj.message,
      description: msgObj.description,
      positive: {
        value: msgObj?.positive?.value || "확인",
        callback: msgObj?.positive?.callback || null
      },
      negative: isNegative ? {
        value: msgObj?.negative?.value || "취소",
        callback: msgObj?.negative?.callback || null
      } : null
    };
  }
  /**
   * 설명: 공통 메세지박스 Off
   */
  function hideMessageInfo() {
    messageInfo.value.visible = false;
  }

  /**
   * 설명: 공통 코드
   */
  const commonCodes = {
    role: {
      workspace: [
        { label: "워크스페이스 관리자", code: "manager" },
        { label: "정산 관리자", code: "billing_manager" },
        { label: "워크스페이스 멤버", code: "member" },
        { label: "게스트", code: "guest" },
      ],
      project: [
        { label: "프로젝트 관리자", code: "manager" },
        { label: "멤버", code: "member" },
      ],
    }
  };

  /*
  * 설명 : 공통 상태
  */
  function commonStatus(status) {
    let text = "";
    let className = "";

    /**
      상태 스키마 값
      *  1. save, 저장(개인)
      *  2. save_s, 저장(공유)
      *  3. error, 오류
      *  4. saving, 저장중
      * 임시추가 - saved -저장(개인)
      */

    switch (status) {
      case "save":
        text = "저장(개인)";
        className = "green";
        break;

      case "saved":
        text = "저장(개인)";
        className = "green";
        break;

      case "save_s":
        text = "저장(공유)";
        className = "green";
        break;

      case "error":
        text = "오류";
        className = "orange";
        break;

      case "saving":
        text = "저장중";
        className = "c_badge";
        break;

      case "running":
        text = "운영중";
        className = "green";
        break;

      case "stopped":
        text = "정지";
        className = "orange";
        break;

      case "pending":
        text = "대기중";
        className = "c_badge";
        break;

      case "stopping":
        text = "정지중";
        className = "c_badge";
        break;

      case "deleting":
        text = "삭제중";
        className = "c_badge";
        break;

      case "starting":
        text = "시작중";
        className = "c_badge";
        break;

      case "delete_cont":
        text = "삭제예정";
        className = "orange";
        break;

      case "delete_day":
        text = "삭제예정";
        className = "orange";
        break;

      default:
        break;
    }
    return { text, className };
  }

  /**
   * 설명: 공통 코드 가져오기
   */
  const getCodes = (key) => commonCodes[key];
  return {
    commonCodes,
    getCodes,
    me,
    setMe,
    myWorkspaces,
    setMyWorkspaces,
    messageInfo,
    setMessageInfo,
    hideMessageInfo,
    commonStatus
  };
});
