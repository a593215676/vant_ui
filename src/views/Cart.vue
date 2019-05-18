<template>
    <div>
        <div>
            <van-nav-bar
                    title="我的购物车"
            />
        </div>
        <div style="height: 50px;line-height: 50px;display: flex" @click="checkeall(checked)">
            <div><input type="checkbox" v-model="checked"></div>
            <div>{{checked ? '取消全选':'全选'}}</div>
        </div>
        <div v-for="(item,index) in shopList" style="display: flex" >
            <div style="line-height:131px"><input type="checkbox" v-model="item.checkedbox" :key="item.cid" @click="todetails(item.checkedbox)"></div>
            <div style="flex: 0.5"><img :src="item.image_path" alt="" style="width: 100%;height: 100%;"></div>
            <div style="flex: 1">
                <p style="height: 50px;line-height: 50px">{{item.name}}</p>
                <p  style="height: 50px;line-height: 50px"><span style="display: inline-block;margin-right: 20px">￥{{item.present_price}}</span></p>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Cart",
        components: {},
        props: {},
        data() {
            return {
                shopList:[],
                list:[],
                checked:false,
                num:0
            }
        },
        methods: {
            checkeall(val){
                console.log(val);
                this.shopList =this.list.filter(item=>{
                    item.checkedbox = !val
                    return true
                })
                if(!val){
                    this.num = this.shopList.length
                }else {
                    this.num = 0
                }
            },
            todetails(val){
                console.log(this.checked);
                if(val){
                    this.num--
                }else {
                    this.num++
                }
                console.log(this.num);
                if(this.num === this.shopList.length){
                    this.checked = true
                }else {
                    this.checked = false
                }
            }
        },
        mounted() {
            axios.post(`api/v1/getCard`)
                .then(res=>{
                    this.shopList = res.data.shopList
                    this.shopList = this.list =this.shopList.filter(item=>{
                        item.checkedbox = false
                        return true
                    })
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

</style>