// components/tab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:['tab1','tab2','tab3']
    },
    activeIndex:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab:function(event){
      this.activeIndex=event.currentTarget.dataset.index
      let obj = { activeIndex : this.activeIndex}
      this.triggerEvent('change', obj);
    }
  }
})
