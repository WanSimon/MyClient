<template>
  <div class="measure"  @click="keyVisible =false">
    <topbar :pageName="pageName" remaining=3600 :hideGoHome="true"></topbar>
    <div class="box01">
      <div class="box01-01 box01-font" @click="measureMode =1" :style="{background:measureMode ===1?'#4A90E2':'#CDCDCD'}">手动盘点</div>
      <div class="box01-02 box01-font" @click="measureMode =2" :style="{background:measureMode ===2?'#4A90E2':'#CDCDCD'}" style="margin-right: .1rem">自动盘点</div>
      <div class="box01-font2">药道</div>
      <el-select v-model="row"  placeholder="请选择" style="margin-left: .1rem;width: 1rem">
        <el-option
          v-for="item in rows"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="box01-font2">层</div>
      <el-select v-model="col"  placeholder="请选择" style="margin-left: .1rem;width: 1rem">
        <el-option
          v-for="item in cols"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="box01-font2">列</div>
      <div class="search-input">
        <div class="search-image"></div>
        <input class="search-txt" v-model="search_txt" readonly  @click.stop="keyVisible =!keyVisible" placeholder="请输入需要查找的药品名首字母" type="text"/>
        <div v-show="keyVisible" id="keyboard" @click.stop="" class="dv-keyboard">
          <div v-for="key in keys" class="key"  @click="inputKey(key)">{{key==0?"0":key}}
            <div class="del" v-if="key==0"></div>
          </div>
        </div>
        <div class="search-btn" @click="search()">查询</div>
      </div>
      <div class="box01-03 box01-font" @click="resetSearch()">重置</div>
    </div>
    <div v-if="measureMode ===1" >
      <div class="box02">
        <div style="width: 20%;float: left;display: flex;align-items: center;justify-content: center">
          <el-select v-model="measureStatus"  placeholder="请选择" style="margin-left: .1rem;width: 1.2rem">
            <el-option
              v-for="item in measureStatusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="width: 25%;float: left;">商品信息</div>
        <div style="width: 18%;float: left;">药道容量</div>
        <div style="width: 18%;float: left;">账面数量</div>
        <div style="width: 19%;float: left;">盘点数据</div>
      </div>
      <div class="box03">
        <div v-for="item in allList" class="box03-01" v-show=" (row==='all' || row===(item.y+1))
        && (col==='all' || col===(item.x+1))
        && (search_txt ==='' || item.pinyin.includes(search_txt))
        && measureStatus ==0 || item.measureStatus == measureStatus">
          <div style="width: 20%;float: left;">{{`${item.y+1}层${item.x+1}列`}}</div>
          <div style="width: 25%;float: left;" class="box03-02">
            <div class="box03-01-01">
              <img style="width: 100%;height: 100%" :src="$conf.resource+item.home_thumb">
            </div>
            <div class="box03-01-02">
              <div style="font-weight: 600;color: #333333">{{item.name}}</div>
              <div>国际条码：{{item.bar_code}}</div>
              <div>规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：{{item.specification}}</div>
            </div>
          </div>
          <div style="width: 18%;float: left;">{{item.upper_limit}}</div>
          <div style="width: 18%;float: left;">{{item.real_stock}}</div>
          <div style="width: 19%;float: left;" class="box03-01-03">
            <el-input-number v-model="item.measure_num" :min="0" :precision="0" :max="item.upper_limit" label="描述文字"></el-input-number>
            <div v-if="item.measureStatus === MeasureStatus.measured" class="box03-01-03-02" style="color: #72B935;">已盘点</div>
            <div v-else-if="item.measureStatus === MeasureStatus.unMeasure" class="box03-01-03-02" style="color: #4A90E2;">未盘点</div>
            <div v-else-if="item.measureStatus === MeasureStatus.abnormal" class="box03-01-03-02" style="color: #E2090E;">异常</div>
          </div>
        </div>
      </div>
      <div class="box04">
        <div class="box04-02"></div>
        <div style="margin-left: .2rem;">药道未盘点时，盘点数量录入空，不能录入0</div>
        <div style="margin-left: 6rem;">已对 {{measureSlotNum}} 个药道进行盘点</div>
        <div class="box04-01" @click="confirmMode1()">确定</div>

      </div>
    </div>
    <div v-else>
      <div class="box02">
        <div style="width: 5%;float: left;display: flex;align-items: center;justify-content: center">
          <el-checkbox v-model="measureMode2.selectAll" @change="selectAll()"></el-checkbox>
        </div>
        <div style="width: 10%;float: left;display: flex;align-items: center;justify-content: center">
          <el-select v-model="measureStatus"  placeholder="请选择" style="margin-left: .1rem;width: 1.2rem">
            <el-option
              v-for="item in measureStatusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="width: 25%;float: left;">商品信息</div>
        <div style="width: 15%;float: left;">药道容量</div>
        <div style="width: 15%;float: left;">账面数量</div>
        <div style="width: 15%;float: left;">盘点数量</div>
        <div style="width: 15%;float: left;">实际数据</div>
      </div>
      <div class="box03">
        <div v-for="item in allList" class="box03-01" v-show=" (row==='all' || row===(item.y+1))
        && (col==='all' || col===(item.x+1))
        && (search_txt ==='' || item.pinyin.includes(search_txt))
        && measureStatus ==0 || item.measureStatus == measureStatus ">
          <div style="width: 5%;float: left;">
            <el-checkbox v-model="item.checked" @change="selectOne(item)"></el-checkbox>
          </div>
          <div style="width: 10%;float: left;">{{`${item.y+1}层${item.x+1}列`}}</div>
          <div style="width: 25%;float: left;" class="box03-02">
            <div class="box03-01-01">
              <img style="width: 100%;height: 100%" :src="$conf.resource+item.home_thumb">
            </div>
            <div class="box03-01-02">
              <div style="font-weight: 600;color: #333333">{{item.name}}</div>
              <div>国际条码：{{item.bar_code}}</div>
              <div>规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：{{item.specification}}</div>
            </div>
          </div>
          <div style="width: 15%;float: left;">{{item.upper_limit}}</div>
          <div style="width: 15%;float: left;">{{item.real_stock}}</div>
          <div style="width: 15%;float: left;">{{item.auto_measure_num}}</div>
          <div style="width: 15%;float: left;" class="box03-01-03">
            <el-input-number v-model="item.measure_num" :min="0" :precision="0" :max="item.upper_limit" label="描述文字"></el-input-number>
            <div v-if="item.measureStatus === MeasureStatus.measured" class="box03-01-03-02" style="color: #72B935;">已盘点</div>
            <div v-else-if="item.measureStatus === MeasureStatus.unMeasure" class="box03-01-03-02" style="color: #4A90E2;">未盘点</div>
            <div v-else-if="item.measureStatus === MeasureStatus.abnormal" class="box03-01-03-02" style="color: #E2090E;">异常</div>
          </div>
        </div>
      </div>
      <div class="box04">
        <div class="box04-02"></div>
        <div style="margin-left: .2rem;">剩余 {{abnormalNum}} 个盘点异常药道待处理</div>
        <div style="width: 5rem">     <el-progress style="margin-left: .2rem;" :text-inside="true" :stroke-width="30" :percentage="measured_percent"></el-progress></div>

        <div style="margin-left: 1rem;">已选中 {{selectNum}} 个盘点异常药道</div>
        <div class="box04-04" @click="beginMeasure">{{this.measuring?'停止':'开始'}}</div>
        <div class="box04-03" @click="confirmMode2">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import _ from "lodash";
  import pinyin from "../../js/pinyin";
  export default {
    name: "measure",
    data(){
      return {
        pageName:"药品盘点",
        // 1：手动盘点；2：自动盘点
        measureMode:1,
        rows: [],
        row:'all',
        cols:[],
        col:'all',
        keyVisible:false,
        search_txt:"",
        keys:'QWERTYUIOPASDFGHJKLZXCVBNM0',
        allList:[],
        channel:{
          aisleX:0,
          aisleY:0
        },
        measureStatus:0,
        measureStatusArr:[
          {
            value:0,
            label:'全部药道',
          },
          {
            value:1,
            label:'未盘点药道',
          },
          {
            value:2,
            label:'已盘点药道',
          },
          {
            value:3,
            label:'异常药道',
          }
        ],
        measureMode2:{
          selectAll:false
        },
        MeasureStatus:{
          unMeasure:1,
          measured:2,
          abnormal:3
        },
        measuring:false,
        selectNum:0,
        measureSlotNum:0,
        measureMap:new Map(),
        measured_percent:0,
        abnormalNum:0
      }
    },
    component: {
    },
    async mounted(){

      setTimeout(async ()=>{
        await this.getList();
        this.generRowCol();
      },1000);

      //接收盘点通知
      this.api.on_notify_measure_channel = (body)=>{
        console.info('on_notify_measure_channel:',JSON.stringify(body));
        let slot_no = body.slot_no;
        let count = body.count;
        if(!this.measureMap.has(slot_no)) {
          console.warn('unmeasrue slot:',slot_no);
          return;
        }
        let measure = this.measureMap.get(slot_no);
        clearTimeout(measure.timer);
        measure.resolve(count);
      };

    },
    methods:{
      generRowCol(){
        let rows = [
          {
            value:'all',
            label:'全部'
          }
        ];
        for(let i=0;i<this.channel.aisleY;i++){
          rows.push({
            value: i+1,
            label: i+1
          });
        }
        let cols =  [
          {
            value:'all',
            label:'全部'
          }
        ];
        for(let i=0;i<this.channel.aisleX;i++){
          cols.push({
            value: i+1,
            label: i+1
          });
        }
        this.$set(this,'rows',rows);
        this.$set(this,'cols',cols);
      },
      search(){
        let txt = this.search_txt.trim();
        if(txt){
          txt = txt.toUpperCase();
        }
      },
      inputKey(key){
        if(key==='0'){
          this.search_txt =  this.search_txt.length>0?this.search_txt.slice(0,this.search_txt.length-1):""
        }else {
          this.search_txt +=key;
        }
        this.search();
      },
      async getList(){
        //获取设备信息
        let info = await this.api.get_equipment_info();
        if(info.equipment_info){
          //存储设备信息
          this.$store.dispatch("addEquipmentInfo",info.equipment_info);
        }
        try {
          let drug_channel = this.$store.state.equipmentInfo.equipment_type_info.drug_channel;
          this.channel = {
            aisleX:drug_channel.aisleX,
            aisleY:drug_channel.aisleY
          };
          let slot_product_list_info = this.$store.state.equipmentInfo.equipment_product_info.slot_product_list_info;
          let slot_info_list = drug_channel.slot_info_list;
          let list = [];
          slot_product_list_info.map((item)=>{
            let obj = {};
            obj.slot_no = item.slot_no;
            obj.real_stock = item.real_stock;
            obj.lock_stock = item.lock_stock;
            obj.upper_limit = item.upper_limit;
            let slotItem = _.find(slot_info_list,(slot)=>slot.slot_no == item.slot_no);
            if(slotItem){
              obj.x = slotItem.x;
              obj.y = slotItem.y;
            }
            obj.name = item.merchant_product_info.product_info.name;
            obj.bar_code = item.merchant_product_info.product_info.bar_code;
            obj.manufacturer = item.merchant_product_info.product_info.manufacturer;
            obj.specification = item.merchant_product_info.product_info.specification;
            obj.home_thumb = item.merchant_product_info.product_info.home_thumb;
            obj.pinyin = pinyin.instance.initialTreatment(obj.name);
            obj.measureStatus = this.MeasureStatus.unMeasure;
            obj.checked = false;
            list.push(obj);
          });
          this.list = list.sort((a,b)=>{
            if(a.y!==b.y) return a.y- b.y;
            else return a.x - b.x;
          });
          this.allList = [...list];
        }
        catch (e){
          console.error('初始化药道信息失败',e);
        }
      },
      selectAll(){
        this.allList.map(item=>{
          item.checked = this.measureMode2.selectAll;
        });
      },
      selectOne(){
        this.selectNum = this.allList.filter(item=>item.checked && item.measureStatus == this.MeasureStatus.abnormal).length;
      },
      resetSearch(){
        this.row = 'all';
        this.col = 'all';
        this.search_txt = '';
      },
      // 手动盘点确认
      async confirmMode1(){
        let slot_arr = this.allList.filter(item=>item.measure_num!==undefined && item.measureStatus !== this.MeasureStatus.measured);
        let slot_product_list = slot_arr.map(item=>{ return {
          slot_no:item.slot_no,
          product_count:item.measure_num}}
        );
        try {
          await this.api.measure_product(this.$route.params.op_account_id||'',slot_product_list);
          slot_arr.map(item=>{
            item.measureStatus = this.MeasureStatus.measured;
            item.real_stock = item.measure_num;
          });
          this.measureSlotNum =0;
          this.allList.map(item=>{
            if(item.measureStatus === this.MeasureStatus.measured) this.measureSlotNum++;
          });
        }
        catch (e) {
          console.error(e);
        }
        this.calcNum();
      },
      // 自动盘点确认
      async confirmMode2(){
        let slot_arr = this.allList.filter(item=>item.checked && item.measure_num!==undefined && item.measureStatus !== this.MeasureStatus.measured);
        if(slot_arr.length===0) return ;
        let slot_product_list = slot_arr.map(item=>{ return {
          slot_no:item.slot_no,
          product_count:item.measure_num}}
        );
        try{
          await this.api.measure_product(this.$route.params.op_account_id||'',slot_product_list);
          slot_arr.map(item=>{
            item.measureStatus = this.MeasureStatus.measured;
            item.real_stock = item.measure_num;
          });
          this.measureSlotNum =0;
          this.allList.map(item=>{
            if(item.measureStatus === this.MeasureStatus.measured) this.measureSlotNum++;
          });
        }
        catch (e) {
          console.error(e);
        }
        this.calcNum();

      },
      // 开始盘点
      async beginMeasure(){
        if(this.measuring) {
          this.measuring = false;
          return;
        }
        this.measured_percent = 0;
        this.measuring = true;
        let slot_arr = this.allList.filter(item=>!!item.checked);
        let measured_num = 0;
        for(let i=0;i<slot_arr.length;i++){
          //收到停止指令
          if(!this.measuring) return ;
          try{
            let slot_no = slot_arr[i].slot_no;
            let count = await this.measure(slot_no);
            measured_num++;
            this.measured_percent = parseInt(measured_num/slot_arr.length*100);
            slot_arr[i].auto_measure_num = count;
            // 盘点的数量与实际数量不一致
            if( count != slot_arr[i].real_stock  ){
              // 异常
              slot_arr[i].measureStatus = this.MeasureStatus.abnormal;
            }
            else {
              // 已盘点
              slot_arr[i].measureStatus = this.MeasureStatus.measured;
            }
          }
          catch (e) {
            console.error(e);
          }
        }
        this.measuring = false;

        this.calcNum();
      },
      // 盘点药道 封装成Promise
      measure(slot_no){
        return new Promise(async(resolve,reject)=>{
          let timer = setTimeout(()=>{
            if(this.measureMap.has(slot_no)) this.measureMap.delete(slot_no);
            reject(new Error(`timeout,slot:${slot_no}`));
          },10000);
          try {
            console.log('开始盘点药道:',slot_no);
            await this.api.measure_channel(slot_no);
          }
          catch (e) {
            console.error(e);
            reject(e);
          }
          this.measureMap.set(slot_no,{
            resolve,
            reject,
            timer
          });
        });
      },
      // 计算盘点异常药道数 及 选中的异常药道数
      calcNum(){
        this.abnormalNum = this.allList.filter(item=>item.measureStatus==this.MeasureStatus.abnormal).length;
        this.selectNum = this.allList.filter(item=>item.checked && item.measureStatus == this.MeasureStatus.abnormal).length;
      }

    },
    computed:{
    },
    async destroyed(){

    }
  }
