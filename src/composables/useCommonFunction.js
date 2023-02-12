/* eslint-disable class-methods-use-this */
import { useCommonStore } from "stores/useCommonStore.js";
import { Notify } from "quasar";

const { setMessageInfo } = useCommonStore();

export class CommonFunction {
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
  onMessage(messageInfo) {
    setMessageInfo(messageInfo);
  }

  /**
   * 설명: Notify(Toast) 팝업 On
   * @param { object } notifyInfo
   * @param { string } notifyInfo.message message 내용
   * @param { string } notifyInfo.caption 바로가기 링크.. html tag
   * ex) <a href='#' class='alink'><span>바로보기</span></a>
   * @param { string } notifyInfo.type info(default) | positive | negative
   */
  onNotify(notifyInfo) {
    const { message, caption } = notifyInfo;
    const type = notifyInfo.type || "info";

    Notify.create({
      message,
      caption,
      type,
      icon: type,
      position: "top-right",
      actions: [
        { label: "닫기", class: "xclose", handler: () => { } }
      ],
      html: true,
      timeout: 500
    });
  }
}

export const $useCmFn = new CommonFunction();
