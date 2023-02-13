import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommonStore = defineStore("common", () => {
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
  return {
    messageInfo,
    setMessageInfo,
    hideMessageInfo
  };
});
