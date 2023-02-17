import { boot } from "quasar/wrappers";
import vue3GoogleLogin from "vue3-google-login";

/**
 * @link https://yobaji.github.io/vue3-google-login/#installation
 */
export default boot(({ app }) => {
  app.use(vue3GoogleLogin, {
    clientId: "311277805069-1o5dr3l9e8hik3kdd4mefcf7hrtb883b.apps.googleusercontent.com"
  });
});
