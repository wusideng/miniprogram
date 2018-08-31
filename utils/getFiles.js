function getOriginalList () {
	return [
		{ 'title': 'modal', 'subtitle': '模态窗口', 'url': '/pages/original/modal/index' },
		{ 'title': 'swiper', 'subtitle': '滑块视图', 'url': '/pages/original/swiper/index' },
		{ 'title': 'plot', 'subtitle': '绘图-动画绘制', 'url': '/pages/original/worth-calc/plot/index' },
		{ 'title': 'user-img', 'subtitle': '绘图-图片绘制', 'url': '/pages/original/worth-calc/user-img/index' },
		{ 'title': 'event', 'subtitle': '事件执行顺序及触发', 'url': '/pages/original/event/index' },
		// { 'title': 'index', 'subtitle': '索引', 'url':'/pages/original/index/index'},
		{ 'title': 'tab', 'subtitle': 'tab切换，滑动动画', 'url': '/pages/original/tab/index' },
		{ 'title': 'tree', 'subtitle': '树状菜单', 'url': '/pages/original/tree/index' },
		{ 'title': 'chart', 'subtitle': '图表', 'url': '/pages/original/chart/index/index' },
		{ 'title': 'data-grid', 'subtitle': '表格', 'url': '/pages/original/data-grid/index' },
    { 'title': 'calendar', 'subtitle': '日历', 'url': '/pages/original/calendar/index' }];
}

function getDemoList () {
	return [
		{ 'title': 'input', 'subtitle': 'input 手机号格式', 'url': '/pages/demo/input/index' },
		{ 'title': 'encrypt', 'subtitle': '加密', 'url': '/pages/original/encrypt/index' },
		{ 'title': 'get-userinfo', 'subtitle': '微信升级getUserInfo使用详细', 'url': '/pages/demo/get-userinfo/index' },
		{ 'title': 'promise', 'subtitle': '异步调用', 'url': '/pages/demo/object-values/index' },
		{ 'title': 'monitoring', 'subtitle': '监控及埋点', 'url': '/pages/demo/monitoring/index' },
		{ 'title': 'phone', 'subtitle': '调用手机功能', 'url': '/pages/demo/phone/index' },
		{ 'title': 'image', 'subtitle': 'icon,base64', 'url': '/pages/demo/icon/index' },
		{ 'title': 'animation', 'subtitle': 'animation', 'url': '/pages/demo/animation/index' },
    { 'title': 'css', 'subtitle': 'css样式示例', 'url': '/pages/demo/css/index' }
	];
}

export { getOriginalList, getDemoList };