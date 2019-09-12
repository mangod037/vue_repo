import Vue from "vue";
import App from "./App.vue";

import Multiselect from "vue-multiselect";
import VModal from "vue-js-modal";

Vue.component("multiselect", Multiselect);
Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
