/* jshint esversion: 11 */
import CryptoJS from "crypto-js";

const keyParamTest = CryptoJS.enc.Utf8.parse('23D6184F39C38E25');// 密钥
const keyParamProd = CryptoJS.enc.Utf8.parse('4FD516F08B7F7079');// 密钥
const ivParamTest  = CryptoJS.enc.Utf8.parse('64E23240280CAA8B');// 偏移量
const ivParamProd  = CryptoJS.enc.Utf8.parse('3CEE05B912DB92CE');// 偏移量

/** AES 解密 */
export function Decrypt(word, ENV) {
  var keyParam  = keyParamTest;
  var ivParam   = ivParamTest;
    
  if (ENV == "Prod") {
    keyParam  = keyParamProd;
    ivParam   = ivParamProd;
  }
    
  // 默认的KEY与iv与后端保持一致，不采用后端传值密钥
  var base64  = CryptoJS.enc.Base64.parse(word);
  var src     = CryptoJS.enc.Base64.stringify(base64);
  var decrypt = CryptoJS.AES.decrypt(src, keyParam, {
    iv  : ivParam,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

/**
 *获取url中的参数
 */
export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substring(1).match(reg);  //匹配目标参数
  if (r != null) {
    return decodeURI(r[2]);
  }
  
  return null; //返回参数值
}
