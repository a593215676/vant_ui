<template>
    <div>
        <div>
            <van-nav-bar
                    title="商品分类"
            />
        </div>
      <div style="display: flex">
          <div>
              <div v-for="(item,index) in goods" :class="actived === index ? 'actived':'noactived'" @click="toOthers(index)">
                  {{item.mallCategoryName}}
              </div>
          </div>
          <div style="width: 80%;margin-bottom: 50px">
              <van-tabs v-model="active" @click="contents">
                  <van-tab v-for="(item,index) in list" :title="item.mallSubName">
                      <div v-for="(item,index) in dataList" style="display: flex"  @click="todetails(item.id)">
                          <div style="flex: 0.5"><img :src="item.image_path" alt="" style="width: 100%;height: 100%;"></div>
                          <div style="flex: 1">
                              <p style="height: 50px;line-height: 50px">{{item.name}}</p>
                              <p  style="height: 50px;line-height: 50px"><span style="display: inline-block;margin-right: 20px">￥{{item.present_price}}</span><span style="text-decoration: line-through;display: inline-block">{{item.orl_price}}</span></p>
                          </div>
                      </div>
                  </van-tab>
              </van-tabs>
          </div>
      </div>
    </div>

</template>

<script>
    export default {
        name: "Order",
        components: {},
        props: {},
        data() {
            return {
                active: 0,
                actived: 0,
                goods:[],
                list:[],
                dataList:[],
                startList:[]
            }
        },
        methods: {
            onClickLeft(){
                this.$router.back(-1)
            },
           toOthers(index){
               this.actived = index
               this.active = 0
               this.list = this.goods[index].bxMallSubDto
               this.startList = this.list[0].mallSubId
               this.$axios.req("api/v1/classification?mallSubId="+this.startList)
                   .then(res=>{
                       this.dataList = res.data.dataList;
                   }).catch(err=>{
                   console.log(err);
               })
           },
            contents(index,title){
                const  val= this.list[index].mallSubId
                this.$axios.req("api/v1/classification?mallSubId="+val)
                    .then(res=>{
                        this.dataList = res.data.dataList;
                    }).catch(err=>{
                    console.log(err);
                })
            },
            todetails(val){
                console.log(val);
                this.$router.push({
                    path: '/details',
                    query: {
                        id: val
                    }
                })
            }
        },
        mounted() {
            this.$axios.req("api/v1/recommend")
                .then(res =>{
                    this.goods =res.data.data.category
                    if(this.$route.query.id){
                        this.actived = this.$route.query.id
                        this.list = this.goods[this.$route.query.id].bxMallSubDto
                        this.startList = this.list[0].mallSubId
                        this.$axios.req("api/v1/classification?mallSubId="+this.startList)
                            .then(res=>{
                                this.dataList = res.data.dataList;
                            }).catch(err=>{
                            console.log(err);
                        })
                    }else {
                        this.list = this.goods[0].bxMallSubDto
                        this.startList = this.list[0].mallSubId
                        this.$axios.req("api/v1/classification?mallSubId="+this.startList)
                            .then(res=>{
                                this.dataList = res.data.dataList;
                            }).catch(err=>{
                            console.log(err);
                        })
                    }
                }).catch(err=>{
                console.log(err);
            })
        },
        created() {

        },
        filters: {},
        computed: {

        },
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
    .actived{
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        padding: 5px;
        color: red;
        border-bottom: 2px solid red;
    }
    .noactived{
        height: 50px;
        padding: 5px;
        line-height: 50px;
        font-size: 15px;
    }
</style>