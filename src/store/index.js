/**
 * Created by Administrator on 2020/2/2.
 */
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import {getBase64} from "../js/util";
import conf from "../js/conf";

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    //购物篮数据
    cartData:{
      cartProduct:[],
      //购物篮总商品数
      cartProductCount:0,
      //购物篮商品总价
      cartProductPrice:0,
      //购物篮商品会员总价
      cartProductCustomerPrice:0,
    },
    equipmentInfo:{
      equipment_group_info:{}
    },
    account:{
      idcard:'',
      photo:''
    },
    adminAccount:{
      photo:"",
      idcard:"",
      op_account_id:""
    },
    temperature_humidity_info:{
      temperature: conf.defaultEquipmentInfo.temperature || "",
      humidity: conf.defaultEquipmentInfo.humidity || "",
    },
    //药机的一些从云端拉过来的配置
    systemConf: {  },
  },
  mutations:{
    emptyCart(state){
      state.cartData = {
        cartProduct:[],
        //购物篮总商品数
        cartProductCount:0,
        //购物篮商品总价
        cartProductPrice:0,
        //购物篮商品会员总价
        cartProductCustomerPrice:0,
      };
    },
    empty(state){
      state.cartData = {
        cartProduct:[],
        //购物篮总商品数
        cartProductCount:0,
        //购物篮商品总价
        cartProductPrice:0,
        //购物篮商品会员总价
        cartProductCustomerPrice:0,
      };
      state.account = {
        idcard:'',
        photo:''
      }
    },
    modifyCart(state,cartData){
      state.cartData = cartData;
    },
    async addEquipmentInfo(state,info){
      state.equipmentInfo = info;

      if(info && info.equipment_group_info && info.equipment_group_info.merchant_qr_code){
        try {
          let qr_code = await getBase64(conf.resource + info.equipment_group_info.merchant_qr_code);
          state.equipmentInfo.equipment_group_info.qr_code = qr_code.slice(21);
        }
        catch (e) {
          console.error('get qrcode fail,e=',e);
        }

      }
    },
    addAccount(state,account){
      state.account = account;
    },
    addAdminAccount(state,{photo,idcard,op_account_id}){
      state.adminAccount = {
        photo,idcard,op_account_id
      };
    },
    setTemperatureHumidity(state,info){
      state.temperature_humidity_info = info;
    },
    //更新配置数据
    changeSystemConf(state, payload){
      if(state.systemConf.hasOwnProperty(payload.key)){
        state.systemConf[payload.key] = payload.value;
      }else{
        let obj = {};
        obj[payload.key] = payload.value;
        state.systemConf = { ...state.systemConf, ...obj };
      }
    },
  },
  actions:{
    empty(context){
      context.commit("empty");
    },
    modifyCart(context,cartData){
      context.commit("modifyCart",cartData);
    },
    addEquipmentInfo(context,info){
      context.commit("addEquipmentInfo",info);
    },
    addAccount(context,account){
      context.commit("addAccount",account);
    },
    addAdminAccount(context,account){
      context.commit("addAdminAccount",account);
    },
    setTemperatureHumidity(context,info){
      context.commit("setTemperatureHumidity",info);
    }
  },
  getters
});

export default store;
