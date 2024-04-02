import { createStore } from "vuex"

export default createStore({
  state() {
    return {
      lastAnswer: 0,
    }
  },
  mutations: {
    setLastAnswer(state, answer) {
      state.lastAnswer = answer
    },
  },
})
