let conf = {};

try{
  const fs = require('fs');
  conf = fs.readFileSync("D:/xy/node/static/conf.json", "utf8");
  conf = JSON.parse(conf);
}catch(e){
  conf = require('D:/xy/node/static/conf.json');
}

//故障药道错误代码
conf.slotNoFaultCode = {
  401: '气压低',
};

//防止json文件中无defaultEquipmentInfo节点
if(!conf.defaultEquipmentInfo) conf.defaultEquipmentInfo = {};

export default conf;


// const conf = {
//   "resource": "http://dev.equipment.cinyou.cn:11080/resource/",
//   "apiServerUrl":"http://dev.equipment.cinyou.cn:11080/api/api/xy.fhhrconnect_server",
//   "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJlcXVpcG1lbnQiLCJpYXQiOjE1NzczNTA2NTcsImV4cCI6NDczMzExMDY1N30.07xHFbB3IUAAAlcZXHXxcwahcjPUG3u3tU0Cra_nk0w",
//   "wsUrl": "ws://localhost:10010/ui",
//   "faceScore": 0.6,
//   "faceRecognition": false,
//   "AllwaysOnUrl": "http://localhost:12321",
//   "cloudUrl": "https://124.71.149.203/consultation/api/v1",
//   "videoLabel": "",
//   "dept_id": "9b30b06b-b158-11eb-95ea-fa163e73cca3",
//   "RTCOption": {
//       "appId": "6860095b01bb4062aa7199d575af3ed6"
//   },
//   "adminPassword": "123456789"
// }

// export default conf ;