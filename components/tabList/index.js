// components/tabList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [
        { 'img': '../../assets/img/worth-cacl/load-failed.png' ,'title':'标题1','subtitle':'副标题1','url':''}, 
        { 'img': '../../assets/img/worth-cacl/load-failed.png' ,'title':'标题2','subtitle':'副标题2','url':''}]
    },
    isExpand: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toExpand:function(){
      this.triggerEvent('change', !this.data.isExpand);
    },
    toPage:function(event){
      let url = event.currentTarget.dataset.obj.url
      wx.navigateTo({
        url: url,
      })
    }
  }
})
