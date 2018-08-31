Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
    cdata:{
      type:Object,
      value:{
        title: '组件标题title初始值',
        subtitle: '组件内容subtitle初始值'
      }
    }
  },
	
	/**
	 * 组件的方法列表
	 */
	methods: {
    toOriginal: function (event) {
      console.log('toOriginal',event)
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      })
    }
  },
	
	created: function(){
		// console.log('component_created')
	},
	attached: function () {
		// console.log('component_attached')
	}
});