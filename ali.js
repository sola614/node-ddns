// https://hpdell.github.io/%E7%BC%96%E7%A8%8B/nodejs-ddns/index.html
// Node.js 实现阿里云域名的动态解析
const { getClientIp } = require("./common");
const Core = require("@alicloud/pop-core");

var newIP = "127.0.0.1";

var client = new Core({
  accessKeyId: "需更改",
  accessKeySecret: "需更改",
  endpoint: "https://alidns.aliyuncs.com",
  apiVersion: "2015-01-09",
});

var describeDomainRecordInfoParams = {
  RecordId: "需更改",
};

var updateDomainRecordParams = {
  RecordId: "需更改",
  RR: "需更改", //需要更改的域名记录
  Type: "A", //更改的类型
};

var requestOption = {
  method: "POST",
};
check();
clearInterval(timer);
var timer = setInterval(() => {
  check();
}, 2 * 60 * 1000);

async function check() {
  const ip = await getClientIp();
  newIP = ip.trim();
  client
    .request(
      "DescribeDomainRecordInfo",
      describeDomainRecordInfoParams,
      requestOption
    )
    .then((result) => {
      var oldIP = result.Value;
      if (oldIP != newIP) {
        updateDomainRecordParams = {
          ...updateDomainRecordParams,
          Value: newIP,
        };
        client
          .request(
            "UpdateDomainRecord",
            updateDomainRecordParams,
            requestOption
          )
          .then(() => {
            process.exit(0);
          })
          .catch((reason) => {
            console.error("UpdateDomainRecord error:", reason);
            process.exit(1);
          });
      } else {
        console.log("IP与记录一致无需更新");
      }
    })
    .catch((reason) => {
      console.error("DescribeDomainRecordInfo error:", reason);
      process.exit(1);
    });
}
