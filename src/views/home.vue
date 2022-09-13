<template>
  <div class="home">
    <div class="box01"></div>
    <div class="box02">{{addr}}</div>
    <div class="box03"></div>
    <div class="box04">{{temperature | dataFormat('&#8451;')}}</div>
    <div class="box05"></div>
    <div class="box06">{{humidity | dataFormat('%')}}</div>
    <div class="box07">欢迎使用智慧药房</div>
    <div class="box08">Welcome To Intelligent Pharmacy</div>
    <div class="box09">苏州心药数字智慧医疗科技有限公司</div>
    <div class="box10">XinYao Digital Intelligent Healthcare Technology Co,Ltd</div>
    <div class="box11" @click="toSelfHelp('selfHelp')" ></div>
    <div class="box12" @click="toSelfHelp('pickupCode')"></div>
    <div class="box13">自助购药</div>
    <div class="box14">扫码取药</div>
    <div class="box15" @click="addClickIndex()"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "home",
    data(){
      return {
        clickIndex:0,
        timer:null
      }
    },
    computed:{
      ...mapGetters(['addr','temperature','humidity'])
    },
    filters: {
      dataFormat(msg, suffix='') {
        if('' == msg || null === msg || undefined === msg) return '';
        return `${msg}${suffix}`;
      }
    },
    async mounted(){
      //清空购物篮
      this.$store.dispatch("empty");
      if(this.api.mode == 3){
        // 退出维护模式
        try{
          await this.api.stop_maintenance_mode();
        }
        catch (e){
          console.error('退出维护模式失败',e);
        }
      }
      //还原状态
      this.api.mode = 1;
    },
    methods:{
      toSelfHelp(type){
        this.$router.push({name:'idcard',params:{type}});
      },
      //点击3下进入维护模式（未认证）
      toMode2(){
        this.api.mode = 2;
        this.$router.push('/idcard');
      },
      addClickIndex(){
        if(this.timer) clearTimeout(this.timer);
        this.clickIndex++;
        this.timer = setTimeout(()=>{
          this.clickIndex = 0;
        },5000);
        if(this.clickIndex>5) this.toMode2();
      }
    },
    async destroyed(){
      if(this.timer) clearTimeout(this.timer);
    }
  }
</script>

<style scoped>
  .home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    background: rgba(65, 187, 255, 1) url(../assets/back.png) 0 0 no-repeat;;
    background-size:100% auto;
  }

  .box01 {
    position: absolute;
    left: .32rem;
    top: .20rem;
    background: url(../assets/location.png) 0 0 no-repeat ;
    background-size:100% auto;
    width: .50rem;
    height: .50rem;
  }

  .box02 {
    position: absolute;
    left: .84rem;
    top: .20rem;
    height:.50rem;
    font-size:.36rem;
    font-family:PingFang-SC-Medium,PingFang-SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:.50rem;
  }
  .box03 {
    position: absolute;
    left: 15.96rem;
    top: .20rem;
    background: url(../assets/temperature.png) 0 0 no-repeat;
    background-size:100% auto;
    width: .50rem;
    height: .50rem;
  }
  .box04 {
    position: absolute;
    left: 16.40rem;
    top: .24rem;
    font-size:.36rem;
    font-family:HelveticaNeue;
    color:rgba(255,255,255,1);
    line-height:.43rem;
  }
  .box05 {
    position: absolute;
    left: 17.56rem;
    top: .20rem;
    background: url(../assets/humidity.png) 0 0 no-repeat;
    background-size:100% auto;
    width: .50rem;
    height: .50rem;
  }
  .box06 {
    position: absolute;
    left: 18.05rem;
    top: .24rem;
    font-size:.36rem;
    font-family:HelveticaNeue;
    color:rgba(255,255,255,1);
    line-height:.43rem;
  }
  .box07{
    position: absolute;
    text-align: center;
    top: 1.90rem;
    width:100%;
    height:1.12rem;
    font-size:.80rem;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:1.12rem;
    letter-spacing:8px;
  }
  .box08{
    position: absolute;
    text-align: center;
    top: 3.12rem;
    width:100%;
    height:.50rem;
    font-size:.36rem;
    font-family:PingFang-SC-Medium,PingFang-SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:.50rem;
    letter-spacing:8px;
  }
  .box09{
    position: absolute;
    left: .40rem;
    bottom: .68rem;
    height:.40rem;
    font-size:.28rem;
    font-family:PingFang-SC-Medium,PingFang-SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:.40rem;
    letter-spacing:1px;
  }
  .box10{
    position: absolute;
    left: .40rem;
    bottom: .30rem;
    height:.28rem;
    font-size:.20rem;
    font-family:PingFang-SC-Medium,PingFang-SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:.28rem;
    letter-spacing:1px;
  }
  .box11 {
    position: absolute;
    left: 5.20rem;
    top: 4.49rem;
    background: url(../assets/self_help.png) 0 0 no-repeat;
    background-size:100% auto;
    width: 2.80rem;
    height: 2.82rem;
  }
  .box12 {
    position: absolute;
    right: 5.20rem;
    top: 4.49rem;
    background: url(../assets/scan.png) 0 0 no-repeat;
    background-size:100% auto;
    width: 2.80rem;
    height: 2.82rem;
  }
  .box13{
    position: absolute;
    left: 5.70rem;
    top: 7.60rem;
    font-size:.42rem;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:.59rem;
    letter-spacing:4px;
  }
  .box14{
    position: absolute;
    right: 5.70rem;
    top: 7.60rem;
    font-size:.42rem;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:.59rem;
    letter-spacing:4px;
  }
  .box15{
    position: absolute;
    right: 0rem;
    bottom: .5rem;
    width: 1rem;
    height: 1rem;
    opacity: 1;
    z-index: 1000;
  }
</style>
