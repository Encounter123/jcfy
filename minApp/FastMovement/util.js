
let apiReq={
	req(obj){
		var method = obj.method ; // 请求方式,默认为GET
		var url = 'http://192.168.0.122:8080'+obj.url; // 请求路径 
		var data = obj.data||undefined; // 请求数据
		var header = obj.header; // 请求头
		var success = obj.success; // 成功回调函数
		uni.showLoading({title:'加载中...'});
		uni.request({
			url: url,
			data: data,
			method: method,
			header: header,
			success: ((res) => {
				if(res.statusCode === 200){
					success(res)
					uni.hideLoading();
				}else{
					uni.hideLoading();
					uni.showModal({
						content:"" + '请求失败'
					});
				}
			}),
			fail:((err)=>{
				fail(err)
			})
		})
	}
}
export default apiReq