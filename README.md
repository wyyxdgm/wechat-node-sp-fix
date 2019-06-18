# wechat-node-sp-fix

- 基于 wechat-node-sp 修复部分bug

微信API for node.js，目前主要支持小程序及微信支付相关接口

微信小程序官方文档：https://developers.weixin.qq.com/miniprogram/dev/api/

微信支付官方文档：https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=5

## Installation

```
npm install wechat-node-sp-fix
```
## Usage

### 初始化

```js
var Wechat = require("wechat-node-sp-fix");

var wechatApi = Wechat({
    appId,
    appSecret,
    mch_id, //微信商户平台ID
    pfx: fs.readFileSync("./apiclient_cert.p12"), //微信商户平台支付正式
    payKey //微信商户平台API秘钥
})

```
### 微信登录相关

```js
//微信登录
var result = await wechatApi.login(code);
if (result.status === 200 && !result.data.errcode) {
    var data = {
        openid: result.data.openid,
        session_key: result.data.session_key,
        unionid: result.data.unionid
    }
    console.log(data);
}

//获取用户信息
var userInfo = await wechatApi.getWechatUserInfo(sessionKey, encryptedData, iv);
console.log(userInfo);
```

### 获取微信token

```js
var result = await wechatApi.getAccessToken();
if (result.data && !result.data.errcode) {
    var token = result.data.access_token;
    console.log(token);
}

```

### 微信小程序下单，获取支付参数

```js
var params = {
    body: "支付测试",
    notify_url: "https://PayNotify",
    openid: "openid",
    out_trade_no: "111111111111111111111111",
    spbill_create_ip: "客户端ip",
    total_fee: 1,
    trade_type: "JSAPI",
};
var result = await wechatApi.getMiniProgramPayParams(params)
console.log(result);

```

### 退款接口

```js
var params = {
    out_refund_no: "", //退款商户订单号，商户生成
    out_trade_no: "", //需退款订单的商户订单号(二选一)
    transaction_id: "" //需退款订单的微信订单号(二选一)
    refund_fee: 1,
    total_fee: 1
}
var result = await wechatApi.refund(params);
console.log(result)

```

### 查询订单

```js
// 通过商户订单号查
var result = await wechatApi.queryOrder(out_trade_no);

// 通过微信订单号查
var result = await wechatApi.queryOrder(transaction_id);

```

### 模板消息推送

```js
var msg = {
    "touser": "openId",
    "template_id": "模板id",
    "form_id": "formid", //表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id
    "page": "pages/test", //点击模板消息跳转页面，可不填
    "data": {
        "keyword1": {
            "value": "推送测试",
            "color": "#173177"
        },
        "keyword2": {
            "value": "推送测试",
            "color": "#173177"
        }
        ...
    }
}
var result = await wechatApi.sendMiniProgramTemplate(token, msg);
console.log(result)

```

```js
let msg = {
    "touser": "OPENID",
    "weapp_template_msg": { // 非必须，小程序模板消息相关的信息，可以参考小程序模板消息接口; 有此节点则优先发送小程序模板消息
        "template_id": "TEMPLATE_ID",
        "page": "page/page/index",
        "form_id": "FORMID",
        "data": {
            "keyword1": {
                "value": "339208499"
            },
            ...
        },
        "emphasis_keyword": "keyword1.DATA" // 小程序模板放大关键词
    },
    "mp_template_msg": { // 必须，公众号模板消息相关的信息，可以参考公众号模板消息接口；有此节点并且没有weapp_template_msg节点时，发送公众号模板消息
        "appid": "APPID ",
        "template_id": "TEMPLATE_ID",
        "url": "http://weixin.qq.com/download",
        "miniprogram": {
            "appid": "xiaochengxuappid12345",
            "pagepath": "index?foo=bar"
        },
        "data": {
            "first": {
                "value": "恭喜你购买成功！",
                "color": "#173177"
            },
            ...
        }
    }
}

var result = await wechatApi.sendUniformTemplate(token, msg);
console.log(result)
```


### 中间件

- 商户服务端处理微信的回调（koa为例）

```js
// 支付成功异步回调
router.use('/wxpay/paynotify', async function paynotify(ctx, next) {
    //获取微信推送数据
    var result = await wechatApi.getWechatNoticeData(ctx.req);
    //验证消息是否来自微信
    var isWxMessage = await wechatApi.wechatDataAuth(result);
    //通知微信处理结果
    await wechatApi.responseSuccess(ctx, "success"); //成功
    await wechatApi.responseFail(ctx, "fail"); //失败
});

// 退款异步回调
router.use('/wxpay/refundnotify', async function refundnotify(ctx, next) {
    var result = await wechatApi.getRefundData(ctx.req);
    //通知微信处理结果
    await wechatApi.responseSuccess(ctx, "success"); //成功
    await wechatApi.responseFail(ctx, "fail"); //失败
});

```

- 商户服务端处理微信的回调（express为例）

```js
// 支付成功异步回调
router.use('/wxpay/paynotify', function(req, res, next) {
    //获取微信推送数据
    var result = await wechatApi.getWechatNoticeData(req);
    //验证消息是否来自微信
    var isWxMessage = await wechatApi.wechatDataAuth(result);
    //通知微信处理结果
    await wechatApi.responseSuccess(res, "success"); //成功
    await wechatApi.responseFail(res, "fail"); //失败
});

// 退款异步回调
router.use('/wxpay/refundnotify', function(req, res, next) {
    var result = await wechatApi.getRefundData(req);
    //通知微信处理结果
    await wechatApi.responseSuccess(res, "success"); //成功
    await wechatApi.responseFail(res, "fail"); //失败
});

```
