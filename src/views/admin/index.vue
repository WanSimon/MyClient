<template>
  <div class="admin">
    <topbar :pageName="pageName" hideBack=true remaining=3600></topbar>
    <div class="container">
      <!-- <div class="block1">
        <div class="item1 item1-1" @click="takeOff">
          <img class="item1-image" src="@/assets/images/item1-1.png" />
          <div>药品下架</div>
        </div>
        <div class="item1 item1-2" @click="measure">
          <img class="item1-image" src="@/assets/images/item1-2.png" />
          <div>药品盘点补货</div>
        </div>
        <div class="item1 item1-3" @click="control">
          <img class="item1-image" src="@/assets/images/item1-3.png" />
          <div>设备控制</div>
        </div>
      </div> -->
      <div class="block2">
        <div class="item2 item2-1" @click="takeOff">
          <img class="item2-image" src="@/assets/images/item1-1.png" />
          <div>药品下架</div>
        </div>
        <div class="item2 item2-2" @click="measure">
          <img class="item2-image" src="@/assets/images/item1-2.png" />
          <div>药品盘点补货</div>
        </div>
        <div class="item2 item2-3" @click="control">
          <img class="item2-image" src="@/assets/images/item1-3.png" />
          <div>设备控制</div>
        </div>
        <div class="item2 item2-4" @click="slot">
          <img class="item2-image" src="@/assets/images/item2-4.png" />
          <div>故障药道</div>
        </div>
      </div>
      <!-- <div class="block2">
        <div class="item2 item2-1">
          <img class="item2-image" src="@/assets/images/item2-1.png" />
          <div>扫码补货</div>  
        </div> 
        <div class="item2 item2-2">
          <img class="item2-image" src="@/assets/images/item2-2.png" />
          <div>批量补货</div>
        </div> 
        <div class="item2 item2-3" @click="control">
          <img class="item2-image" src="@/assets/images/item2-3.png" />
          <div>设备控制</div>
        </div> 
        <div class="item2 item2-4">
          <img class="item2-image" src="@/assets/images/item2-4.png" />
          <div>设备配置</div>
        </div> 
      </div> -->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "admin",
    data(){
      return {
        pageName:"设备管理员运维平台"
      }
    },
    component: {
    },
    async mounted(){

    },
    methods:{
      measure(){
        this.$router.push({name: 'measure'});
      },
      takeOff(){
        this.$router.push({name: 'soldOut'});
      },
      control(){
        this.$router.push({name: 'debug'});
      },
      slot(){
        this.$router.push({name: 'slot'});
      },
    },
    computed:{
    },

    async beforeDestroy(){
    }
  }
</script>

<style lang="scss" scoped>
  .admin {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    background: rgba(65, 187, 255, 1) url(../../assets/back.png) 0 0 no-repeat;
    background-size:100% auto;
    font-family: PingFangSC-Medium, PingFang SC;
    .container{
      height: calc(100vh - 1.2rem);
      display: flex;
      justify-content: center;
      flex-direction: column;
      min-height: 4.6rem;
      .block1{
        display: flex;
        width: 100%;
        justify-content: center;
        margin: .2rem 0;
        .item1{
          width: 4.3rem;
          height: 2.4rem;
          border-radius: .2rem;
          margin: 0 .2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: .36rem;
          font-weight: 500;
          color: #FFFFFF;
        }
        .item1-1{
          background-color: #E69165;
        }
        .item1-2{
          background-color: #F0C441;
        }
        .item1-3{
          background-color: #1EBFB5;
        }
        .item1-image{
          width: 1rem;
          height: 1rem;
          margin-bottom: .13rem;
        }
      }
      .block2{
        display: flex;
        width: 100%;
        justify-content: center;
        margin: .2rem 0;
        .item2{
          width: 2.45rem;
          height: 1.8rem;
          border-radius: .2rem;
          font-weight: 500;
          margin: 0 .2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: .32rem;
          font-weight: 500;
          color: #FFFFFF;
        }
        .item2-1{
          background-color: #7065E6;
        }
        .item2-2{
          background-color: #307FF5;
        }
        .item2-3{
          background-color: #1EBFB5;
        }
        .item2-4{
          background-color: #38C4F3;
          background-color: #F0C441;
        }
        .item2-image{
          width: .75rem;
          height: .75rem; 
          margin-bottom: .15rem;
        }
      }
    }
  }
</style>
