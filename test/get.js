const WeChatApi = require('../index');
let wechatApi = new WeChatApi({
	appId: 'wx1a3e5bf888ba6fc0',
	appSecret: 'CONFIG.appSecret'
});

let data = {
	"session_key": "wcdO+5PM+rJddHWYyiyAvA==",
	"encryptedData": "Zz64ATAfLC+sH8PveUq5brBqieiVYHkIY8o3d7wuBFFQ6IbaJjiUn+xmTY43OfdsSk8r8Kv2phavi61XGtAfFaGczW/FATMVUTIN2sT9+K3bWI/Y7BCBFPAXmXZZjSNiNQgnOM5EpevqLJ/PIu0pQPdJKQBUhDXNdhaEgK4rnX5Sfj71nNLtACdKoA13nx4XN3JKGYH1MnFHy7e9fkt6P6dlPF704gTkUVCrV//LlAFOR8T7akASylLGTw8/1Zy5Q2o3t240KO4/Dz3KU5jc0AyhjjC/xj0jG4mg6fyvK3URq5YjbhbkdyyVOSwH+IHV+qM8+j9VB1AnYideODvYHRW18baK3qLxPhEaAV2f9Q8h+q5RtxhGPMVFwOYjeQViyfy8R9GDRMeXLRzzY7aUukcE80uj51VOrORSgCeCWZnSPO0P2+x3thPaGOCo4ukvlbwoC9MvmiEx2F0kMtgMiA==",
	"iv": "klY4i+HWuNy1dPZxtvA8NA==",
	"level": "info",
	"message": "on_login-2--------before wechatApi.getWechatUserInfo"
}

let {
	session_key,
	encryptedData,
	iv
} = data;

wechatApi.getWechatUserInfo(session_key, encryptedData, iv)
	.then(res => {
		console.log('res');
		console.log(res);
	})
	.catch(err => {
		console.log('err');
		console.log(err);
	});
