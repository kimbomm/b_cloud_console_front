/* eslint-disable class-methods-use-this */
import { date } from "quasar";

class Utils {
  /**
   * 설명: null check 함수
   * @param { * } target null check target
   * @returns { boolean }
   */
  isBlank(target) {
    let isBlank = false;
    switch (typeof target) {
      case "object":
        isBlank = Array.isArray(target) ? !target.length : !target;
        break;
      default:
        isBlank = !target;
        break;
    }

    return isBlank;
  }

  /**
   * 설명: 정규식 체크
   */
  testRegex(value, type) {
    let regExp = "";

    switch (type) {
      case "nonKR":
        regExp = /[a-zA-Z0-9]/g;
        break;
      case "number":
        regExp = /[0-9]/g;
        break;
      case "en":
        regExp = /[a-zA-Z]/g;
        break;
      default:
        break;
    }

    return regExp.text(value);
  }

  /**
   * 설명: 날짜 원하는 포맷 형식으로 출력
   * @param { Date } value
   * @param { String } format 예: "YYYY-MM-DD"
   * @returns { String }
   */
  paseseDate(value, format) {
    return date.formatDate(value, format);
  }
}

export const $utils = new Utils();
