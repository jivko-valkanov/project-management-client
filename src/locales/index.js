import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en/index'

Vue.use(VueI18n);

const messages = {
  en: en
}

const vueI18n = new VueI18n({
    locale: "en",
    messages
  });

export default vueI18n;