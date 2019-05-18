<template>
    <div style="background-color: #eeeeee;height: 100%">
        <div>
            <van-nav-bar
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div style="padding: 0 20px;margin: 50px auto">
            <div style="background-color: white">
                <h1 style="font-size: 20px;padding: 10px">登 录 / 注 册</h1>
                <div style="margin-top: 20px"></div>
                <van-cell-group>
                    <van-field
                            v-model="username"
                            clearable
                            label="用户名"
                            placeholder="Username"
                    />
                    <div style="margin-top: 20px"></div>
                    <van-field
                            v-model="password"
                            type="password"
                            label="密码"
                            placeholder="Password"

                    />
                    <div style="margin-top: 20px"></div>
                    <van-field
                            v-model="phone"
                            label="手机号"
                            placeholder="仅注册需要"
                    />
                    <div style="margin-top: 20px"></div>
                    <van-field
                            v-model="sms"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="仅注册需要"
                    >
                        <div style="margin-top: 20px"></div>
                        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                    </van-field>
                    <div style="margin-top: 20px"></div>
                   <div style="display: flex;justify-content: space-between">
                       <van-field
                               v-model="verify"
                               center
                               clearable
                               label="验证码"
                               placeholder="请输入验证码"
                       >
                       </van-field>
                       <van-col>
                           <span @click="replace" v-html="verify_img"></span>
                       </van-col>
                   </div>

                </van-cell-group>

                <div style="margin-top: 20px"></div>
                <div style="padding: 10px;">
                    <van-button type="danger" style="width: 80px" @click="tologin">登录</van-button>
                    <van-button type="danger" style="margin-left: 10px;width: 80px" @click="toregister">注册</van-button>
                </div>
            </div>
            <div style="margin-top: 20px"></div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Login",
        components: {},
        props: {},
        data() {
            return {
                username:'',
                password:'',
                phone:'',
                sms:'',
                verify:'',
                verify_img:''
            }
        },
        methods: {
            onClickLeft(){
                this.$router.back(-1)
            },
            tologin(){
                this.$axios.req('api/v1/login',{
                    'nickname':this.username,
                    'password':this.password,
                    'verify':this.verify,
                }).then(res =>{
                    let mess = res.data
                    if (mess.code === 200){
                        localStorage.setItem('username',this.username)
                        this.$router.push('./mypage')
                        this.$toast.success(
                            '登陆成功'
                        )
                    }else if(mess.code === -1){
                        this.$toast.fail(
                            '用户名或密码错误'
                        )
                    }
                }).catch(err =>{
                    console.log(err);
                })
            },
            toregister(){
                this.$axios.req('api/v1/register',{
                    'nickname':this.username,
                    'password':this.password,
                    'verify':this.verify,
                    'sms':this.sms
                }).then(res =>{
                    let mess = res.data
                    if (mess.code === 200){
                        localStorage.setItem('username',this.username)
                        this.$router.push('./mypage')
                        this.$toast.success(
                            '注册成功'
                        )
                    }
                }).catch(err =>{
                    console.log(err);
                })
            },
            replace(){
                this.$axios.req('api/v1/verify').then(res=>{
                    this.verify_img =res.data
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        mounted() {
            this.$axios.req('api/v1/verify').then(res=>{
               this.verify_img =res.data
            }).catch(err=>{
                console.log(err);
            })
        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
    .use_{
        width: 100%;
        height: 35px;
        line-height: 35px;
        border: none;
        padding: 10px;
    }
    .use_1{
        width: 125px;
        padding: 10px;
        height: 35px;
        line-height: 35px;
        border: none;
    }
</style>