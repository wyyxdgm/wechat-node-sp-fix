const WeChatApi = require('../index');
let wechatApi = new WeChatApi({
	appId: 'wx1a3e5bf888ba6fc0',
	appSecret: 'CONFIG.appSecret'
});

let sessionKey = 'HGdhbfevicV8ufR1qE//3A==';
let encryptedData = "4s841WFYtWakT2EwfFb5tv1MO5XUo1/mR03zGCoGpjX/1YoPvarJYpBgufp7fwsPL0wny92q4ZZsLhPwEUI3C1QDsZMQLfv1yzvrBY/gsYsG8mJQQhFL81/zOajQrok1guRa0SElRMUt6x8XwgYCxnt7bSc3bfm2bwqK5HtjEljhqJcZKvyE4GDH/IoziTM9ffy2hOjJJIa3KcZGiwseCxqk1nXq/pc7xDs9in+YlXcbZJyIcEWOxM5mXHuI6sJvzZCTHMDzTLgIDEj8PDgDo+NdHZ8hsojf0J58G3YFNsRJJuzVL5k0ZYAib9ZEm0Z9efMdo7J4Sw5nckdfj/Psqu7ZbcNtLE+HPierGNkQOW66OVHfbuTvl2f0MEPzloqNa0HoDUklAJynh5MlfGMObjyHyU9yQAp4OLR7f5lhbR1fCaZW6bXhn8n7udkPaA1aOvoU9nwLLtmwLpMcKiXwnw==";
let iv = "3yKH3kqlXLCBmYoQAkOFzA==";

wechatApi.getWechatUserInfo(sessionKey, encryptedData, iv)
	.then(res => {
		console.log('res');
		console.log(res);
	})
	.catch(err => {
		console.log('err');
		console.log(err);
	});
