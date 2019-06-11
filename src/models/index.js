const context = require.context('./',false,/\.js$/); //false不便利文件夹

export default context
.keys()
.filter(item => item !== './index.js')//过滤当前js
.map(key=>context(key))//这里获取到key包含到context