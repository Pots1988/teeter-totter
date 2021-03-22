import Vue from 'vue'
import Vuex from 'vuex'
import {
  randomPosition,
  calculateForce,
  calculateWeight,
  randomShape
} from '@/utils'
import {
  SWING_BENDING_SPEED,
  MAX_BENDING_DIFFERENCE,
  EXTRA_WEIGHT,
  EXTRA_WEIGHT_DISTANCE,
  SWING_LENGTH
} from '@/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newUserShape: null,
    userShapes: [],
    aiShapes: [],
    boardEl: null,
    gameStarted: false,
    gamePlay: false,
    swingAngle: 0
  },
  getters: {
    getUserShapes: (state) => state.userShapes,
    getAiShapes: (state) => state.aiShapes,
    getNewUserShape: (state) => state.newUserShape,
    getBoardEl: (state) => state.boardEl,
    getBoardWidth (state) {
      return state.boardEl?.clientWidth || 0
    },
    getUserForce: (state, getters) => calculateForce(state.userShapes, getters.getBoardWidth),
    getAiForce: (state, getters) => calculateForce(state.aiShapes, getters.getBoardWidth),
    getSwing: (state, getters) => {
      const { getUserForce, getAiForce } = getters

      if (!getUserForce) return 0

      return (getAiForce - getUserForce) / (getAiForce > getUserForce ? getAiForce : getUserForce)
    },
    getSwingSpeed: (state, getters) => getters.getSwing * SWING_BENDING_SPEED,
    getSwingAngle: (state) => state.swingAngle,
    getGameStarted: (state) => state.gameStarted,
    getGameEnded: (state, getters) => {
      const userWeight = calculateWeight(state.userShapes)
      const aiWeight = calculateWeight(state.aiShapes)
      const overWeight = Math.abs(aiWeight - userWeight) >= (EXTRA_WEIGHT * SWING_LENGTH / 2) / EXTRA_WEIGHT_DISTANCE

      return getters.getGameStarted && (Math.abs(getters.getSwing) * 100 > MAX_BENDING_DIFFERENCE || overWeight)
    },
    getGamePlay: (state) => state.gamePlay
  },
  mutations: {
    addUserShape (state, shape) {
      state.userShapes.push(shape)
    },
    addAiShape (state, shape) {
      state.aiShapes.push(shape)
    },
    resetShapes (state) {
      state.userShapes = []
      state.aiShapes = []
      state.newUserShape = null
    },
    setNewUserShape (state, shape) {
      state.newUserShape = shape
    },
    updateNewShape (state, newShape) {
      if (!state.newUserShape) {
        return false
      }

      state.newUserShape = { ...state.newUserShape, ...newShape }
    },
    setBoardEl (state, el) {
      state.boardEl = el
    },
    changeGameStarted (state, payload) {
      state.gameStarted = payload
    },
    changeGamePlay (state, gameState) {
      state.gamePlay = gameState
    },
    setSwingAngle (state, angle) {
      state.swingAngle = angle
    }
  },
  actions: {
    createShape ({ commit, getters }, owner = 'user') {
      const shape = randomShape()
      const isAi = owner === 'ai'
      const left = randomPosition(getters.getBoardWidth, shape.width, isAi)

      shape.left = left

      switch (owner) {
        case 'ai':
          commit('addAiShape', shape)
          break
        default:
          commit('setNewUserShape', shape)
      }

      return shape
    },
    createAiShape ({ dispatch }) {
      dispatch('createShape', 'ai')
    },
    resetGame ({ commit }) {
      commit('resetShapes')
      commit('changeGameStarted', false)
      commit('changeGamePlay', false)
      commit('setSwingAngle', 0)
    },
    async changeGamePlay ({ commit, getters, dispatch }, startGame) {
      if (startGame && !getters.getGameStarted) {
        await dispatch('createAiShape')
        await dispatch('createShape')
        commit('changeGameStarted', true)
      }

      commit('changeGamePlay', startGame)
    },
    updateNewShape ({ commit }, newShape) {
      commit('updateNewShape', newShape)
    },
    addUserShape ({ commit, state }) {
      const shape = { ...state.newUserShape, top: 0 }

      commit('addUserShape', shape)
      commit('setNewUserShape', null)
    }
  }
})
