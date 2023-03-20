/* eslint-disable class-methods-use-this */
import { date } from "quasar";
import { useCommonStore } from "stores/useCommonStore.js";

const commonStore = useCommonStore();
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
      case "email":
        regExp = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        break;
      default:
        break;
    }

    return regExp.test(value);
  }

  /**
   * 설명: 날짜 원하는 포맷 형식으로 출력
   * @param { Date } value
   * @param { String } format 예: "YYYY-MM-DD"
   * @returns { String }
   */
  paseseDate(value, format) {
    const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/;
    let dt = value;
    if (regex.test(dt)) {
      const offset = new Date().getTimezoneOffset() * 60000;
      dt = new Date(new Date(dt).getTime() + offset);
    }
    return date.formatDate(dt, format);
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
    if (!role) return false;
    const roleCode = commonStore.getCodes("role");
    const roleName = roleCode[type].find((item) => item.code === role).label;
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

  /**
   * 설명: Array sort
   * @param { array } list
   * @param { string } type sort 타입
   * @param { boolean } desc 내림차순 true | 오름차순 false
   * @param { string } key sort 기준 key
   * @returns sorted list
   */
  sortType(list, key, desc, type) {
    const datetimeSort = (a, b) => (desc
      ? new Date(b[key]) - new Date(a[key])
      : new Date(a[key]) - new Date(b[key]));
    const defaultSort = (a, b) => (desc ? (b - a) : (a - b));
    let sortFunc = defaultSort;
    if (type === "datetime") {
      sortFunc = datetimeSort;
    }

    return list.sort(sortFunc);
  }

  /**
   * 설명: return percentage
   * @param { string, number } cur 현재 data
   * @param { string, number } total 전체 data
   */
  getPercentData(cur, total) {
    const curNum = Number(cur);
    const totalNum = Number(total);
    return (curNum / totalNum) * 100;
  }

  /**
   * 설명: 검색 필터링
   * 현재 조건: 입력값 일치
   * 포함조건 필요(영문, 숫자, 특수문자)
   * @param { array } list 전체리스트
   * @param { array } targetKey 검색 조건이 되는 key
   * @param { string } input 입력값
   */
  // searchList(list, targetKey, input) {
  //   const filteredList = list.filter((item) => targetKey.some((key) => item[key].match(new RegExp(input), "gi")));
  //   return filteredList;
  // }
  /* base_image.name시 에러
    utils.js?t=1678870613519:161 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'match')
  */
  /* 수정 */
  searchList(list, targetKey, input) {
    return list.filter((item) => targetKey.some((key) => String(key.split(".").reduce((o, i) => (o ? o[i] : null), item)).match(new RegExp(input, "gi"))));
  }
}

export const $utils = new Utils();
