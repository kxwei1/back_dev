// 获取菜单列表！
import { getBanner } from "@/request/banner"
export default {
    namespaced: true,
    state: {
        bannerlist: []  // 菜单列表
    },
    getters: {
        bannerlist: state => state.bannerlist
    },
    mutations: {
        SET_LIST(state, data) {
            state.bannerlist = data;
        }
    },
    actions: {
        // 请求菜单列表的数据！
        async get_banner_list({ commit }) {
            let res = await getBanner();
            commit('SET_LIST', res)
        }
    }
};