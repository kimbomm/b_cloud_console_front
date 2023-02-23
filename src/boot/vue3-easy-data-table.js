import { boot } from "quasar/wrappers";
import Vue3EasyDataTable from "src/utils/lib/vue3-easy-data-table/dist/vue3-easy-data-table.es.js";
import "vue3-easy-data-table/dist/style.css";

export default boot(({ app }) => {
  app.component("EasyDataTable", Vue3EasyDataTable);
});
