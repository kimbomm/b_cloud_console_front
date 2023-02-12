/* eslint-disable class-methods-use-this */
import { useCommonStore } from "stores/useCommonStore.js";

const { setMessageInfo } = useCommonStore();

export class CommonFunction {
  onMessage(messageInfo) {
    setMessageInfo(messageInfo);
  }
}

export const $useCmFn = new CommonFunction();
