/**
 * 先检查token
 * 再检查手机号
 */
function checkAuth(callack) {
  if (wx.getStorageSync('tel')) {
    callack()
  } else {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/tel/tel',
      })
    } else {
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }
  }
}
export default checkAuth