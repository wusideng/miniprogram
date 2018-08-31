// components/dataGrid/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hdata:{
      type:Array,
      value: ['月份', '本金余额（¥）', '月收本息（¥）', '月收本金（¥）', '利息（¥）']
    },
    bdata:{
      type:Array,
      value: [{
        "id": null,
        "phaseNumber": 1,
        "plannedTermAmount": 1.03,
        "plannedTermInterest": 0.04,
        "plannedTermPrinciple": 0.99,
        "termRemainingPrincipal": 4.01
      }, {
        "id": null,
        "phaseNumber": 2,
        "plannedTermAmount": 1.03,
        "plannedTermInterest": 0.04,
        "plannedTermPrinciple": 0.99,
        "termRemainingPrincipal": 3.02
      }]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
