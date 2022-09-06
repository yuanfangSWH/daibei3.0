//jsencrypt插件
import JSEncrypt from '../../common/js/jsencrypt.min.js';
//MD5加密
import md5 from 'js-md5';
var baseURL = 'http://ts.yuanfang.cn'
// 通过接口获取数据
function apiPost(url, parameter, data, method, callback) {
	uni.request({
		url: baseURL + url,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: data,
		method: method || 'post',
		success: (res) => {
			var code = res.data.code;
			//#ifdef H5
			var outurl = encodeURIComponent(window.location.href);//对url编码
			//#endif
			switch (parseInt(code)) {
				case 0:
					callback(true, res.data, code)
					break;
				case 301:
					console.log("强制重定向url");
					callback(false, res.data, code)
					break;
				case 401:
					console.log("身份信息已过期");
					//#ifdef H5
					window.location.href = "http://ts.rong298.cn/index/authorization?toredirect="+outurl
					//#endif
					uni.navigateTo({
						url: '/pages/login/login'
					})
					callback(false, res.data, code)
					break;
				case 403:
					console.log("非法请求");
					callback(false, res.data, code)
					break;
				case 404:
					console.log("请求路径存在，请检查url");
					callback(false, res.data, code)
					break;
				case 405:
					console.log("请求参数错误");
					callback(false, res.data, code)
					break;
				case 500:
					console.log("服务器内部错误");
					callback(false, res.data, code)
					break;
				case 503:
					console.log("服务器繁忙");
					callback(false, res.data, code)
					break;
				default:
					console.log("未知错误");
					callback(false, res.data, code)
			}
		},
		fail: (res) => {
			console.log(res.data);
		}
	});

}
export default {
	apiPost
}
