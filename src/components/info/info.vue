<template>
    <div id="info">
		<router-view></router-view>
        <div class="footer">
            <div class="nav_bar">
                <router-link id='index' to='/info'>
                    <span class="nav_icon iconfont icon-shangdian"></span>
                    <span>首页</span>
                </router-link>
                <router-link id='order' to='/orderform'>
                    <span class="nav_icon iconfont icon-dingdan"></span>
                    <span>订单</span>
                </router-link>
                <router-link id='me' to='/me'>
                    <span class="nav_icon iconfont icon-wo-copy"></span>
                    <span>我</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
	import '../../iconfont/iconfont.css'
	import '../../iconfont/demo.css'
 
 	export default {
 		name: 'info',
 		data(){
 			return {
 				
 			}
 		}
 	}
</script>

<style scoped>
    .footer{
        width: 100%;
        height: 50px;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        z-index: 10;
    }
    .nav_bar{
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
    }
    .nav_bar>*{
        line-height: 1.2;
        display: flex;
        flex-direction: column;
        text-align: center;
        color: #a7a7a7;
    }
    .nav_bar span{
        font-size: 12px;
    }
    .nav_bar .nav_icon{
        font-size: 26px;
    }
</style>
