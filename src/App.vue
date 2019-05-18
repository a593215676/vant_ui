<template>
  <div id="app">
    <div id="nav">
       <router-view></router-view>
        <Footer v-if="$route.meta.isShow"></Footer>
    </div>
  </div>
</template>
<script>
    import Footer from './views/Footer'
    export default {
        name: "App",
        components: {
            Footer
        },
        props: {},
        data() {
            return {}
        },
        methods: {},
        mounted() {
            this.$store.dispatch("getCity");
        },
        created() {

        },
        filters: {},
        computed: {

        },
        watch: {

        },
        directives: {}
    }
</script>
<style lang="scss">
    *{
        box-sizing: border-box;
    }
    #nav{
        width: 100%;

    }
    #app{
        width: 100%;
    }
</style>
