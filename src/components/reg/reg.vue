+---<template>
    <div id="reg">
        <div class="logo">
            <div class="logo_m">
                <h1>M</h1>
            </div>
        </div>
        <div class="form">
            <div class="user">
                <span>账号：</span>
                <input placeholder="请输入账号" @input='regUsername()' v-model='user.username' type="text">
            </div>
            <p class="tips" v-show='tipsState.usernameTips'>仅支持8-12位字母、数字、下划线！</p>
            <div class="user">
                <span>密码：</span>
                <input placeholder="请输入密码" @input='regPassword()' v-model='user.password' type="password">
            </div>
            <p class="tips" v-show='tipsState.passwordTips'>仅支持8-20位字母、数字、下划线！</p>
            <div class="user">
                <span>确认密码：</span>
                <input placeholder="请确认密码" @input='regPassword2()' v-model='user.password2' type="password">
            </div>
            <p class="tips" v-show='tipsState.password2Tips'>两次输入不一致！</p>
            <div class="user">
                <span>手机号：</span>
                <input placeholder="请输入手机号码" @input='regPhone()' v-model='user.phone' type="text">
            </div>
            <p class="tips" v-show='tipsState.phoneTips'>仅支持中国大陆11位手机号!</p>
            <div class="user">
                <span>邮箱：</span>
                <input placeholder="请输入邮箱" @input='regEmail()' v-model='user.email' type="text">
            </div>
            <p class="tips" v-show='tipsState.emailTips'>请输入正确的邮箱格式!</p>
            <router-link to='/reg'>
                <button class="reg_btn" @click='toggleSubmit()'>注册</button>
            </router-link>
            <router-link to='/'>
                <button class="reg_btn toLogin">返回登录</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import axios from "../../lib/axios";
    import router from "../../router/index.js";
 	export default {
 		name: 'reg',
 		data(){
 			return {
 				user: {
	 				username: '',
	                password: '',
	                password2: '',
	                phone: '',
                    email: ''
 				},
                //提示语状态，是否显示
 				tipsState: {
 					usernameTips: false,
 					passwordTips: false,
 					password2Tips: false,
 					phoneTips: false,
                    emailTips: false
 				},
                //各项注册信息是否通过正则
 				toRegObj: {
 					user: false,
 					pwd: false,
 					pwd2: false,
 					phone: false,
                    email: false
 				}
 			}
 		},
        methods: {
            //正则-用户名
        	regUsername(){
        		const reg = /^[a-zA-Z0-9_]{8,12}$/;
        		if(reg.test(this.user.username)){
        			this.tipsState.usernameTips = false;
        			this.toRegObj.user = true;
        			return
        		}
        		this.tipsState.usernameTips = true;
        		this.toRegObj.user = false;
        	},
            //正则密码
        	regPassword(){
        		const reg = /^[a-zA-Z0-9_]{8,20}$/;
        		if(reg.test(this.user.password)){
        			this.tipsState.passwordTips = false;
        			this.toRegObj.pwd = true;
        			return
        		}
        		this.tipsState.passwordTips = true;
        		this.toRegObj.pwd = false;
        	},
        	regPassword2(){
        		if(this.user.password2 === this.user.password){
        			this.tipsState.password2Tips = false;
        			this.toRegObj.pwd2 = true;
        			return
        		}
        		this.tipsState.password2Tips= true;
        		this.toRegObj.pwd2 = false;
        	},
            //正则-手机号
            regPhone(){
                const reg = /^[1]{1}[3,5,7,8,9]{1}[0-9]{9}$/;
                if(reg.test(this.user.phone)){
                    this.tipsState.phoneTips = false;
                    this.toRegObj.phone = true;
                    return
                }
                this.tipsState.phoneTips = true;
                this.toRegObj.phone = false;
            },
            //正则-邮箱
            regEmail(){
                const reg = /^[0-9a-zA-Z_]+@{1}[0-9a-zA-Z_]+\.{1}[a-zA-Z]{2,3}$/;
                if(reg.test(this.user.email)){
                    this.tipsState.emailTips = false;
                    this.toRegObj.email = true;
                    return
                }
                this.tipsState.emailTips = true;
                this.toRegObj.email = false;
            },
            //触发注册提交，如toRegObj中有至少一项false则提示用户信息未完善，全部为true则调用toReg函数注册
            toggleSubmit(){
            	const obj = Object.keys(this.toRegObj);
            	for(var i = 0; i < obj.length; i++){
            		if(this.toRegObj[obj[i]] === false){
                        alert('信息还没填完哦')
            			return;
            		}
            	}
                this.toReg(this.user.username, this.user.password, this.user.phone, this.user.email);
            },
            //注册
            async toReg(username, password, phone, email){
                const { data } = await axios.post("/users/add", {
                    "username": username,
                    "password": password,
                    "phone": phone,
                    "email": email
                })
                if(data.code != 0){
                    alert(data.message)
                }else{
                    alert('注册成功，即将跳转登录页面！')
                    router.push('/')
                }
            }

        }
 	}
</script>

<style scoped>
    #reg{
        padding-top: 40px;
    }
    .logo{
        text-align: center;
        margin-bottom: 20px;
    }
    .form{
        text-align: center;
    }
    .logo_m{
        width: 100px;
        height: 100px;
        line-height: 100px;
        background-color: #f77e51;
        border-radius: 50%;
        margin: 0 auto;
    }
    .logo_m>h1{
        font-size: 80px;
        font-family: "Times New Roman", Times, serif;
        text-align: center;
        color: #fff;
    }
    .app_name{
        font-size: 30px;
        color: #f77e51;
    }
    .user{
        width: 250px;
        height: 40px;
        margin: 0 auto;
        text-align: right;
        line-height: 40px;
    }
    .user>input{
        width: 160px;
        height: 30px;
        padding: 0 10px;
        outline: none;
        border: 1px solid #f77e51;
        border-radius: 4px;
    }
    .reg_btn{
        display: block;
        width: 250px;
        height: 40px;
        font-size: 14px;
        border-radius: 4px;
        margin: 10px auto 10px;
        border: none;
        outline: none;
        background-color: #f77e51;
        color: #fff;
    }
    .toLogin{
    	background-color: #fff;
    	border: 1px solid #f77e51;
    	color: #f77e51;
    }
    .tips{
    	color: red;
    }
</style>