</script>

<style scoped>
  .check {
    font-family: PingFangSC-Semibold, PingFang SC;
  }
  .box01{
    position: absolute;
    height: 1rem;
    width: 100%;
    display: flex;
    align-items: center;

  }
  .box01-01{
    margin-left: .3rem;
    height: .6rem;
    width: 1.8rem;
    border-bottom-left-radius: .3rem;
    border-top-left-radius: .3rem;
    line-height: .6rem;
  }
  .box01-02{
    margin-left: 0;
    height: .6rem;
    width: 1.8rem;
    border-bottom-right-radius: .3rem;
    border-top-right-radius: .3rem;
    line-height: .6rem;
  }
  .box01-font{
    text-align: center;
    font-weight: 600;
    font-size: .24rem;
    color: #FFFFFF;
  }
  .box01-font2{
    font-size: .24rem;
    font-weight: 600;
    color: #666666;
    margin-left: .1rem;
  }
  .search-input{
    width:6.4rem;
    height:.6rem;
    border-radius:.3rem;
    border: .02rem solid #4A90E2;
    margin-left: 2rem;
    position: relative;
  }
  .search-image{
    position: absolute;
    left: .1rem;
    top: .1rem;
    background: url(../../assets/search_black.png) 0 0 no-repeat;
    background-size:100% 100%;
    width: .4rem;
    height: .4rem;
  }
  .search-txt{
    position: absolute;
    left: .5rem;
    top:.14rem;
    height: .3rem;
    width: 6rem;
    border:0;
    font-size:.24rem;
    font-weight:500;
    line-height:.30rem;
  }
  input::-webkit-input-placeholder{
    color:rgba(174,174,174,1);
    background: #fff;
  }
  input:focus{
    outline: none;
  }
  .search-btn{
    position: absolute;
    right: -.02rem;
    width:.9rem;
    bottom:-.01rem;
    top:-.01rem;
    background: #4A90E2;
    border-radius:0rem .3rem .3rem 0rem;
    font-size:.24rem;
    font-weight:500;
    color:rgba(255,255,255,1);
    letter-spacing:.02rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dv-keyboard{
    position: absolute;
    top:.62rem;
    left: .45rem;
    width: 3.8rem;
    height: 1.85rem;
    padding: 0rem .2rem;
    background:  #B7B7B7;
    border-radius: .08rem;
    display: flex;
    flex-wrap: wrap;
    align-content:center;
    z-index: 999;
  }
  .key {
    color: #666;
    text-transform: uppercase;
    background: #f1f1f1;
    font-size: .18rem;
    line-height: .3rem;
    text-align: center;
    height: .3rem;
    width: .3rem;
    border-radius: .04rem;
    border: .02rem solid #e4e4e4;
    box-shadow: inset 0 0 .20rem white, 0 .05rem 0 #b1b1b1, 0 .06rem 0 .01rem #7e7e7e, 0 .08rem .05rem #a5a5a5;
    margin: .11rem .04rem;
    position: relative;
  }
  .key:hover{
    background: #181818;
    color: #fff;

  }
  .del{
    position: absolute;
    left: 0;
    top:0;
    background: url(../../assets/del2.png) 0 0  no-repeat;
    background-size:100% auto;
    width: 100%;
    height:100%;
  }
  .del:hover{
    background: url(../../assets/del3.png) 0 0  no-repeat;
    background-size:100% auto;
  }
  .box01-03{
    margin-left: 0.4rem;
    height: .6rem;
    width: 1.8rem;
    border-radius: .3rem;
    line-height: .6rem;
    background: #72B935;
  }
  .box02{
    position: absolute;
    width: 100%;
    top:2.2rem;
    height: .6rem;
    background: #E7EFFD;
    font-size: .24rem;
    font-weight: 600;
    color: #333333;
    line-height: .6rem;
    text-align: center;
  }
  .box04{
    position: absolute;
    width: 100%;
    bottom:0rem;
    height: .8rem;
    background: #EEEEEE;
    display: flex;
    align-items: center;

    font-size: .28rem;
    font-weight: 600;
    color: #333333;
    letter-spacing: .01rem;
  }
  .box04-01{
    position: absolute;
    right: 0;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    width: 3rem;
    background: #4A90E2;
    font-size: .36rem;
    font-weight: bold;
    color: #FFFFFF;
  }
  .box04-03{
    position: absolute;
    right: 0;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    width: 2.2rem;
    background: #4A90E2;
    font-size: .36rem;
    font-weight: bold;
    color: #FFFFFF;
  }
  .box04-04{
    position: absolute;
    right: 2.2rem;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    width: 2.2rem;
    background: #72B935;
    font-size: .36rem;
    font-weight: bold;
    color: #FFFFFF;
  }
  .box04-02{
    background: url(../../assets/notice.png) 0 0  no-repeat;
    background-size:100% auto;
    width: .3rem;
    height:.27rem;
    margin-left: .2rem;
  }
  .box03{
    position: absolute;
    width: 100%;
    top:2.8rem;
    height: calc(100% - 3.6rem);
    overflow-y: auto;
  }
  .box03-01{
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    text-align: center;
    font-size: .24rem;
    font-weight: 600;
    color: #666666;
    border-bottom: .01rem solid #DCDCDC;
  }
  .box03-02{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box03-01-01{
    width: .8rem;
    height: .8rem;
  }
  .box03-01-02{
    height: 1rem;
    margin-left: .1rem;
    display: flex;
    justify-content:space-around;
    align-items:flex-start;
    flex-direction:column;
    font-size: .16rem;
    font-weight: 400;
  }
  .box03-01-03{
    display: flex;
    justify-content: center;
  }
  .box03-01-03-01{
    width: 1.2rem;
    height: .4rem;
    background: #FFFFFF;
    border-radius: .30rem;
    border: .02rem solid #4A90E2;
  }
  .box03-01-03-02{
    margin-left: .2rem;
    height: .4rem;
    line-height: .4rem;
  }
</style>
