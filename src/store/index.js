import Vue from 'vue'
import Vuex from 'vuex'

import item from './modules/item'
import board from './modules/board'
import list from './modules/list'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    item: {
      namespaced: true,
      ...item
    },
    board: {
      namespaced: true,
      ...board
    },
    list: {
      namespaced: true,
      ...list
      ////Note by rain "..."符号直接把数组变成分开的元素
      // 原型:
      // state,
      // mutations,
      // actions,
      //

    }
  }
})

export default store
