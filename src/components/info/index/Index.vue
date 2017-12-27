<template>
    <div class="index">
        <div class="header">
            <div class="swipe">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for='(item, index) in swiperImgs' :key='index' >
                        <div class="swiper-slide-div" v-bind:style="{backgroundImage: 'url(' +item.imgURL+ ')'}"></div>
                    </swiper-slide>
                    <div class="swiper-pagination" id="pagenation" slot="pagination"></div>
                </swiper>
            </div>
            <div class="top_bar location">
                <span class="location_icon iconfont icon-dingwei"></span>
                <span v-model='city'>成都</span>
            </div>
        </div>
        <div class="container">
            <div class="search_box">
                <input placeholder="搜索您感兴趣的课程" v-model='searchValue' type="text" class="search_inp">
                <span class="search_btn iconfont icon-chazhao" @click='searchShops()'></span>
            </div>
            <div class="store_list" id="storeList">
                <a href='http://www.baidu.com' class="store" v-for='(item, index) in shops.rows'>
                    <div class="store_img">
                        <div class="img" v-bind:style="{backgroundImage: 'url(' +item.img+ ')'}"></div>
                    </div>
                    <div class="store_info">
                        <div class="store_name">
                            <span class="s_name">{{item.name}}</span>
                            <div class="s_price">
                                <span>￥</span>
                                <span class="price">{{item.price}}</span>
                            </div>
                        </div>
                        <div class="tag_box">
                            <div class="s_tag">
                                <span class="tags" v-for='(tag, index) in item.tags'>{{tag}}</span>
                            </div>
                            <div class="store_add">
                                <div class="distance">
                                    <span class="dis_num">{{(item.distance / 1000).toFixed(1)}}</span>
                                    <span>km</span>
                                </div>
                                <span class="add">{{item.add}}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <p class='toLoad' @click='toLoadMore()' v-if='tipsLoad'>点击加载更多</p>
            <p class='toLoad' v-if='tipsBaseline'>我是有底线的</p>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import {ASYNC_GET_SHOPS_BY_PAGE, ASYNC_GET_SWIPERIMGS_BY_PAGE} from  "./store.js"
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css';
    export default {
        name: 'index',
        data() {
            return {
                city:'',
                //这个是swiper插件的配置，不用管
                swiperOption: {
                   notNextTick: true,
                   autoplay: 2000,
                   effect:"fade",
                   grabCursor : true,
                   setWrapperSize :true,
                   pagination : '.swiper-pagination',
                   paginationClickable :true,
                   mousewheelControl : true,
                   observeParents:true
                },
                //“点击加载更多”的显示状态
                tipsLoad: true,
                //“底线”显示状态
                tipsBaseline: false,
                //模糊查询内容
                searchValue: ''
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        computed: {
            ...mapState("index", ["shops", "swiperImgs"]),
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        methods: {
            ...mapActions("index", [ASYNC_GET_SHOPS_BY_PAGE, ASYNC_GET_SWIPERIMGS_BY_PAGE]),
            //加载更多
            toLoadMore(){
                const curpage = this.shops.curpage;//当前页码
                const pagesize = this.shops.pagesize + 10;//当前每页条数+10
                const value = this.searchValue;
                if(this.shops.total === this.shops.rows.length){
                    //如当前数据条数已经是数据库总条数，则不显示“点击加载更多”，显示“我是有底线的”
                    this.tipsLoad = false;
                    this.tipsBaseline = true;
                    return
                }
                this[ASYNC_GET_SHOPS_BY_PAGE]({curpage, pagesize, value})
            },
            //商铺信息模糊查询
            searchShops(){
                const curpage = this.shops.curpage;
                const pagesize = this.shops.pagesize;
                const value = this.searchValue;
                this[ASYNC_GET_SHOPS_BY_PAGE]({curpage, pagesize, value})
            }
        },
        created() {
            this[ASYNC_GET_SHOPS_BY_PAGE]()  //初始商家  
            this[ASYNC_GET_SWIPERIMGS_BY_PAGE]()  //初始轮播信息
        },
        mounted() {
        }
    }
</script>

<style scoped>
    *{
        font-family: '微软雅黑';
    }
    .header{
        position: relative;
    }
    /*轮播*/
    .swiper-slide-div{
        padding: 27% 0;
        height: 0;
        background-position: center center;
        background-size: 100%;
    }
    #pagenation>.swiper-pagination-bullet-active{
        background: #f77e51;
    }
    .top_bar{
        width: 100px;
        height: 40px;
        position: absolute;
        top: 4px;
        z-index: 9;
        box-sizing: border-box;
        color: #fff;
        font-size: 20px;
        padding: 0 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .location_icon{
        font-size: 26px;
        margin-right: 2px;
    }
    /*搜索*/
    .search_box{
        height: 50px;
        background-color: #fff;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .search_inp{
        flex: 1;
        height: 18px;
        font-size: 16px;
        line-height: 18px;
        padding: 0 8px;
        border: none;
        border-radius: 0;
        outline: none;
        border-left: 3px solid #f77e51;
    }
    .search_inp::-webkit-input-placeholder { /* WebKit browsers */ 
        font-size: 16px;
        color: #999;
    } 
    .search_inp:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
        font-size: 16px; 
        color: #999;
    } 
    .search_inp::-moz-placeholder { /* Mozilla Firefox 19+ */ 
        font-size: 16px; 
        color: #999;
    } 
    .search_inp:-ms-input-placeholder { /* Internet Explorer 10+ */ 
        font-size: 16px;
        color: #999;
    }
    .search_btn{
        font-size: 26px;
        padding-right: 16px;
        color: #f77e51;
    }
    .icon_arrow{
        display: inline-block;
        width: 10px;
        height: 10px;
        border-right: 1px solid #f77e51;
        border-bottom: 1px solid #f77e51;
        transform: rotate(-45deg);
    }
    /*商家列表*/
    .store_list{
        padding: 10px 10px 0 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .store{
        display: block;
        width: 46%;
        margin-bottom: 10px;
        flex-grow: 1;
        box-sizing: border-box;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0px 2px 6px 0px #999;
    }
    .store:nth-child(2n-1){
        margin-right: 5px;
    }
    .store:nth-child(2n){
        margin-left: 5px;
    }
    .store_img{
        font-size: 0;}
    .store_img>.img{
        width: 100%;
        height: 0;
        padding: 29% 0;
        background-position: center center;
        background-size: 100%;
    }
    .store_name{
        display: flex;
        align-items:center;
        justify-content: space-between;
        padding: 10px 7.5px;
    }
    .tag_box{
        display: flex;
        justify-content: space-between;
        padding: 10px 6px 10px 6px;
    }
    .tag_box>div{
        width: 50%;
    }
    .s_name{
        font-size: 14px;
        color: #555;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .s_price{
        font-size: 0;
        color: #f77e51;
        font-weight: 600;
        display: flex;
        flex-direction: nowrap;
    }
    .s_price>span{
        font-size: 12px;
    }
    .s_tag{
        flex: 1;
        font-size: 8px;
        color: #f77e51;
        display: flex;
        justify-content: flex-start;
    }
    .s_tag>span{
        display: inline-block;
        text-align: center;
        width: 20px;
        height: 10px;
        margin-right: 2px;
        line-height: 10px;
        vertical-align: middle;
        border: 1px solid #f77e51;
        border-radius: 2px;
    }
    .store_add{
        flex: 1;
        display: flex;
        padding-right: 2px;
        font-size: 10px;
        color: #a7a7a7;
    }
    .distance{
        font-size: 0;
        flex: 1;
        display: flex;
        flex-direction: nowrap;
    }
    .distance>span{
        font-size: 10px;
    }
    .store_add>.add{
        flex: 1;
        margin-left: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .toLoad{
        text-align: center;
        font-size: 14px;
        color: #999;
        margin-bottom: 10px;
    }
</style>
