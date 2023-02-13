/* eslint-disable class-methods-use-this */

class Utils {
  /**
   * 설명: null check 함수
   * @param { * } target null check target
   * @returns { boolean }
   */
  isBlank(target) {
    let isBlank = false;
    switch (typeof target) {
      case "array":
        isBlank = !target.length;
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
}

export const $utils = new Utils();
