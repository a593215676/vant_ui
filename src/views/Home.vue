<template>
    <div style="background-color: #eeeeee">
        <form action="/" style="display: flex">
            <div style="line-height: 54px;height: 54px;width: 50px;text-align: center;background-color: white">城市</div>
            <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    @input="onSearch(value)"
                    @focus="flag = 2"
                    style="flex: 2;background-color: white"
            >
                <div slot="action" @click="back">{{flag === 1 ? '':'取消'}}</div>
            </van-search>
         </form>
        <div v-if="flag === 2" style="margin-bottom: 50px">
            <div v-if="value.length ===0" >
                <div  style="font-size: 15px;height: 30px;line-height: 30px;text-align: center">暂无符合搜索的商品</div>
            </div>
            <div v-else v-for="(item,index) in serach" @click="toCart(item)" style="font-size: 15px;height: 30px;line-height: 30px">
                <div v-html="item.name"></div>
            </div>
        </div>
       <div v-else>
           <div>
               <van-swipe indicator-color="yellow" :autoplay="3000" :duration="500" :loop="true">
                   <van-swipe-item  v-for="(item, index) in conts.slides" :key="index">
                       <img :src="item.image" alt="" style="max-width: 100%" />
                   </van-swipe-item>
               </van-swipe>
           </div>
           <div style="display: flex;padding: 15px;">
               <div style="width: 20%;background-color: white;padding-bottom: 5px" v-for="(item,index) in conts.category" @click="toOrder(index)">
                   <div style="padding: 10px;border-radius: 5px"><img :src="item.image" alt="" style="width: 100%;height: 100%"></div>
                   <p style="text-align: center">{{item.mallCategoryName}}</p>
               </div>
           </div>
           <div>
               <img :src="image_address" alt="" style="width: 100%;height: 100%">
           </div>
           <div style="padding: 10px 0;margin: 20px auto;background-color: white">
               <p style="display: block;margin-left: 10px">商品推荐</p>
               <div style="display: flex;padding: 15px 0;overflow: hidden">
                   <div style="background-color: white;padding-bottom: 5px;width: 33.3%;border: 1px solid #eeeeee" v-for="(item,index) in conts.recommend">
                       <div style="padding: 10px;border-radius: 5px;height: 166px" @click="toDetails(item)"><img :src="item.image" alt="" style="width: 100%;"></div>
                       <p style="padding: 10px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.goodsName}}</p>
                       <p style="padding: 10px"><span>￥{{item.mallPrice}}</span><span style="text-decoration:line-through;margin-left:10px">￥{{item.price}}</span></p>
                       <div style="display: flex;padding: 10px 5px">
                           <van-goods-action-mini-btn
                                   icon="cart-o"
                                   style="width:30px;height: 35px;line-height: 30px;background-color: #FEC93F;border-bottom-left-radius: 5px;border-top-left-radius: 5px;margin: auto"
                                   @click="toCart()"
                           />
                           <van-goods-action-big-btn
                                   text="商品详情"
                                   style="height: 35px;line-height: 30px;background-color: #F74A3A;font-size: 12px;border-bottom-right-radius: 5px;border-top-right-radius: 5px"
                                   @click="toDetails(item)"
                           />
                       </div>
                   </div>
               </div>
           </div>
           <div>
               <div style="margin-bottom: 20px" v-if="conts.floorName">
                   <h1 style="height: 40px;line-height: 40px;text-align: center;font-size: 20px;background-color: #eeeeee;color: red" ><span style="color: white;display:inline-block;width: 40px;height:40px;border-radius: 50%;background-color: red">1F</span>{{conts.floorName.floor1}}</h1>
                   <div v-for="(item1,index1) in conts.floor1" style="margin-top: 10px">
                       <div @click="toDetails(item1)" v-if="index1 ===2||3 " style="width: 50%;float: left;border: 1px solid #eeeeee;box-sizing: border-box"><img :src="item1.image" alt="" style="width: 100%;height: 100%;"></div>
                       <div @click="toDetails(item1)" v-else style="border: 1px solid #eeeeee;float: right;"><img :src="item1.image" alt="" style="width: 100%;height: 100%;"></div>
                   </div>
                   <div style="clear: both"></div>
               </div>
               <div style="margin-bottom: 20px" v-if="conts.floorName">
                   <h1 style="height: 40px;line-height: 40px;text-align: center;font-size: 20px;background-color: #eeeeee;color: red"><span style="color: white;display:inline-block;width: 40px;height:40px;border-radius: 50%;background-color: red">2F</span>{{conts.floorName.floor2}}</h1>
                   <div v-for="(item1,index1) in conts.floor2" style="margin-top: 10px">
                       <div @click="toDetails(item1)" v-if="index1 ===2||3 " style="width: 50%;float: left;border: 1px solid #eeeeee;box-sizing: border-box"><img :src="item1.image" alt="" style="width: 100%;height: 100%;"></div>
                       <div @click="toDetails(item1)" v-else style="border: 1px solid #eeeeee;float: right;"><img :src="item1.image" alt="" style="width: 100%;height: 100%;"></div>
                   </div>
                   <div style="clear: both"></div>
               </div>
               <div v-if="conts.floorName">
                   <h1 style="height: 40px;line-height: 40px;text-align: center;font-size: 20px;background-color: #eeeeee;color: red"><span style=";display:inline-block;width: 40px;height:40px;border-radius: 50%;background-color: red;color: white">3F</span>{{conts.floorName.floor3}}</h1>
                   <div v-for="(item1,index1) in conts.floor3" style="margin-top: 10px">
                       <div @click="toDetails(item1)" v-if="index1 ===2||3 " style="width: 50%;float: left;border: 1px solid #eeeeee;box-sizing: border-box"><img :src="item1.image" alt="" style="width: 100%;height: 100%;"></div>
                       <div @click="toDetails(item1)" v-else style="border: 1px solid #eeeeee;float: right;"><img :src="item1.image" alt="" style="width: 100%;height: 100%;"></div>
                   </div>
                   <div style="clear: both"></div>
               </div>
           </div>
           <div style="">
               <h1 style="height: 50px;line-height: 50px;text-align: center;font-size: 20px;background-color: #eeeeee">热销商品</h1>
               <div v-for="(item,index) in conts.hotGoods" style="width: 50%;display:inline-block;text-align: center;border: 1px solid #eeeeee;box-sizing: border-box">
                   <div style="padding: 10px;border-radius: 5px" @click="toDetails(item)"><img :src="item.image" alt="" style="width: 100%;height: 100%"></div>
                   <p style="padding: 10px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.name}}</p>
                   <p style="padding: 10px"><span>￥{{item.mallPrice}}</span><span style="text-decoration:line-through;margin-left:10px">￥{{item.price}}</span></p>
               </div>
           </div>
           <div style="height: 60px;width: 100%"></div>
       </div>

    </div>
