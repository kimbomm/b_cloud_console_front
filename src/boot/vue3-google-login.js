import { boot } from "quasar/wrappers";
import vue3GoogleLogin from "vue3-google-login";

export default boot(({ app }) => {
  app.use(vue3GoogleLogin, {
    clientId: "296155206721-ak8taimdc9o6jspdnfhmqpo1mhtdoa01.apps.googleusercontent.com"
  });
});
