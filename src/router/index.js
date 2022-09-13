import Vue from 'vue'
import Router from 'vue-router'
import start from '@/views/start'
import home from '@/views/home'
import idcard from '@/views/idcard_auth'
import productList from "@/views/productList"
import faceRecognition from '@/views/faceRecognition'
import shoppingList from '@/views/shoppingList'
import pickupCode from '@/views/pickupCode'
import customerProductList from '@/views/customerProductList'
import waiting from '@/views/waiting'
import customerWaiting from '@/views/customerWaiting'
import verifyProduct from '@/views/verifyProduct'
import customerVerifyProduct from '@/views/customerVerifyProduct'
import soldOut from '@/views/admin/soldOut'
import measure from '@/views/admin/autoMeasure'
import test from '@/views/admin/test'
import admin from '@/views/admin/index'
import debug from '@/views/admin/debug'
import slot from '@/views/admin/slot'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  if(arguments.length === 2){
    console.error('current url = %s, exec url = %s', window.location.href, arguments[1]);
  }
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: start
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/idcard',
      name: 'idcard',
      component: idcard
    },
    {
      path: '/productList',
      name: 'productList',
      component: productList
    },
    {
      path: '/faceRecognition',
      name: 'faceRecognition',
      component: faceRecognition
    },
    {
      path: '/shoppingList',
      name: 'shoppingList',
      component: shoppingList
    },
    {
      path: '/pickupCode',
      name: 'pickupCode',
      component: pickupCode
    },
    {
      path: '/customerProductList',
      name: 'customerProductList',
      component: customerProductList
    },
    {
      path: '/waiting',
      name: 'waiting',
      component: waiting
    },
    {
      path: '/customerWaiting',
      name: 'customerWaiting',
      component: customerWaiting
    },
    {
      path: '/verifyProduct',
      name: 'verifyProduct',
      component: verifyProduct
    },
    {
      path: '/customerVerifyProduct',
      name: 'customerVerifyProduct',
      component: customerVerifyProduct
    },
    {
      path: '/soldOut',
      name: 'soldOut',
      component: soldOut
    },
    {
      path: '/measure',
      name: 'measure',
      component: measure
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/slot',
      name: 'slot',
      component: slot
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/debug',
      name: 'debug',
      component: debug
    }
  ]
})
