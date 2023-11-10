/* jshint esversion: 11 */
import React from "react";
import $ from "jquery";
import { Decrypt, getUrlParam } from "./tools/crypt";

// 测试(Test)/生产(Prod)环境标识
var ENV = "Prod";

// 生产环境
const secretProd = "lYKCOL2-010.xVMQYsKwcyRwGZOs3CbJgwmage1wby0BG7Hpm49FddM";
const secretIDProd = "Bot-BDChatbot-PRD-01";

/*
var secretKey = secretTest;
var secretID = secretIDText;

if (ENV == "Prod") {
  secretKey = secretProd;
  secretID = secretIDProd;
}
*/

/**
 * 限制只能在微信端打开
 */
/*
var APPID = 'BD-Chatbot';
var ua = navigator.userAgent.toLowerCase();
var isWeixin = (ua.indexOf('micromessenger') != -1);
if (!isWeixin) {
  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID;
}
*/
// 用户唯一标识
var userId = window.sessionStorage.getItem("UserID");
var secretKey = window.sessionStorage.getItem("secretKey");
var secretID = window.sessionStorage.getItem("secretID");

if (userId === null) {
  /**
   * 获取路由参数解密字符串
   */
  var scrmStr = getUrlParam('scrmStr'); 
  // scrmStr = 'TjXslLYJ6CsIBbiOZAf8jmAKaJkIU+BwYnhSDEbYUha4F4c1R58LUnEEyGNrvB4nAPJtVx+RqPDfYr6/ownknjWbqoQAp0mzGWLsc8saC0s=';

  if (scrmStr == null || scrmStr === '' || scrmStr == undefined || scrmStr == 'undefined') {
    userId = "999999999999";
     // window.location.replace('https://mobility.bdhealthcare.cn/404.html');
  }
  else {
    var decryptStr = JSON.parse(Decrypt(scrmStr, ENV));//解密字符串
    if (decryptStr.time != null || decryptStr.time != '' || decryptStr.time != undefined || decryptStr.time != 'undefined') {
      var getTime = decryptStr.time;
      var timestamp = Date.parse(new Date()); //获取当前时间戳(以s为单位) 
      timestamp = timestamp / 1000;

      var timeminit = timestamp - getTime;//校验时间差值是否符合规则
      var basetime = 1 * 60; // 1分钟时间
      // 时间Check 超过指定时间就拒绝连接，报404
      if (timeminit >= basetime) {
        // window.location.replace('https://mobility.bdhealthcare.cn/404.html');
      }
      userId = decryptStr.mid;
    }
  }
  // console.log('mid:',decryptStr.mid);
  // console.log('time:',decryptStr.time);
  // console.log('open_id:',decryptStr.open_id);
  window.sessionStorage.setItem("UserID", userId);
}

if (secretKey === null) {
  secretKey = secretProd;
  window.sessionStorage.setItem("secretKey", secretKey);
}

if (secretID === null) {
  secretID = secretIDProd;
  window.sessionStorage.setItem("secretID", secretID);
}

// 测试用 清除LocalStorage
// window.localStorage.clear();

var isShow = true;
/*
  判断是不是新用户，新用户显示一段动画
*/
var isExist = localStorage.getItem(userId);

if (isExist === null) {
  var curTime = new Date();
  var year = curTime.getFullYear();
  var month = ("0" + (curTime.getMonth() + 1)).slice(-2);
  var day = ("0" + curTime.getDate()).slice(-2);
  var hours = ("0" + curTime.getHours()).slice(-2);
  var minutes = ("0" + curTime.getMinutes()).slice(-2);
  var DateStr = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
  localStorage.setItem(userId, DateStr);
}
else {
  isShow = false;
  // window.localStorage.clear();
}

if (isShow) {
  var timeout = setTimeout(function(){
    var BDVideo = document.getElementById("BDVideo");
    BDVideo.muted = false;
    BDVideo.addEventListener("ended",function() {
    this.webkitExitFullScreen();
      $("#videoDiv").remove();
      clearTimeout(timeout);
    });
  }, 1000);
}

export default function showVideo() {
  if (isShow) {
    return (
        <div id="videoDiv"
          style={{ paddingBottom: "100%", position: "relative", textAlign: "center", height: "100%" }}>
          <video id="BDVideo" 
            style={{ position: "absolute",
                     objectFit: "contain",
                     transform: "translate(-50%, 0%)",
                     height: "100%" }}
            // src="https://mobility.bdhealthcare.cn/BD.MP4"
            src="./BD.MP4"
            type="video/mp4"
            autoPlay muted controls
            preload="true"
            x-webkit-airplay="true"
            poster="./BD.png"
            x5-video-player-fullscreen="true" />
        </div>
    );       
  }
  else {
    return (
        <div id="videoDiv"></div>
    );
  }
}