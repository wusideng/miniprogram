export class HttpService {
	/**
	 * get请求
	 * @param {String} url 接口地址
	 * @param params 参数 [可选]
	 * @param options 参数 [可选]
	 * @returns {Promise<Object>}
	 */
	get (url, params, option = {}) {
		return this.request('get', url, params, option);
	}
	
	/**
	 * post请求
	 * @param {String} url 接口地址
	 * @param params 参数
	 * @param options 参数 [可选]
	 * @returns {Promise<Object>}
	 */
	post (url, params, option = {}) {
		return this.request('post', url, params, option);
	}
	
	/**
	 * request请求处理
	 * @param {string} method
	 * @param {string} url
	 * @param params
	 * @param {object} options
	 *  options.loading?: boolean;      // 是否开启loading状态
	 *  options.interceptRes?: boolean; // 是否开启统一错误处理
	 *  options.localUrl?: boolean;     // 是否本地url，false: 根据配置文件 url会被重写, true: url保持原样不变
	 *  options.headers?: any;          // 头信息
	 *  options.responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';  // 响应类型
	 * @returns {Promise<Object>}
	 */
	request (method, url, params, options = {}) {
		return new Promise((resolve, reject) => {
			wx.request({
				url,
				header: options,
				data: params,
				method: method,
				success: (res) => {
					resolve(res.data);
				},
				fail: (err) => {
					console.log('error:', err);
					reject(err);
				}
			});
		});
	}
}


let instance = null;
const getInstance = () => {
	if (!instance) {
		instance = new HttpService();
	}
	return instance;
};

export const http = getInstance();