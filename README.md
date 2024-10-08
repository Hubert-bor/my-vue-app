openobserve

账号：root@example.com

密码：Complexpass#123

# 预览
![alt text](./src/assets/image.png)
![alt text](./src/assets/detailPage.png)



# 使用 docker 启动

1. 安装 docker  镜像

```dockerfile
docker run -v $PWD/data:/data -e ZO_DATA_DIR="/data" -p 5080:5080 \
    -e ZO_ROOT_USER_EMAIL="root@example.com" -e ZO_ROOT_USER_PASSWORD="Complexpass#123" \
    public.ecr.aws/zinclabs/openobserve:latest
```

2. 启动 docker
3. 将浏览器指向[http://localhost:5080](http://localhost:5080/)并登录

   ```js
   // vite.config.ts 配置本地代理链接到 docker 服务
   proxy: {
         "/api/default": {
           target: "http://localhost:5080",
           changeOrigin: true,
         },
         "/config": {
           target: "http://localhost:5080",
           changeOrigin: true,
         },
         "/api": {
           target: "http://localhost:5080",
           changeOrigin: true,
         },
       },
   ```

   



## :link: [官方文档](https://openobserve.ai/docs/)

# mock 数据


## 使用 nodejs 设置 traces: 


### 克隆 sample-tracing-nodejs-javascript
```js
git clone https://github.com/openobserve/sample-tracing-nodejs-javascript
```
### 配置 tracing.js 文件

 :link: [文档链接](https://openobserve.ai/docs/ingestion/traces/nodejs/) 根据文档提示操作即可

 
```js
/*tracing.js*/
// Require dependencies
const opentelemetry = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const sdk = new opentelemetry.NodeSDK({
  // traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
  traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:5080/api/default/v1/traces", // 采集配置中获取
    headers: {
      Authorization: "Basic cm9vdEBleGFtcGxlLmNvbTpsNE1ZUjRWdU5PODJtbEJJ", // 采集配置中获取
    },
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: "nodejs-javascript-service",
});

sdk.start();
```

### 设置服务、应用程序
url 和 Authorization 获取位置在界面中采集配置中获取

### 浏览器访问 http://localhost:8080 进行追踪

运行命令

```
npm install

node --require './tracing.js' app.js
```

服务器现在在 8080 上运行，导航到 [http://localhost:8080](http://localhost:8080/) 刷新页面几次以获取更多导出的跟踪。

