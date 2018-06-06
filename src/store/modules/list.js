import { getBoardData } from '@/utils/api'
import { LIST_MOVIE_LIST, LIST_CLEAR_STATE } from '@/store/mutations-type'

const state = {
  page: 1,
  hasMore: true,
  movies: [],
  type: ''
}

const mutations = {
  ////Note by rain:  使用了命名空间? 为什么加中跨号?  外面绑定直接使用该名
  [LIST_CLEAR_STATE] (state) {
    state.page = 1
    state.hasMore = true
    state.movies = []
  },

  ////Note by rain: 我們可以使用 ES2015 的 computed property name 功能定義一個 function name
  //// 又是ES2015语法 😂
  [LIST_MOVIE_LIST] (state, { data, type }) {
    state.type = type
    if (data.subjects.length) {
      state.movies.push.apply(state.movies, data.subjects)

      if (type === 'us_box') {
        state.hasMore = false
      }
    } else {
      state.hasMore = false
    }
  }
}

const actions = {
  ////Note by rain: 这里本来传的是context, 然而传入的是{}字典, 里面的内容是context的属性
  ////用到的是 ES2015语法中的"参数解构", 
  //// https://vuex.vuejs.org/zh/guide/actions.html
  //// 参数解构: https://github.com/lukehoban/es6features#destructuring

  //// { type, search } 就是payload, 传入的是字典
  async getMovies ({ state, commit }, { type, search }) {
    if (!state.hasMore) return

    let data = await getBoardData({ board: type, page: state.page++, search })

    commit(LIST_MOVIE_LIST, {data, type})
  }
}

export default {
  state,
  mutations,
  actions
}
