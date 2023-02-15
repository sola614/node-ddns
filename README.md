# node-ddns
自用nodejs版本的ddns脚本，间隔2分钟检测ip是否有更改  
## 支持方式：  
1、Cloudflare Api  
2、阿里DNS Api

## 使用方式：
1、下载
```
git clone https://github.com/sola614/node-ddns.git
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
cd ./node-ddns
npm i
最后：
npm run build:cf
或
npm run build:ali
```
