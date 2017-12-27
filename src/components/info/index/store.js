export const GET_SHOPS_BY_PAGE = "GET_SHOPS_BY_PAGE"
export const ASYNC_GET_SHOPS_BY_PAGE = "ASYNC_GET_SHOPS_BY_PAGE"

export const GET_SWIPERIMGS_BY_PAGE = "GET_SWIPERIMGS_BY_PAGE"
export const ASYNC_GET_SWIPERIMGS_BY_PAGE = "ASYNC_GET_SWIPERIMGS_BY_PAGE"

import axios from "../../../lib/axios";
export default {
	namespaced: true,
	state: {
		shops: {
			curpage: 1,
			eachpage: 10,
			maxpage: 0,
			rows: []
		},
		swiperImgs: []
	},
	mutations: {
		//异步请求后，更新shops数据状态
		[GET_SHOPS_BY_PAGE](state, page) {
			state.shops = page
		},
		//异步请求后更新swiperImgs数据状态
		[GET_SWIPERIMGS_BY_PAGE](state, page) {
			state.swiperImgs = page
		}
	},
	actions: {
		//异步获取商铺信息
		async [ASYNC_GET_SHOPS_BY_PAGE](context, {curpage = 1, pagesize = 10, value} = {}) {
			const shopsObj = {
					curpage,
					pagesize,
					value
				}
			const { data } = await axios.get("/shops/list", {
				params: shopsObj
			})
			data.curpage = +data.curpage;
			data.pagesize = +data.pagesize;
			context.commit(GET_SHOPS_BY_PAGE, data);
		},
		//异步获取轮播图片信息
		async [ASYNC_GET_SWIPERIMGS_BY_PAGE](context, { ids, callback } = {}) {
			const { data } = await axios.get("/swiperImgs/list");
			context.commit(GET_SWIPERIMGS_BY_PAGE, data);
		}
	}
}
