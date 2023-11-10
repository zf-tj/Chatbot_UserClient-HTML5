/* jshint esversion: 11 */
/**
 * 正则表达式匹配<a> 标签和<img>
 * @param {*} htmlstr 
 * @returns 
 */
export function getImgTargetUrl(htmlstr){
  //定义正则表达式
  var patternTagA= /<a[^>]*href=['"]([^"]*)['"][^>]*>(.*?)<\/a>/gim;
  var patternTagImgSrc = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>|\/>)/gim;
  var patternTagImg = /<img [^>]*src=['"]([^'"]+)[^>]*>/gim;
  var imgsrcArr=[];
  
  //解析a标签中的图片
  var tagAImgArr = htmlstr.match(patternTagA);
  if (typeof(tagAImgArr) != undefined && typeof(tagAImgArr) != 'undefined' && tagAImgArr != null) {
    for (var i = 0; i < tagAImgArr.length; i++) {
      var item = patternTagA.exec(tagAImgArr[i]);
      if (typeof(item) != undefined && typeof(item) != 'undefined' && item != null) {
        if (typeof(item) != undefined && typeof(item) != 'undefined' && item != null) {
          imgsrcArr.push({
            title:item[2]
          });
        }
        //设置lastIndex = 0
        patternTagImg.lastIndex = 0;
      }
      // 设置lastIndex = 0
      patternTagA.lastIndex = 0;
    }
  }
  //将已经解析过的a标签内容过滤掉，继续匹配没有a标签的图片
  var tagImgArr = htmlstr.replace(patternTagA,"").match(patternTagImg);
  if (typeof(tagImgArr) != undefined && typeof(tagImgArr) != 'undefined' && tagImgArr != null) {
    for (var j = 0; j < tagImgArr.length; j++) {
      var itemImg = patternTagImg.exec(tagImgArr[j]);
      if (typeof(itemImg) != undefined && typeof(itemImg) != 'undefined' && itemImg != null) {
        imgsrcArr.push({
          title:'',
          url:itemImg[1]
        });
      }
      // 设置lastIndex = 0
      patternTagImg.lastIndex = 0;
    }
  }
  return imgsrcArr;
}

/**
 * 正则表达式匹配<select> 标签和<option>
 * @param {*} htmlstr 
 * @returns 
 */
export function getSelectOption(htmlstr){
  //定义正则表达式
  var patternTagA = /<select[^>]*>(.*?)<\/select>/gim;
  var patternTagImg = /<option[^>]*>(.*?)<\/option>/gim;
  var optionArr=[];
  //解析a标签中的图片
  var tagAImgArr = htmlstr.match(patternTagA);
  if (typeof(tagAImgArr) != undefined && typeof(tagAImgArr) != 'undefined' && tagAImgArr != null) {
    for(var i = 0; i < tagAImgArr.length; i++) {
      var item = patternTagA.exec(tagAImgArr[i]);
      if (typeof(item) != undefined && typeof(item) != 'undefined' && item != null) {
        if (typeof(item) != undefined && typeof(item) != 'undefined' && item != null) {
          imgsrcArr.push({
            title:item[2]
          });
        }
        // 设置lastIndex = 0
        patternTagImg.lastIndex = 0;
      }
      // 设置lastIndex = 0
      patternTagA.lastIndex = 0;
    }
  }
  //将已经解析过的a标签内容过滤掉，继续匹配没有a标签的图片
  var tagImgArr = htmlstr.replace(patternTagA,"").match(patternTagImg);
  if (typeof(tagImgArr) != undefined && typeof(tagImgArr) != 'undefined' && tagImgArr != null) {
    for (var j = 0; j < tagImgArr.length; j++) {
      var itemImg = patternTagImg.exec(tagImgArr[j]);
      if (typeof(itemImg)!=undefined && typeof(itemImg)!='undefined' && itemImg!=null) {
        optionArr.push({
          title: itemImg[1]
        });
      }
      // 设置lastIndex = 0
      patternTagImg.lastIndex = 0;
    }
  }
  return optionArr;
}

/**
 * 正则匹配URL
 * @param {*} url 
 * @returns 
 */
export function getStrUrl(url) {
  //var reg= /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/gim;
  var reg= /(https?|http):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/gim;
  url = url.match(reg);
  return (url&&url.length?url[0]:null);
}
