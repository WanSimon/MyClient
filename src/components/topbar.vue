<template>
  <div>
    <div class="topbar">{{pageName}}</div>
    <div class="box01" v-show="!hideBack" @click="$router.back(-1)"></div>
    <div class="box02" v-show="!hideGoHome"></div>
    <div class="box03" v-show="!hideGoHome" @click="goHome()">返回首页 ({{remainingTime}}s)</div>
    <div class="mask" v-show="alertVisible">
      <div class="close-alert" @click="hideAlert"></div>
      <div class="dv-alert">
        <div class="close" @click="hideAlert"></div>
        <div class="dv-alert-text" style="top:1.19rem">您确定要放弃购买吗？</div>
        <div class="alert-cancel" @click="hideAlert">取消</div>
        <div class="alert-confirm" @click="optConfirm()">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        remainingTime:180,
        alertVisible:false,
        unload: false,
        currentPath: this.$route.path
      }
    },
    props:['pageName','remaining','hideBack','needConfirm','hideGoHome'],
    components: {},
    mounted(){
      this.remainingTime  = this.$props.remaining || 180;
      if(!this.hideGoHome){
        const timer = setInterval(()=>{
          if(this.unload){
            clearInterval(this.timer);
            return;
          }
          this.remainingTime--;
          if(this.remainingTime <=0){
            this.$router.push('/home', this.currentPath);
          }
        },1000);
        this.$once("hook:beforeDestroy", () => { 
          clearInterval(timer);
          this.log.info('topbar components destory, timer page path = %s, current page path = %s, clearInterval timer = %d', this.currentPath, this.$route.path, timer); 
        });
      }
    },
    methods:{
      goHome(){
        if(this.$props.needConfirm){
          this.alertVisible = true;
        }
        else{
          this.$router.push('/home')
        }
      },
      hideAlert(){
        this.alertVisible = false;
      },
      optConfirm(){
        this.$router.push('/home');
        this.alertVisible = false;
      }
    },
    beforeDestroy(){
      this.unload = true;
    },
  }
</script>
<style scoped>
  .topbar{
    width:100%;
    height:1.20rem;
    background:linear-gradient(90deg,rgba(115,222,255,1) 0%,rgba(63,186,255,1) 100%);
    text-align: center;
    font-size:.60rem;
    font-family:PingFang-SC-Medium,PingFang-SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:1.20rem;
    letter-spacing:2px;
  }
  .box01 {
    position: absolute;
    left: .37rem;
    top: .35rem;
    background: url(../assets/back_pre.png) 0 0  no-repeat;
    background-size:100% auto;
    width:.50rem;
    height:.50rem;
  }
  .box02 {
    position: absolute;
    left: 15.33rem;
    top: .35rem;
    background: url(../assets/home.png) 0 0  no-repeat;
    background-size:100% auto;
    width:.50rem;
    height:.50rem;
  }
  .box03{
    position: absolute;
    left: 15.93rem;
    top: .35rem;
    font-size:.36rem;
    font-family:PingFang-SC-Medium,PingFang-SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:.50rem;
    letter-spacing:1px;
  }

  .close{
    position: absolute;
    top: .4rem;
    right: .4rem;
    background: url(../assets/close.png) 0 0  no-repeat;
    background-size:100% auto;
    width: .6rem;
    height: .6rem;
  }
  .mask{
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 100;
  }
  .close-alert{
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
    opacity: 1;
    z-index: 100;
  }
  .dv-alert{
    position: absolute;
    width: 8.6rem;
    height: 5rem;
    left:5.3rem;
    top:2.9rem;
    background:rgba(255,255,255,1);
    border-radius:.28rem;
    z-index: 101;
  }
  .alert-confirm{
    position: absolute;
    right:1.1rem;
    bottom: .9rem;
    width:2.8rem;
    height:1.1rem;
    background:linear-gradient(90deg,rgba(115,222,255,1) 0%,rgba(63,186,255,1) 100%);
    border-radius:.65rem;
    text-align: center;
    line-height: 1.1rem;
    font-size:.36rem;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .alert-cancel{
    position: absolute;
    left:1.1rem;
    bottom: .9rem;
    width:2.8rem;
    height:1.1rem;
    background:rgba(255,255,255,1);
    border:.02rem solid rgba(115,222,255,1);
    border-radius:.65rem;
    text-align: center;
    line-height: 1.1rem;
    font-size:.36rem;
    font-weight:500;
    color:rgba(115,222,255,1);
  }
  .dv-alert-text{
    position: absolute;
    width: 100%;
    text-align: center;
    font-size:.4rem;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
</style>
