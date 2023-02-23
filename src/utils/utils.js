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
        isBlank = Array.isArray(target) ? !target.length : Object.keys(target).length === 0;
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

  /**
   * 설명: 권한명칭 매칭 가져오기
   * @param {*} type workspace | project
   * @param {*} role
   *
   * 시스템 관리자(추후 어드민 적용)
   * user : 일반 사용자
   * admin : 어드민
   * app : 애플리케이션
   */
  getRoleName(role, type = "workspace") {
    let roleName = "";
    if (type !== "workspace") {
      switch (role) {
        case "manager":
          roleName = "워크스페이스 관리자";
          break;
        case "billing_manager":
          roleName = "정산 관리자";
          break;
        case "member":
          roleName = "워크스페이스 멤버";
          break;
        case "guest":
          roleName = "게스트";
          break;
        default:
          break;
      }
    } else {
      switch (role) {
        case "manager":
          roleName = "프로젝트 관리자";
          break;
        case "member":
          roleName = "멤버";
          break;
        default:
          break;
      }
    }
    return roleName;
  }

  /**
   * 설명: route hash 정재
   * @param { string } hash '#'포함된 hash
   * @returns '#'제거된 hash 또는 false
   */
  getHash(hash) {
    if (hash.includes("#")) {
      const rH = hash.split()[0].replaceAll("#", "");
      return rH;
    }
    return false;
  }
}

export const $utils = new Utils();
