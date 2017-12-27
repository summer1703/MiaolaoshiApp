<template>
    <div id="app">
		<router-view></router-view>
    </div>
</template>

<script>
	import './iconfont/iconfont.css'
	import './iconfont/demo.css'
 
 	export default {
 		name: 'app',
 		data(){
 			return {
 				
 			}
 		}
 	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
		font-family: "微软雅黑";
	}
	a,a:link,a:visited,a:hover,a:active{
		text-decoration: none;
	}
	body{
		background-color: #e8e8e8;
		position: relative;
		padding-bottom: 50px;
	}
</style>
