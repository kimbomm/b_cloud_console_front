import { boot } from "quasar/wrappers";
import { $useCmFn } from "../composables/useCommonFunction.js";

export default boot(({ app }) => {
  app.provide("$useCmFn", $useCmFn);
});
