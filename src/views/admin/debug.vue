<template>
  <div class="debug">
    <topbar :pageName="pageName" remaining=3600 :hideGoHome="true"></topbar>
    <div class="box01">
      <div class="left">
        <div class="box01-com">
          <div class="box01-com-left">药仓</div>
          <div class="box01-com-right">
            <div class="btn" @click="openDoor">打开舱门</div>
            <div class="btn" @click="closeDoor">关闭舱门</div>
            <div class="btn" @click="clearText">清空控制台输出</div>
          </div>
        </div>
        <div class="box01-com">
          <div class="box01-com-left">回收仓</div>
          <div class="box01-com-right">
            <div class="btn" @click="openFlap">打开挡板</div>
          </div>
        </div>
        <div class="box01-com">
          <div class="box01-com-left">盘点</div>
          <div class="box01-com-right">
            <div style="width: 100%;height:.6rem;display: flex;align-items: center;">
              <el-select class="el-custom" v-model="row"  placeholder="请选择" style="width: 1.5em">
                <el-option v-for="item in rows" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <div class="box01-font2">层</div>
              <el-select class="el-custom" v-model="col"  placeholder="请选择" style="margin-left: .1rem;width: 1.5em">
                <el-option v-for="item in cols" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <div class="box01-font2">列</div>
              <div style="margin-left: 10px;" class="btn" @click="measure">盘点</div>
            </div>
          </div>
        </div>
        <div class="box01-com">
          <div class="box01-com-left">取药</div>
          <div class="box01-com-right">
            <div style="width: 100%;height:.6rem;display: flex;align-items: center; margin-bottom: 5px;">
              <el-select class="el-custom" v-model="product.row"  placeholder="请选择" style="width: 1.5em">
                <el-option v-for="item in rows" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <div class="box01-font2">层</div>
              <el-select class="el-custom" v-model="product.col"  placeholder="请选择" style="margin-left: .1rem;width: 1.5em">
                <el-option v-for="item in cols" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <div class="box01-font2">列</div>
              <el-input-number v-model="product.count" :min="1" label="个数" style="margin-left: .1rem; width:140px;"></el-input-number>
              <el-checkbox style="margin-left: .1rem; font-size: .20rem;font-weight: 600; color: #666666;" class="el-custom" v-model="product.check" true-label=1 false-label=0>复核</el-checkbox>
            </div>
            <div class="btn" @click="pickup">取药</div>
          </div>
        </div>
        <div class="box01-com">
          <div class="box01-com-left">履带</div>
          <div class="box01-com-right">
            <div style="width: 100%;height:.6rem;display: flex;align-items: center; margin-bottom: 5px;">
              <el-select class="el-custom" v-model="track.row"  placeholder="请选择" style="width: 1.5em">
                <el-option v-for="item in rows" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <div class="box01-font2">层</div>
              <el-select class="el-custom" v-model="track.col"  placeholder="请选择" style="margin-left: .1rem;width: 1.5em">
                <el-option v-for="item in cols" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <div class="box01-font2">列</div>
              <el-input-number v-model="track.duration" :min="-1" label="持续时间" style="margin-left: .1rem; width:140px;"></el-input-number>
            </div>
            <div class="btn" @click="testTrack(1)">滚动</div>
            <div class="btn" @click="testTrack(0)">停止</div>
          </div>
        </div>
        <div class="box01-com">
          <div class="box01-com-left">指示灯</div>
          <div class="box01-com-right">
            <div style="width: 100%;height:.6rem;display: flex;align-items: center; margin-bottom: 5px;">
              <el-select class="el-custom" v-model="light.row"  placeholder="请选择" style="width: 1.5em">
                <el-option v-for="item in rows" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <div class="box01-font2">层</div>
              <el-select class="el-custom" v-model="light.col"  placeholder="请选择" style="margin-left: .1rem;width: 1.5em">
                <el-option v-for="item in cols" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <div class="box01-font2">列</div>
            </div>
            <div class="btn" @click="testLight(1)">开指示灯</div>
            <div class="btn" @click="testLight(0)">关指示灯</div>
          </div>
        </div>
        <div class="box01-com">
          <div class="box01-com-left">身份证读卡</div>
          <div class="box01-com-right">
            <div v-if="!status.reading" class="btn" @click="read_idcard">开始读取</div>
            <div v-else class="btn">读取中...</div>
          </div>
        </div>
        <div class="box01-com">
          <div class="box01-com-left">二维码扫描</div>
          <div class="box01-com-right">
            <div v-if="!status.scaning" class="btn" @click="scanqrcode">开始扫描</div>
            <div v-else class="btn">扫描中...</div>
          </div>
        </div>
        <!-- <div class="box01-com">
          <div class="box01-com-left">人脸识别</div>
          <div class="box01-com-right">
            <div class="btn" @click="openFace">打开</div>
            <div class="btn" @click="closeFace">关闭</div>
          </div>
        </div> -->
        <div class="box01-com">
          <div class="box01-com-left">打印机</div>
          <div class="box01-com-right">
            <div class="btn" @click="print">打印小票</div>
          </div>
        </div>
        <div class="box01-com">
          <div class="box01-com-left">关闭程序</div>
          <div class="box01-com-right">
            <div class="btn" @click="toDesk">返回桌面</div>
          </div>
        </div>
      </div>
      <div class="right" id="message" v-html="text"></div>
    </div>

  </div>
