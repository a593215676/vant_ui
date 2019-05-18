<template>
    <div v-if="details" style="position: relative" >
        <div style="position: fixed;z-index: 999;top: 0;left: 0;width: 100%">
            <van-nav-bar
                    left-text="返回"
                    title="商品详情"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div style="padding: 20px;margin-top: 50px">
            <van-swipe :autoplay="3000" indicator-color="white" >
                <van-swipe-item @click="onShow"><img :src="details.image" alt="" style="width: 100%;height: 100%;"></van-swipe-item>
                <van-swipe-item @click="onShow"><img :src="details.image_path" alt="" style="width: 100%;height: 100%;"></van-swipe-item>
            </van-swipe>
            <van-image-preview
                    v-model="show"
                    :images="[details.image,details.image_path]"
            ></van-image-preview>
            <div style="margin-top: 20px"></div>
            <div style="font-size: 20px;">{{details.name}}</div>
            <div style="margin-top: 20px"></div>
            <div style="font-size: 15px;color: #FF4C4C">￥{{details.present_price}}</div>
            <div style="margin-top: 20px"></div>
            <div style="display: flex;font-size: 15px;height: 20px;line-height: 20px;justify-content: space-between">
                <div>运费：{{details.__v}}</div>
                <div>剩余：{{details.amount}}</div>
                <div @click="change_" >
                    {{collection ? "取消收藏:" : "点击收藏:"}}
                    <van-icon name="like" :class="collection ? 'isShow':'noShow'"/>
                </div>
            </div>
            <div style="margin-top: 20px"></div>
            <div style="display: flex;justify-content: space-between;font-size: 15px">
               <div style=";height: 20px;line-height: 20px"> <van-icon name="shop-collect-o"/>有赞的店 <van-tag type="danger">官方</van-tag></div>
                <div>进入店铺 ></div>
            </div>
            <div style="margin-top: 20px"></div>
            <van-tabs style="margin-bottom: 50px" >
                <van-tab title="商品详情"><div v-html="details.detail"></div></van-tab>
                <van-tab title="商品评论">
                    <div v-if="comment.length ===0 " style="text-align: center;font-size: 20px;height:550px;line-height: 50px">该商品暂无评论</div>
                    <div v-else></div>
                </van-tab>
            </van-tabs>
            <van-goods-action style="z-index: 999">
                <van-goods-action-mini-btn
                        icon="chat-o"
                        text="客服"
                        @click="onClickMiniBtn"
                />
                <van-goods-action-mini-btn
                        icon="cart-o"
                        text="购物车"
                        :info="num"
                        @click="onClickMiniBtn"
                />
                <van-goods-action-big-btn
                        text="加入购物车"
                        @click="onClickBigBtn"
                />
                <van-goods-action-big-btn
                        primary
                        text="立即购买"
                        @click="onClickBigBtn"
                />
            </van-goods-action>
        </div>

    </div>

</template>

<script>
    import axios from 'axios'
    export default {
        name: "Details",
        components: {},
        props: {

        },
        data() {
            return {
                details:"",
                comment:'',
                collection:false,
                show: false,
                num:''
            }
        },
        methods: {
            onClickLeft(){
                this.$router.back(-1)
            },
            change_(){
                let goods =this.details
                if(localStorage.username){
                    if(!this.collection){
                        this.$axios.req('api/v1/collection',goods)
                            .then(res =>{
                                console.log(res);
                                if (res.data.code === 200) {
                                    this.$toast.success(
                                        '收藏成功'
                                    )

                                }
                            }).catch(err=>{
                            console.log(err);
                        })
                    }else {
                        this.$axios.req('api/v1/cancelCollection',{id:goods.id})
                            .then(res =>{
                                console.log(res);
                                if (res.data.code === 200) {
                                    this.$toast.success(
                                        '已取消收藏'
                                    )

                                }
                            }).catch(err=>{
                            console.log(err);
                        })
                    }

                    this.collection = !this.collection
                }else{
                    this.$router.push('./login')
                }

            },
            onClickMiniBtn() {

            },
            onClickBigBtn() {
                if(localStorage.username){
                    this.$axios.req('api/v1/addShop',{
                        id:this.details.id
                    }).then(res=>{
                        if(res.data.code ===200) {
                            this.$toast.success(
                                '已添加购物车'
                            )
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }
                axios.post(`api/v1/getCard`)
                    .then(res=>{
                        if(res.data.shopList.length>0){
                            this.num = res.data.shopList.length
                        }
                        // console.log(res.data.shopList);
                    }).catch(err=>{
                    console.log(err);
                })
            },
            onShow(){
                this.show = true
            }
        },
        mounted() {
            this.$axios.req("api/v1/goods/one?id="+this.$route.query.id)
                .then(res =>{
                    this.details =res.data.goods.goodsOne
                    if(localStorage.username){
                        this.$axios.req('api/v1/isCollection',{
                            id:this.details.id
                        }).then(res =>{
                            if(res.data.isCollection === 0){
                                this.collection =false
                            }else {
                                this.collection = true
                            }
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                    this.comment =res.data.goods.comment
                    // this.details.collection = false
                    // console.log(this.details);
                }).catch(err=>{
                console.log(err);
            })
            axios.post(`api/v1/getCard`)
                .then(res=>{
                    if(res.data.shopList.length>0){
                        this.num = res.data.shopList.length
                    }
                    // console.log(res.data.shopList);
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
 .isShow{
     color: red;
 }
</style>