//index.js
//获取应用实例
const app = getApp()
let { sayHello, request } = require('../../utils/util')
import es from '../../utils/test-es6'

Page({
  data: {
    motto: 'Hello World G',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    request('/').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    // wx.request({
    //   url: 'http://10.20.70.114:3000/',
    //   success: (res) => {
    //     console.log(res)
    //   },
    //   fail: (err) => {
    //     console.log(err)
    //   }
    // })
    es.testEs6()
    sayHello('Gys')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  async test () {
    const res = await request('/')
    console.log(res)
  }
})
