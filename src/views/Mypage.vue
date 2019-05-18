<template>
    <div>
        <van-row>
            <van-col span="24" class="top">会员中心</van-col>
        </van-row>
        <!---->
        <van-row class="bo-top">
            <van-col span="7">&nbsp;</van-col>
            <van-col span="10" class="bl">
                <div class="portrait">
                    <van-icon size="60px" name="user-circle-o" />
                </div>
                <div class="name" >
                    <div v-if="local">
                        <div>你好：{{username}}</div>
                        <div  @click="unlogin">退出登录</div>
                    </div>
                    <div v-else  @click="login">请登录/注册</div>
                </div>
            </van-col>

        </van-row>
        <!---->
        <van-row>
            <van-col span="24" class="bi">
                <div class="va">
                    <van-icon name="pending-payment" size="30px" />
                    <span>待付款</span>
                </div>
                <div class="va">
                    <van-icon name="shop-o" size="30px" />
                    <span>待发货</span>
                </div>
                <div class="va">
                    <van-icon name="logistics" size="30px" />
                    <span>待收货</span>
                </div>
                <div class="va">
                    <van-icon name="description" size="30px" />
                    <span>评价</span>
                </div>
                <div class="va">
                    <van-icon name="points" size="30px" />
                    <span>已完成</span>
                </div>
            </van-col>
        </van-row>
        <!---->
        <van-row>
            <van-col span="24" class="allorders">
                <van-cell title="全部订单" icon="records" value=">" />
            </van-col>
        </van-row>
        <!---->
        <div class="df">
            <div class="df1" @click="togetCollection">
                <van-cell title="我的收藏" icon="points" value=">" />
            </div>
            <div class="df1">
                <van-cell title="地址管理" icon="after-sale" value=">" />
            </div>
            <div class="df2">
                <van-cell title="最近浏览" icon="point-gift-o" value=">" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "About",
        components: {},
        props: {},
        data() {
            return {
                local:true,
                username:localStorage.username
            };
        },
        methods: {
            login() {
                this.$router.push("/login");
            },
            unlogin(){
                this.local = false;
                localStorage.setItem('username','')
            },
            togetCollection(){
                if(localStorage.username){
                    this.$router.push("/getCollection")
                }else {
                    this.$toast.fail(
                        '请登录'
                    )
                }

            }
        },
        mounted() {
            if(localStorage.username){
                this.local = true
            }else{
                this.local =false
            }
        },
        created() {},
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    };
</script>

<style scoped lang="scss">
    .top {
        text-align: center;
        height: 40px;
        font-size: 14px;
        border-bottom: #eeeeee 1px solid;
        line-height: 40px;
    }
    .bo-top {
        background-color: #e30c7b;
        /*height: 200px;*/
    }
    .bl {
        padding: 50px 0 !important;
    }
    .portrait {
        width: 100%;
        color: white;
        text-align: center;
        /*border-radius: 50%;*/
        /*background-color: #00b4ce;*/
    }
    .name {
        text-align: center;
        color: white;
        font-size: 20px;
    }
    .bi {
        text-align: center;
        font-size: 14px;
        border-bottom: #eeeeee 1px solid;
        /*line-height: 40px;*/
        padding: 10px 0;
        display: flex;
    }
    .va {
        float: left;
        flex: 1;
        padding: 0 5px;
        /*flex-direction: column;*/
    }
    .va span {
        display: block;
        font-size: 12px;
    }
    .allorders {
        /*height:30px;*/
        /*line-height: 10px;*/
        /*display: flex;*/
        /*align-items: center;*/
        /*width:100%;*/
        /*padding: 10px;*/
        border-bottom: #eeeeee 1px solid;
    }
    .allorders div {
        /*vertical-align: middle;*/
        float: right;
    }
    .df {
        margin-top: 20px;
        /*padding: 0 0 10px 10px ;*/
        border: #eeeeee 1px solid;
    }
    .df1 {
        display: flex;
        align-items: center;
        border-bottom: #eeeeee 1px solid;
        /*padding: 10px 0;*/
    }
    .df2 {
        display: flex;
        align-items: center;
        /*padding: 10px 0;*/
    }
</style>
