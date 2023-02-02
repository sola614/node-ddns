const { request, getClientIp } = require("./common");
const endpoint = "https://api.cloudflare.com/client/v4";
const zoneName = "example.com"; //域名后缀,需修改
const recordName = "test"; //域名记录,需修改
const dnsType = "A"; //解析类型,按需修改
const auth = {
  "X-Auth-Email": "账号邮箱", //账号邮箱，需修改
  "X-Auth-Key": "账号的Global API Key,获取https://dash.cloudflare.com/profile/api-tokens",//需修改
};
const headers = Object.assign(
  {
    "Content-Type": "application/json",
  },
  auth
);

let clientIp = "127.0.0.1";
let targetZone = null;
let targetRecord = null;

async function start() {
  const ip = await getClientIp();
  console.log("获取ip信息成功", ip.trim());
  if (ip === clientIp) {
    return;
  }
  clientIp = ip.trim();
  if (!targetZone) {
    // 获取用户所有zone
    console.log("获取获取用户所有zone");
    const { result: zones } = await getZone();
    if (!Array.isArray(zones)) {
      return;
    }
    targetZone = zones.find((item) => {
      return item.name === zoneName;
    });
  }

  if (targetZone && targetZone.id) {
    if (!targetRecord) {
      //获取dns列表
      console.log("获取dns列表");
      const { result: dnsRecords } = await getDnsRecord();
      if (!Array.isArray(dnsRecords)) {
        return;
      }
      targetRecord = dnsRecords.find((item) => {
        return item.name === `${recordName}.${zoneName}`;
      });
    }
    if (targetRecord && targetRecord.id) {
      update();
    } else {
      create();
    }
    //

    //更新dns
  } else {
    console.log("找不到对应域名信息！");
  }
}
function getZone() {
  return request({
    method: "GET",
    url: `${endpoint}/zones`,
    headers,
  });
}
function getDnsRecord() {
  return request({
    method: "GET",
    url: `${endpoint}/zones/${targetZone.id}/dns_records`,
    headers,
  });
}
function getRecordData(params) {
  // https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-create-dns-record
  return {
    type: dnsType,
    // comment: "测试",//备注
    content: clientIp,
    name: `${recordName}.${zoneName}`,
    priority: 10,
    proxied: false,
    // tags: ["owner:dns-team"],
    // ttl: 3600,
  };
}
async function update() {
  if (clientIp === targetRecord.content) {
    console.log("IP与记录一致无需更新");
    return;
  }
  console.log("更新记录");
  request({
    method: "PUT",
    url: `${endpoint}/zones/${targetZone.id}/dns_records/${targetRecord.id}`,
    headers,
    data: getRecordData(),
  });
}
async function create() {
  console.log("创建记录");
  request({
    method: "POST",
    url: `${endpoint}/zones/${targetZone.id}/dns_records`,
    headers,
    data: getRecordData(),
  });
}
start();
clearInterval(timer);
var timer = setInterval(() => {
  start();
}, 2 * 60 * 1000);