</template>

<script>

    export default {
        name: "Home",
        components: {},
        props: {},
        data() {
            return {
                value:'',
                serach:[],
                flag:1,
                num1:0,
                value2:' ',
                floor_:['1F','2F','3F'],
                image_address:'http://images.baixingliangfan.cn/advertesPicture/20180404/20180404085441_850.gif'
            }
        },
        methods: {
            onSearch(val){
                    if(val){
                        this.$axios.req("api/v1/search",{
                            value:val
                        }).then(res =>{
                            this.serach = res.data.data.list
                            this.serach =this.serach.filter((item,index)=>{
                                item.name = item.name.replace(this.value,"<span style='color: red'>"+this.value+"</span>")
                                return true
                            })
                        }).catch(err=>{
                            console.log(err);
                        })

                }

            },
            back(){
              this.value = ''
              this.flag = 1
            },
            onCancel(){

            },
            toOrder(val){
                this.$router.push({
                    path: '/order',
                    query: {
                        id: val
                    }
                })
            },
            toCart(item){
                item = item.id
                this.$router.push({
                    path: '/details',
                    query: {
                        id: item
                    }
                })
            },
            toDetails(item){
                item = item.goodsId
                this.$router.push({
                    path: '/details',
                    query: {
                        id: item
                    }
                })
            }
        },
        mounted() {

        },
        created() {

        },
        filters: {},
        computed: {
            conts(){
                console.log(this.$store.state.citys);
                return this.$store.state.citys
            }
        },
        watch: {
        },
        directives: {}
    }
</script>

<style scoped lang="scss">

</style>