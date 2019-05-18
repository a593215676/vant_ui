<template>
    <div style="position: relative">
        <div style="position: fixed;z-index: 999;top: 0;left: 0;width: 100%">
            <van-nav-bar
                    left-text="返回"
                    title="我的收藏"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div v-if="list.length === 0" style="margin-top: 50px">
            <div style="text-align: center;font-size: 20px;color: red">暂无收藏信息</div>
        </div>
        <div v-else v-for="(item,index) in list" style="display: flex;margin-top: 50px"  @click="todetails(item.cid)">
            <div style="flex: 0.5"><img :src="item.image_path" alt="" style="width: 100%;height: 100%;"></div>
            <div style="flex: 1">
                <p style="height: 50px;line-height: 50px">{{item.name}}</p>
                <p  style="height: 50px;line-height: 50px"><span style="display: inline-block;margin-right: 20px">￥{{item.present_price}}</span></p>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "getCollection",
        components: {},
        props: {},
        data() {
            return {
                list:[]
            }
        },
        methods: {
            onClickLeft(){
                this.$router.back(-1)
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
            this.$axios.req('api/v1/collection/list')
                .then(res=>{
                    this.list = res.data.data.list
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
    .top_{
        position: fixed;

    }
</style>