</template>

<script>
  import _ from "lodash";
  import API from '@/api/local';

  export default {
    name: "debug",
    data(){
      return {
        pageName:"设备调试",
        photo: '',
        text:"",
        status:{
          scaning:false,
          reading:false,
        },
        channel:{
          aisleX:0,
          aisleY:0
        },
        rows: [{
          value:'all',
          label:'全部'
        }],
        row:'all',
        cols:[{
          value:'all',
          label:'全部'
        }],
        col:'all',
        pickup_num:1,
        lineBreak: '<br>',
        product: {
          row: 'all',
          col: 'all',
          count: 1,
          check: 0
        },
        track: {
          row: 'all',
          col: 'all',
          duration: 10
        },
        light: {
          row: 'all',
          col: 'all',
        },
        idcardTimer: null,
        qrcodeTimer: null,
      }
    },
    component: {
    },
    async mounted(){
      this.op_account_id = this.$route.params.op_account_id;
      this.api.on_notify_qrcode = async (body)=>{
        this.text += `二维码扫描仪返回结果：${JSON.stringify(body)}`;
        this.text += this.lineBreak;
        //状态(0:成功;2:处于打开状态;-1:失败;-3:开启扫描仪照明失败;-8:初始化异常;-65535:程序未初始化)
        if(body.status == 0 && body.qrcodeinfo && body.qrcodeinfo.str){
          let code = body.qrcodeinfo.str;
        }
        if(this.qrcodeTimer) clearTimeout(this.qrcodeTimer);
        this.stop_scan_qrcode();
      };
      this.api.on_notify_read_idcard = async (body)=>{
        this.text += `身份证读卡器返回结果：${JSON.stringify(body)}`;
        this.text += this.lineBreak;
        //(0:成功;1:开始读取;2:读取中;3:用户终止读取;-8:连接身份证读卡器异常;-65535:程序未初始化;-1:其他)
        if(body && body.status == 0){
          this.photo = 'data:image/png;base64,' + body.idcardinfo.photo;
        }
        if(this.idcardTimer) clearTimeout(this.idcardTimer);
        this.stop_read_idcard();
      };
      //接收盘点通知
      this.api.on_notify_measure_channel = (body)=>{
        this.text += `盘点返回结果：${JSON.stringify(body)}`;
        this.text += this.lineBreak;
        let slot_no = body.slot_no;
        let count = body.count;
      };
      //接收二维码扫描仪通知
      this.api.on_notify_qrcode = body => {
        this.text += `二维码扫描仪返回结果：${JSON.stringify(body)}`;
        this.text += this.lineBreak;
      };
      //舱门指令通知
      this.api.on_notify_operate_vendor = body => {
        //（1：打开取货仓门，2：关闭取货仓门，3：打开取货仓灯光，4：关闭取货仓灯光，5：将升降梯中物品置入取货仓，6：将取货仓物品置入回收仓）
        const labelArr = {1: '打开取货仓门', 2: '关闭取货仓门', 3: '打开取货仓灯光', 4: '关闭取货仓灯光', 5: '将升降梯中物品置入取货仓', 6: '打开回收仓'};
        if(labelArr.hasOwnProperty(body.operateType)){
          this.text += `${labelArr[body.operateType]}` + (body.status != 0 ? '失败' : '成功'); 
        }else{
          this.text += `舱门指令返回结果：${JSON.stringify(body)}`;
        }
        this.text += this.lineBreak;  
      };
      //重置取药结束通知
      this.api.on_notify_pick_up_product = async (msg) => {}

      setTimeout(async ()=>{
        await this.getList();
        this.generRowCol();
      },1000);
    },
    methods:{
      //关闭exe返回桌面
      async toDesk(){
        try{
          //打开桌面
          let ret1 = await API.sendCommand({cmd:"restart", prog:["shell"]});
          this.text += '打开桌面指令执行结果：' + JSON.stringify(ret1);
          this.text += this.lineBreak;
          //展示AllwaysOn
          let ret2 = await API.sendCommand({cmd:"show", show:true});
          this.text += '展示AllwaysOn指令执行结果：' + JSON.stringify(ret2);
          this.text += this.lineBreak;
          //关闭UI
          let ret3 = await API.sendCommand({cmd:"pause", prog:["my-project.exe"]});
          this.text += '关闭UI指令执行结果：' + JSON.stringify(ret3);
          this.text += this.lineBreak;
        }catch(e){
          console.error(e);
          this.text += e.message || '操作失败!';
          this.text += this.lineBreak;
        }
      },
      clearText(){
        this.text = '';
      },
      //履带
      async testTrack(opt){
        try{
          if('all' == this.track.row){
            this.text += '目前只支持全部层';
            this.text += this.lineBreak;
            return ;
          }
          let data = {x: this.track.col, y: this.track.row, duration: this.track.duration, opt: opt};
          if(0 == data.duration) data.duration = 10;
          if('all' == this.track.row) data.y = -1;
          if('all' == this.track.col) data.x = -1;
          let ret = await this.api.operateTrack(data);
          this.text += ret ? 'success' : 'failed';
          this.text += this.lineBreak;
        }catch(e){
          this.text += JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      //灯带
      async testLight(opt){
        try{
          if('all' == this.light.row && 'all' == this.light.col){
            this.text += '目前不支持全部, 请至少选择一个层或列';
            this.text += this.lineBreak;
            return ;
          }
          let data = {...this.light};
          if('all' == this.light.row) data.row = -1;
          if('all' == this.light.col) data.col = -1;
          let ret = await this.api.optLightV3(data.col, data.row, opt);
          this.text += opt ? '打开灯带 ' : '关闭灯带 ';
          this.text += ret ? '成功' : '失败';
          this.text += this.lineBreak;
        }catch(e){
          this.text += JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      async openFace(){
        try{
          if(!this.photo){
            this.text += '测试人脸识别前，请先测试身份证读卡功能';
            this.text += this.lineBreak;
            return;
          } 
          await this.api.facematch_video(this.photo, 1, this.$conf.faceScore, 0);
          this.text += '开始人脸识别...';
          this.text += this.lineBreak;
        }catch (e){
          this.text += '开始人脸识别失败 ' + JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      async closeFace(){
        try{
          await this.api.stop_facematch_video();
          this.text += '关闭人脸识别成功';
          this.text += this.lineBreak;
        }catch (e){
          this.text += '关闭人脸识别失败 ' + JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      //打开取药舱门
      async openDoor(){
        try{
          let res = await this.api.openDoor();
          console.info(res)
          this.text += '打开取药舱舱门指令发送成功';
          this.text += this.lineBreak;
        }
        catch (e) {
          this.text += '打开取药舱舱门指令发送失败 ' + JSON.stringify(e);
          this.text += this.lineBreak;
          console.info(e);
        }
      },
      //关闭取药舱门
      async closeDoor(){
        try{
          let res = await this.api.closeDoor();
          this.text += res ? '关闭取药舱舱门指令发送成功' : '关闭取药舱舱门指令发送失败';
          this.text += this.lineBreak;
        }
        catch (e) {
          this.text += '关闭取药舱舱门指令发送失败 ' + JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      //打开回收舱门
      async openFlap(){
        try{
          await this.api.operate_vendor(6,1);
          this.text += '打开回收舱挡板指令发送成功';
          this.text += this.lineBreak;
        }
        catch (e) {
          this.text += '打开回收舱挡板失败 ' + JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      async scanqrcode(){
        try{
          if(this.status.scaning) return ;
          if(this.qrcodeTimer) clearTimeout(this.qrcodeTimer);
          await this.api.scanqrcode();
          this.$set(this.status, 'scaning', true);
          this.text += '开始扫码二维码...';
          this.text += this.lineBreak;
          this.qrcodeTimer = setTimeout(()=>{
            this.stop_scan_qrcode();
          },20000);
        }
        catch (e) {
          this.text +=  '扫码二维码失败 ' + JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      async stop_scan_qrcode(){
        try{
          await this.api.stop_scan_qrcode();
          this.$set(this.status, 'scaning', false);
        }
        catch (e) {
          this.text += JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      async read_idcard(){
        try{
          if(this.status.scaning) return ;
          if(this.qrcodeTimer) clearTimeout(this.qrcodeTimer);
          await this.api.read_idcard();
          this.$set(this.status, 'reading', true);
          this.text += '开始读取身份证...';
          this.text += this.lineBreak;
          this.idcardTimer = setTimeout(()=>{
            this.stop_read_idcard();
          },20000);
        }
        catch (e) {
          this.text += '读取身份证失败 ' + JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      async stop_read_idcard(){
        try{
          await this.api.stop_read_idcard();
          this.$set(this.status, 'reading', false);
        }
        catch (e) {
          this.text += JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      async print(){
        let info = {
          ticket_title:'心药智慧药房',
          take_num:"234567",
          total_product_count:3,
          total_amount:6,
          addr:"www",
          phone:"18151110866",
          wchat_qr_code:"",
          product_info_list:[
            {
              name:"联苯咔唑凝胶",
              specification:"100g*20粒",
              manufacturer:"北京华邦制药有限公司",
              product_count:3,
              price:2,
              amount:6,
              batch_number:"20190501919",
              expiration_date:"20100705",
              approval_number:"wwww"
            },
            {
              name:"联苯咔唑凝胶",
              specification:"100g*20粒",
              manufacturer:"重庆华邦制药有限公司",
              product_count:3,
              price:2,
              amount:6,
              batch_number:"20190501919",
              expiration_date:"20100705",
              approval_number:"wwww"
            }
          ]
        };
        try{
          await this.api.print_ticket(info);
          this.text += '打印成功';
          this.text += this.lineBreak;
        }
        catch (e){
          this.text += '打印失败 ' + JSON.stringify(e);
          this.text += this.lineBreak;
          console.error("打印失败：",e);
        }
      },
      //盘点
      async measure(){
        if(this.row === 'all' || this.col === 'all'){
          this.text += '请先选择药道';
          this.text += this.lineBreak;
          return ;
        }
        let slot_no = this.col + (this.row-1)*this.channel.aisleX;
        try{
          await this.api.measure_channel([slot_no]);
          this.text += '盘点指令发送成功';
          this.text += this.lineBreak;
        }catch (e) {
          this.text += JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      //取药
      async pickup(){
        if(this.product.row === 'all' || this.product.col === 'all'){
          this.text += '请先选择药道';
          this.text += this.lineBreak;
          return ;
        }
        if(!this.product.count){
          this.text += '请至少选择一个药品数量';
          this.text += this.lineBreak;
          return ; 
        }
        let data = {
          op_account_id: this.op_account_id,
          x: this.product.col,
          y: this.product.row,
          count: this.product.count,
          check: this.product.check
        };
        try{
          let ret = await this.api.pick_up_product_v2(data);
          this.text += ret ? '取药指令发送成功' : '取药指令发送失败';
          this.text += this.lineBreak;
        }catch (e) {
          this.text += JSON.stringify(e);
          this.text += this.lineBreak;
        }
      },
      async getList(){
        try{
          //获取设备信息
          let info = await this.api.get_equipment_info();
          if(info.equipment_info){
            //存储设备信息
            this.$store.dispatch("addEquipmentInfo",info.equipment_info);
          }
        }catch(e){}
        try {
          let drug_channel = this.$store.state.equipmentInfo.drug_channel;
          this.channel = {
            aisleX:drug_channel.aisleX,
            aisleY:drug_channel.aisleY
          };

        }
        catch (e){
          console.error('初始化药道信息失败',e);
        }
      },
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
    },
    computed:{
    },
    watch:{
      text(val){
        this.$nextTick(() => {
          var container = this.$el.querySelector("#message");
          container.scrollTop = container.scrollHeight;
        });
      }
    },

    async destroyed(){
      if(this.status.scaning) this.stop_scan_qrcode();
      if(this.status.reading) this.stop_read_idcard();
      //清空通知
      this.api.on_notify_qrcode = null;
      this.api.on_notify_read_idcard = null;
      this.api.on_notify_measure_channel = null;
      this.api.on_notify_qrcode = null;
      this.api.on_notify_operate_vendor = null;
    }
  }
</script>

<style scoped>
  .debug {
    height: 100vh;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .box01{
    display: flex;
    height: calc(100% - 1.2rem);
  }
  .left{
    width: 50%;
    padding: .4rem;
    height: calc(100% - 1rem);
    overflow-y: auto;
  }
  .right{
    background:#000;
    width: 50%;
    padding: .05rem;
    font-size: .24rem;
    font-weight: 400;
    color: #FFFFFF;
    line-height: .33rem;
    white-space:normal;
    word-break:break-all;
    word-wrap:break-word;
    overflow-y: auto;
  }
  .el-custom /deep/ .el-input__icon{
    line-height: .48rem;
  }
  .el-custom /deep/ .el-input__inner{
    height: .48rem;
    line-height: .48rem;
  }
  .el-custom /deep/ .el-checkbox__inner{
    height: .28rem;
    width: .28rem;
    border-color: #979797;
  }
  .el-custom /deep/ .el-checkbox__inner::after{
    top: .05rem;
    left: .1rem;
    width: 4px;
  }
  .box01-com{
    padding: .2rem;
    border-bottom: .02rem solid #DCDCDC ;
    display: flex;
  }
  .box01-com-left{
    width: 1.3rem;
    min-width: 1.3rem;
    line-height: .48rem;
    font-size: .24rem;
    font-weight: 600;
    color: #666666;
  }
  .box01-com-right{
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
  }
  .btn{
    width: 2rem;
    height: .48rem;
    background: #EEEEEE;
    border-radius: .02rem;
    line-height: .48rem;
    text-align: center;
    font-size: .24rem;
    font-weight: 500;
    color: #666666;
    margin-right: .2rem;
  }
  .btn:hover{
    background: #EAF1FF;
    color: #377BF7;
  }
  .box01-font2{
    font-size: .20rem;
    font-weight: 600;
    color: #666666;
    margin-left: .1rem;
  }
</style>
