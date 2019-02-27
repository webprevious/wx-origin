import { BASE_URL } from '../config/index.js'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const sayHello = name => {
  console.log('hello ' + name)
}

const request = (url, method = 'GET', data = {}) => {
  return new Promise((resolve,reject)=>{
    wx.request({
      data,
      method,
      url: BASE_URL + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        resolve(res.data)
      },
      fail(err){
        wx.showToast({
          title:"网络异常,请连接网络",
          icon:"none",
          duration:3000
        })
        reject(err)
      }
    })
  })
}
module.exports = {
  formatTime,
  sayHello,
  request
}
