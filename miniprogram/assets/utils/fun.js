const toast = str => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: str,
      icon: "none",
      duration: 2000,
      success: () => {
        setTimeout(() => {
          resolve()
        }, 2000)
      }
    })
  })
}
const successToast = str => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: str,
      icon: "success",
      duration: 2000,
      success: () => {
        setTimeout(() => {
          resolve()
        }, 2000)
      }
    })
  })
};
const showloading = () => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: "加载中",
      success: () => {
        resolve()
      }
    })
  })
};
const hideloading = () => {
  return new Promise((resolve, reject) => {
    wx.hideLoading({
      success: () => {
        resolve()
      }
    })
  })
};
const tijiaoloading = () => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: "提交中，请稍后…",
      success: () => {
        resolve()
      }
    })
  })
};
export default {
  toast: toast,
  successToast: successToast,
  showloading: showloading,
  hideloading: hideloading,
  tijiaoloading: tijiaoloading
}