<template>
    <div class="start">
        <input type="button" value="打开舱门" @click="openDoor()">
        <input type="button" value="关闭舱门" @click="closeDoor()">
        <input type="button" value="打印" @click="print()">
        <input type="button" value="开灯" @click="openLight()">
        <input type="button" value="关灯" @click="closeLight()">
    </div>
</template>

<script>
  export default {
    name: 'test',
    data () {
      return {
        width:0,
        height:0,
        step:0,
        photo:"",
        g_last_image_buffer:null
      }
    },
    async mounted(){

      this.api.on_notify_face_blob = async(bf)=>{
        /*let files = new window.File([blob], 'test.png', {type:'image/png'})
        this.photo = window.URL.createObjectURL(files);*/
        this.g_last_image_buffer = bf;
        let fr=new FileReader();
        fr.readAsArrayBuffer(this.g_last_image_buffer);
        let self = this;
        fr.onload=function(){
          let data=new Uint8Array(this.result);
          self.showPicture(data,self.width,self.height,self.step); // 显示
        }

      };
      this.api.on_notify_facematch_video = async (msg)=> {
        this.width = msg.facematchinfo.width;
        this.height = msg.facematchinfo.height;
        this.step = msg.facematchinfo.step;
      }

    },
    methods: {
      async openDoor(){
        //打开舱门
        await this.api.openDoor();
      },
      async closeDoor(){
        try{
          //打开舱门
          await this.api.closeDoor();
        }
        catch (e){

        }
      },
      async openLight(){
        this.api.optLight(1,94,1)
      },
      async closeLight(){
        this.api.optLight(1,94,0)
      },
      async print(){
        try{
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
          await this.api.print_ticket(info);
        }
        catch (e){
          console.error("打印失败：",e);
        }
      },
    },
    async destroyed(){
    }
  }
</script>

<style scoped>
    .start {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100vh;
        background: rgba(65, 187, 255, 1);
    }

</style>
