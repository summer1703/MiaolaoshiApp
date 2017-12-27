<template>
    <div id="login">
        <div class="logo">
            <div class="logo_m">
                <h1>M</h1>
            </div>
            <h1 class="app_name">喵老师</h1>
        </div>
        <div class="form">
            <div class="user">
                <span>账号</span>
                <input placeholder="请输入账号" v-model='username' type="text">
            </div>
            <div class="user">
                <span>密码</span>
                <input placeholder="请输入密码" v-model='password' type="password">
            </div>
            <button class="login_btn" @click='toggleSubmit()'>登录</button>
            <router-link to='/reg'>
                <button class="reg_btn">免费注册</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import axios from "../../lib/axios";
    import router from "../../router/index.js";
 	export default {
 		name: 'login',
 		data(){
 			return {
 				username: '',
                password: ''
 			}
 		},
        methods: {
            //触发登录提交，用户名&密码都不为空调用toFindUser方法登录，否则提示用户未完全输入
            toggleSubmit(){
                console.log(123123123)
                if(this.username === '' || this.password === ''){
                    alert('是不是忘记输账号或密码了？');
                    return;
                }
                this.toFindUser(this.username, this.password);
            },
            //登录
            async toFindUser(username, password, phone, email){
                const { data } = await axios.post("/users/login", {
                    username,
                    password
                })
                if(data.code != 0){
                    alert(data.message)
                }else{
                    //localStorage.token = data.token; 这个是打算做jwt的，还没弄好，无视就行了
                    alert('登陆成功！')
                    router.push('/info')
                }
            }
        }
 	}
</script>

<style scoped>
    #login{
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
        width: 240px;
        height: 40px;
        margin: 0 auto;
        background-color: #fff;
        line-height: 40px;
        margin-bottom: 10px;
        border-radius: 4px;
    }
    .user>input{
        width: 160px;
        padding: 0 10px;
        outline: none;
        border: none;
    }
    button{
        display: block;
        width: 240px;
        height: 40px;
        font-size: 14px;
        border-radius: 4px;
        margin: 0 auto 10px;
        border: none;
        outline: none;
    }
    .login_btn{
        background-color: #f77e51;
        color: #fff;
    }
    .reg_btn{
        background-color: #fff;
        border: 1px solid #f77e51;
        color: #f77e51;
    }
</style>
