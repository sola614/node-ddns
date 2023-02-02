# node-ddns
自用nodejs版本的ddns脚本  
## 支持方式：  
1、Cloudflare Api

## 使用方式：
1、下载
```
git clone
```
2、安装nodejs
```
wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
reboot
nvm install stable
```
3、安装pm2
```
npm i pm2 -g
```
4、使用pm2运行
```
pm2 start ./cf-ddns.js --name cf-ddns --log-date-format="YYYY-MM-DD HH:mm:ss"
```
