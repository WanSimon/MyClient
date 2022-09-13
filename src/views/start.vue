<template>
  <div class="start">
    <div class="box01"></div>
    <div class="box02"></div>
    <div class="box03">心药数字智慧药房</div>
    <div class="box04">正在连接机械结构串口</div>
    <div class="box05">请稍等片刻…</div>
    <div class="box06">(C)苏州心药数字智慧医疗科技有限公司保留所有权利</div>
    <div class="egg" @click="addClickIndex()"></div>

    <div class="d-k-mask" v-show="showDialog">
      <div class="d-k-container">
        <div class="d-k__header">
          <div class="d-k_close" @click="doClose"><img class="image" src="../assets/close.png" /></div>
          <div class="input-box">
            <div class="inpunt-box-item" v-for="(k, idx) in displayPwd" :key="idx" :class="{star: placeholder == k}">{{k}}</div>  
          </div>  
          <div class="tip-box">请输入管理员维护密码!</div>  
          <div class="operate-box">
            <div class="op-confirm" @click="doSubmit">确定</div>  
          </div>  
        </div>
        <div class="d-k__content">
          <div class="d-k-item" @click="doClick(1)">1</div> 
          <div class="d-k-item" @click="doClick(2)">2</div> 
          <div class="d-k-item" @click="doClick(3)">3</div> 
          <div class="d-k-item" @click="doClick(4)">4</div> 
          <div class="d-k-item" @click="doClick(5)">5</div> 
          <div class="d-k-item" @click="doClick(6)">6</div> 
          <div class="d-k-item" @click="doClick(7)">7</div> 
          <div class="d-k-item" @click="doClick(8)">8</div> 
          <div class="d-k-item" @click="doClick(9)">9</div> 
          <div class="d-k-item d-k-item-btn2" @click="doClick('empty')">清空</div>
          <div class="d-k-item" @click="doClick(0)">0</div> 
          <div class="d-k-item d-k-item-btn" @click="doClick('back')"><img src="@/assets/images/backspace.png" /></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { debounce } from "../js/util";
  import API from '@/api/local';

  export default {
    name: 'start',
    data () {
      return {
        timer: null,
        clickIndex: 0,
        showDialog: false,
        displayPwd: '',
        hidePwd: '',
        timer2: null,
        placeholder: '*',
      }
    },
    methods:{
      addClickIndex(){
        if(this.timer) clearTimeout(this.timer);
        this.clickIndex++;
        this.timer = setTimeout(()=>{
          this.clickIndex = 0;
        }, 5000);
        if(this.clickIndex > 5) {
          this.showDialog = true;
          this.clickIndex = 0;
        }
      },
      doClick: debounce(function(inputText){
        if(this.timer2) clearTimeout(this.timer2);
        if('empty' == inputText){
          this.displayPwd = '';
          this.hidePwd = '';
        }else if('back' == inputText){
          this.hidePwd = this.hidePwd.slice(0, -1);
          let len = this.hidePwd.length;
          if(len){
            this.displayPwd = this.placeholder.repeat(len - 1) + this.hidePwd.substr(len - 1);  
          }else{
            this.displayPwd = '';
          }
        }else{
          this.hidePwd += inputText;
          this.displayPwd = this.placeholder.repeat(this.displayPwd.length) + inputText;
        }
        this.timer2 = setTimeout(() => {
          this.displayPwd = this.placeholder.repeat(this.displayPwd.length);
        }, 3000);
      }, 100),
      doSubmit: debounce(async function(){
        let self = this;
        if(self.hidePwd == self.$conf.adminPassword){
          try{
            //打开桌面
            await API.sendCommand({cmd:"restart", prog:["shell"]});
            //展示AllwaysOn
            await API.sendCommand({cmd:"show", show:true});
            //关闭UI
            await API.sendCommand({cmd:"pause", prog:["my-project.exe"]});
          }catch(e){
            console.error(e);
          }
        }
      }),
      doClose(){
        this.showDialog = false;
      }
    },
    async mounted(){
      //清空购物篮
      this.$store.dispatch("empty");

      this.timer = setInterval( async()=>{
        try {
          let data = await this.api.get_init_status();
          if(data && data.hasOwnProperty('network_status') && data.hasOwnProperty('equipment_status') && data.hasOwnProperty('programe_status')){
            if(data.network_status ==1 && data.equipment_status == this.api.DeviceStatus.Normal && data.programe_status == 1){
              this.log.log('device init success.');
              this.$router.push({name: 'home'});
            }
            else{
              console.error('device init fail',data);
            }
          }

        }
        catch (e){
          console.error('获取设备状态失败,',e);
        }

      },2000);

    },

    async destroyed(){
      if(this.timer) clearInterval(this.timer);
    }
  }
