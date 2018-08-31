// components/modal/index.js
Component({
	/**
	 * 组件的属性列表
	 * 提供三种模式 1 确定，取消 confirm，2 确定 prompt，3 关闭按钮 alert
	 *
	 * 添加modalStyle maskStyle 适配Page滚动情况下 内容滚动
	 */
	properties: {
		customContent: {
			type:Boolean,
			value:true
		},
		model:{
			type:String,
			value:'confirm'
		},
		title:{
			type:String,
			value:''
		},
		content:{
			type:String,
			value:''
		},
		cancelText:{
			type:String,
			value:'取消'
		},
		confirmText:{
			type:String,
			value:'确定'
		},
		modalStyle:{
			type:String,
			value:''
		},
		maskStyle:{
			type:String,
			value:''
		}
	},
	
	/**
	 * 组件的初始数据
	 */
	data: {
		hasClose:false,
		hasConfirm:true,
		hasCancel:false
	},
	attached(){
		switch (this.data.model){
			case 'confirm':
				this.setData({
					hasClose:false,
					hasConfirm:true,
					hasCancel:true
				})
				break;
			case 'prompt':
				this.setData({
					hasClose:false,
					hasConfirm:true,
					hasCancel:false
				})
				break;
			case 'alert':
				this.setData({
					hasClose:true,
					hasConfirm:false,
					hasCancel:false
				})
				break;
		}
	},
	detached(){
	},
	/**
	 * 组件的方法列表
	 * 回调事件提供：closeEvent, sucessEvent, cancelEvent
	 */
	methods: {
		toClose () {
			this.triggerEvent('closeEvent', 'close', 'myEventOption')
		},
		toCancel(){
			this.triggerEvent('cancelEvent', 'cancel', 'myEventOption')
		},
		toConfirm(){
			this.triggerEvent('confirmEvent', 'ok', 'myEventOption')
		}
	}
});
