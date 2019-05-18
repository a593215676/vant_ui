<template>
    <div>
        <van-tabbar v-model="active" active-color="red">
            <van-tabbar-item icon="home-o" @click="home">商城</van-tabbar-item>
            <van-tabbar-item icon="wap-nav" @click="classif">分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart" @click="shopping">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" @click="about">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    export default {
        name: "Bottom",
        components: {},
        props: {},
        data() {
            return {
                active: 0
            };
        },
        methods: {
            home() {
                this.$router.push("/");
            },
            classif() {
                this.$router.push("/order")
            },
            shopping() {
                this.$router.push("/cart")
            },
            about() {
                this.$router.push("/mypage")
            }
        },
        mounted() {

        },
        created() {},
        filters: {},
        computed: {},
        watch: {


        },
        directives: {}
    };
</script>

<style scoped lang="scss">
</style>
