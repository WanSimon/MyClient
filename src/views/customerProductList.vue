<template>
  <div class="customerProductList">
    <topbar :pageName="pageName"></topbar>
    <div class="container">
      <div class="table-head">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 65%" />
            <col style="width: 15%" />
          </colgroup>
          <thead>
          <tr>
            <th style="text-align: left;">药品缩略图</th>
            <th style="text-align: left;">药品名称</th>
            <th>数量</th>
          </tr>
          </thead>
        </table>
      </div>
      <div class="line"></div>
      <div class="table-body">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 65%" />
            <col style="width: 15%" />
          </colgroup>
          <tbody>
          <tr v-for="item,index in list" :key="index">
            <td style="text-align:left;">
              <img v-if="item.home_thumb" class="product-img" :src="$conf.resource + item.home_thumb" />
            </td>
            <td class="text-left">{{item.product_name}}</td>
            <td>{{item.product_count}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="line"></div>
      <div class="table-foot">
        <table>
          <colgroup>
            <col style="width: 85%" />
            <col style="width: 15%" />
          </colgroup>
          <thead>
          <tr>
            <td class="text-left">种类：{{list.length}}</td>
            <td>总数：{{count}}</td>
          </tr>
          </thead>
        </table>
      </div>
    </div>
    <div class="confirm" @click="confirm">确认取货</div>

    <div class="box02"></div>
  </div>
</template>

<script>
  import {audioPlay} from "../js/util";
  export default {
    name: "customerProductList",
    data(){
      return {
        pageName: "核对订单",
        list:[],
        order_id:'',
        code:'',
        count:0
      }
    },
    methods:{
      async confirm(){
        try{
          await this.api.pick_up_product( this.order_id ,this.lock_product, this.list);
          this.$router.push({name:'customerWaiting',params:{code:this.code,list:this.list,order_id:this.order_id}});
        }
        catch (e){
          console.error('设备取药失败',e);
        }
      }
    },
    async mounted(){
      audioPlay(__static +'/请确认您的订单.mp3');
      this.order_id = this.$route.params.order_id;
      this.code = this.$route.params.code;
      this.lock_product = this.$route.params.lock_product;
      this.list = this.$route.params.list||[];
      let data = [];
      try{
        data = await this.api.get_equipment_product();
      }catch(e){
        console.error('get_equipment_product error, ', e);
      }
      this.list.map((item)=>{
        this.count+=item.product_count;
        if(data.slot_product_list_info && Array.isArray(data.slot_product_list_info)){
          let idx = data.slot_product_list_info.findIndex((product) => {
            if(product.merchant_product_info){
              return item.merchant_product_id == product.merchant_product_info.merchant_product_id
            }
            return false;
          });
          if(-1 !== idx) this.$set(item, 'home_thumb', data.slot_product_list_info[idx].merchant_product_info.product_info.home_thumb);  
        }
      });
    },

    async destroyed(){

    }
  }
</script>

<style scoped>
  .customerProductList {
    height: 100vh;
  }
  .container{
    box-sizing: border-box;
    margin: 0 2.2rem;
    padding-top:.5rem;
  }
  .table-head table, .table-body table, .table-foot table{
    width: 96%;
    margin: 0 auto;
    text-align: center;
    border-collapse:separate;
    border-spacing:0 .15rem;
    table-layout: fixed;
  }

  .table-body{
    margin-top: .3rem;
    overflow-y: auto;
    max-height: 3.5rem;  /* TODO 高度根据实际情况自己确定 */
  }
  .table-body table tr td{
    color: #303133;
    font-size: .28rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .table-head table thead tr th{
    font-size: .32rem;
    font-weight: 600;
    color: #303133;
  }
  .table-foot table tr td{
    font-size: .32rem;
    font-weight: 600;
    color: #303133;
  }
  .product-img{
    width: .8rem;
    height: .8rem;
    display: inline-block;
    margin-right: .2rem;
    box-sizing: border-box;
  }
  .line{
    height: .2rem;
    border-bottom: 1px #cecece dashed;
  }
  .text-left{
    text-align: left;
  }
  .box02 {
    position: absolute;
    bottom: 0;
    background: url(../assets/back02.png) 0 0  no-repeat;
    background-size:100% auto;
    width: 100%;
    height: 6.35rem;
    z-index: -1;
  }
  .highlight-color{
    color: #FF5D2B;
  }
  .confirm{
    position: absolute;
    left: 7.2rem;
    bottom: 1rem;
    width:4.8rem;
    height:1.1rem;
    background:linear-gradient(90deg,rgba(115,222,255,1) 0%,rgba(63,186,255,1) 100%);
    border-radius:65px;
    font-size:.42rem;
    font-weight:500;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 1.1rem;
  }
</style>
