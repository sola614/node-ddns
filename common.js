/*
 * @Descripttion: 文件描述
 * @Author: sola.zhang
 * @Date: 2023-02-02 14:29:42
 * @LastEditors: sola.zhang
 * @LastEditTime: 2023-02-02 15:27:05
 */
const axios = require("axios").default;
exports.getClientIp = () => {
  return request({
    method: "GET",
    url: `https://api.ip.sb/ip`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
function request(options) {
  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}
exports.request = request;