</script>

<style  lang="scss" scoped>
  .start {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    background: rgba(65, 187, 255, 1);
  }

  .box01 {
    position: absolute;
    left: 0;
    top: 1.88rem;
    background: url(../assets/love.png) 0 0 no-repeat;
    background-size:100% auto;
    width: 8.53rem;
    height: 7.04rem;
  }

  .box02 {
    position: absolute;
    right: 6.68rem;
    top: 2.20rem;
    background: url(../assets/love2x.png) 0 0 no-repeat;
    background-size:100% auto;
    width: 1.60rem;
    height: 1.17rem;
  }

  .box03 {
    position: absolute;
    top: 3.70rem;
    left: 10.92rem;
    font-size: .42rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: .59rem;
    letter-spacing: 2px;
  }

  .box04 {
    position: absolute;
    top: 7.11rem;
    left: 10.92rem;
    font-size: .24rem;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: .33rem;
  }

  .box05 {
    position: absolute;
    top: 7.54rem;
    left: 10.92rem;
    font-size: .24rem;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: .33rem;
  }

  .box06 {
    position: absolute;
    top: 8.47rem;
    left: 10.92rem;
    font-size: .24rem;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: .33rem;
  }
  .egg{
    position: absolute;
    right: 0rem;
    bottom: 0rem;
    width: 1rem;
    height: 1rem;
    z-index: 1000;
  }
  .d-k-mask{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .d-k-container{
      width: 6rem;
      // background-color: #C7E1FF;
      border-radius: .4rem .4rem .08rem .08rem;
      .d-k__header{
        position: relative;
        margin: .1rem .1rem 0 .1rem; 
        background-color: #C7E1FF;
        background-color: #FFFFFF;
        overflow: hidden;
        border-radius: 0.08rem;
        .d-k_close{
          position: absolute;
          right: 0;
          top: 0;
          width: .4rem;
          height: .4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          .image{
            width: .4rem;
            height: .4rem;
          }
        }
        .input-box{
          overflow: hidden;
          margin: 0 .2rem;
          margin-top: .6rem;
          background: #FFFFFF;
          border: .03rem solid #00BFCE;
          border-radius: .08rem;
          height: .9rem;
          font-size: .52rem;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #333333;
          display: flex;
          align-items: center;
          justify-content: center;
          .inpunt-box-item{
            margin-top: .2rem;
          }
          .inpunt-box-item:last-child{
            margin-top: 0;
          }
        }
        .star{
          margin-top: .2rem !important;  
        }
        .tip-box{
          font-size: .32rem;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #999999;
          text-align: center;
          margin-top: .3rem;
          margin-bottom: .5rem;
        }
        .operate-box{
          margin-bottom: .4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .36rem;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #FFFFFF;
          .op-confirm{
            width: 2.8rem;
            height: .8rem;
            background: #CCCCCC;
            border-radius: .5rem;
            line-height: .8rem;
            text-align: center;
          }
        }
      }
      
      .d-k__content{
        display: flex;
        flex-wrap: wrap;
        padding: .05rem;
        .d-k-item{
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: .24rem;
          font-weight: 600;
          height: 1rem;
          margin: .05rem;
          width: calc(calc(100% / 3) - .1rem);
          background-color: #FCFDFE;
          text-align: center;
          border-radius: .08rem;
        }
        .d-k-item:hover{
          background-color: #E7EFFD;
        }
        .d-k-item-btn{
          img{
            width: .43rem;
            height: .3rem;
          }
        }
        .d-k-item-btn2{
          font-size: 14px;
          color: #666666;
        }
      }
    }
  }
</style>
