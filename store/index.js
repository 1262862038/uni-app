import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		historyList: uni.getStorageSync("_history") || []
	},
	mutations:{
		SET_HISTORY_LIST(state, history) {
			state.historyList = history
		},
		CLEAR_HISTORY(state) {
			state.historyList = []
		}
	},
	actions:{
		set_history({commit, state},history) {
			let list = state.historyList
			list.unshift(history)
			
			uni.setStorageSync('_history', list)
			console.log('list', list)
			commit('SET_HISTORY_LIST', list)
		},
		clearHistory({commit, state}) {
			// uni.setStorageSync('_history', [])
			uni.removeStorageSync('_history')
			commit('CLEAR_HISTORY')
		}
	}
})

export default store