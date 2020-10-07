import Vue from 'vue'
import App from './App.vue'
import VueValidate from 'vuelidate'
import router from './router'
import store from './store'
import dataFilter from './filters/data.filter'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import titlePlugin from './utils/title.plugin'


import messagePlugin from './utils/messagePlugin'
import firebase from 'firebase/app';
import Loader from '../src/components/app/Loader.vue'
import tooltipDirective from './directives/tooltop.directive'

import Paginate from 'vuejs-paginate'

import VueMeta from 'vue-meta'

import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import 'firebase/auth'
import 'firebase/database'

let app

Vue.config.productionTip = false
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.use(messagePlugin)
Vue.use(VueValidate)
Vue.use(VueMeta)
Vue.use(titlePlugin)
Vue.filter('date', dataFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)

const firebaseConfig = {
  apiKey: "AIzaSyCqnrKszp7uP8rs8zxiUiZ5TQToGM_QxqM",
  authDomain: "vue-crm-5dc72.firebaseapp.com",
  databaseURL: "https://vue-crm-5dc72.firebaseio.com",
  projectId: "vue-crm-5dc72",
  storageBucket: "vue-crm-5dc72.appspot.com",
  messagingSenderId: "82472028310",
  appId: "1:82472028310:web:b24d44e2cb33cd67b9dab7"
};

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})


