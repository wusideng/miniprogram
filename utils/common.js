/**
 * url:https://github.com/1562066102/tanjie_small_program/blob/70880b328010a5bda55e2bd5bf37dfeee3e7859d/utils/common.js
 * launchApp页面：url:https://github.com/1562066102/tanjie_small_program/blob/70880b328010a5bda55e2bd5bf37dfeee3e7859d/pages/release/release.wxml
 */
function downloadApp(data){
  let content;
  if (data == 1) {
    content = '更多服务需在yooli app内才能使用';
  } else if (data == 2) {
    content = '小程序暂不支持该支付方式';
  } else {
    content = '小程序暂不支持观看视频';
  };
  wx.showModal({
    title: '下载yooli',
    content: content + '，是否下载yooli app？',
    success: function (res) {
      if (res.confirm) {
        wx.previewImage({
          urls: ['https://static.tanjie.shop/tanjie/xcx_code.png']
        })
      }
    }
  });
}
module.exports={
  downloadApp
}