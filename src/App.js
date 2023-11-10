/* jshint esversion: 11 */
import React, { useEffect, useRef } from "react";
import "./styles.css";
import { DirectLine } from 'botframework-directlinejs';
import $ from 'jquery';
import { getImgTargetUrl, getSelectOption } from "./tools/regular";
import { showBusinessManagers, showACElist, showAuditList, showSTSList, showQAList } from "./chat/chatbot";
import { getMessage, checkNeedMoreChoice, sentMoreChoice, sendMoreChoiceDircetly, sendMessageDircetly } from "./chat/chatbot";
import { setBind, clearBind, getIsNeedMoreChoice, setIsNeedMoreChoice } from "./tools/global";
import { Decrypt, getUrlParam } from "./tools/crypt";

// 测试(Test)/生产(Prod)环境标识
var ENV = "Prod";

// 测试环境
const secretTest = "pVjlp2LgEsw.g69j11yhkC9AFy7lW8IY51dn-tjnEoO0ZJWrA8Sw1-c";
// 生产环境
const secretProd = "lYKCOL2-010.xVMQYsKwcyRwGZOs3CbJgwmage1wby0BG7Hpm49FddM";

const secretIDProd = "Bot-BDChatbot-PRD-01";
const secretIDText = "ab-NNITBotservice-ea-tst-01";

var secretKey = secretTest;
var secretID = secretIDText;

if (ENV == "Prod") {
  secretKey = secretProd;
  secretID = secretIDProd;
}

/**
 * 限制只能在微信端打开
 */

var APPID = 'BD-Chatbot';
var ua = navigator.userAgent.toLowerCase();
var isWeixin = (ua.indexOf('micromessenger') != -1);
if (!isWeixin) {
  window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID;
}

// 用户唯一标识
var userId = "999999999999";

// 测试用 清除LocalStorage
// window.localStorage.clear();

/**
 * 获取路由参数解密字符串
 */
var scrmStr = getUrlParam('scrmStr'); 
// scrmStr = 'TjXslLYJ6CsIBbiOZAf8jmAKaJkIU+BwYnhSDEbYUha4F4c1R58LUnEEyGNrvB4nAPJtVx+RqPDfYr6/ownknjWbqoQAp0mzGWLsc8saC0s=';

if (scrmStr == null || scrmStr === '' || scrmStr == undefined || scrmStr == 'undefined') {
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

  // console.log('mid:',decryptStr.mid);
  // console.log('time:',decryptStr.time);
  // console.log('open_id:',decryptStr.open_id);
}


/*var userId = window.sessionStorage.getItem("UserID");
var secretKey = window.sessionStorage.getItem("secretKey");
var secretID = window.sessionStorage.getItem("secretID");
*/
/*console.log("Chat:" + userId);
console.log("Chat:" + secretKey);
console.log("Chat:" + secretID);*/

/**
 * 智能机器人
 * Direct Line API 3.0
 * 客户端库初始化
 * https://github.com/Microsoft/BotFramework-DirectLineJS
*/
var directLine = new DirectLine({
  secret: secretKey,
  token: '',
  conversationStartProperties: {
    locale: "zh-CN",
  }
});

export default function App() {
  const wrapper = useRef();

  useEffect(() => {
    const bot = new window.ChatSDK({
      root: wrapper.current,
      config: {
        navbar: {
          title: "智能助理"
        },
        avatarWhiteList: ['knowledge', 'recommend'],
        robot: {
          avatar: "BDAgent.png"
        },
        messages: [
          /*{
            type: "text",
            content: {
              text: "参数scrmStr = " + scrmStr 
            },
          },*/
          // 欢迎语
          {
            type: "text",
            content: {
              text: "&nbsp;&nbsp;&nbsp;&nbsp;欢迎来到碧迪医疗“渠道百事通”，我是你们的数智客服“迪”。\n" +

                "&nbsp;&nbsp;&nbsp;&nbsp;我可以帮您解答有关 STS/ACE 系统使用的相关问题，也可以回答有关库存盘点及其他碧迪医疗渠道管理服务相关问题。\n" +

                "&nbsp;&nbsp;&nbsp;&nbsp;您可以直接向我提问，也可以通过点选以下栏目常见问题后提问。\n" +

                "&nbsp;&nbsp;&nbsp;&nbsp;如您想在STS/ACE系统之间切换提问，请您根据系统提示或点选屏幕下方菜单选择相应系统即可。"
            }
          },
          {
            type: 'card',
            content: {
              code: 'recommend',
              data: {
                list: [
                  {
                    title: "1.系统登录问题",
                  },
                  {
                    title: "2.如何创建采购订单",
                  },
                  {
                    title: "3.如何查询订单状态",
                  },
                  {
                    title: "4.销量上报相关问题",
                  },
                  {
                    title: "5.库存调整相关问题",
                  },
                  {
                    title: "6.如何进行销量红冲",
                  },
                  {
                    title: "7.获取ACE/STS系统操作手册",
                  },
                  {
                    title: "8.获取电子签章平台操作手册",
                  },
                  {
                    title: "9.获取渠道互利平台操作手册",
                  },
                ]
              }
            }
          },
          // 默认转人工
          {
            type: 'cmd',
            content: {
              code: 'agent_join'
            }
          }
        ],
        quickReplies: [
          {
            name: 'ACE系统使用问题',
          },
          {
            name: 'STS系统使用问题',
          },
          {
            name: '库存盘点问题'
          },
          {
            name: '其他常见问题'
          },
          {
            name: '商务经理查询'
          }
        ],
        feedback: {
          // 点赞后出的文本
          textOfGood: '感谢您的评价！',
          // 点踩后出的文本
          textOfBad: '感谢您的评价，我们会继续努力哦！',
          // 点踩后是否显示反馈表单
          needFeedback: false
        }
      },
      bridge: {
        previewImage(data) {
          // 放开限制，允许放大
          var mvp = document.getElementById('viewport');
          mvp.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=yes, minimum-scale=1, maximum-scale=3, viewport-fit=cover');

          var imgsrc = data.urls[0];
          var opacityBottom = '<div id="opacityBottom" style="display: none" class="imgs-box"><img id="bigImg" class="bigImg" src="' + imgsrc + '" style="pointer-events: none;" ></div>';
          $(document.body).append(opacityBottom);
          $("#opacityBottom").addClass("opacityBottom");
          $("#opacityBottom").show();
          $("html,body").addClass("none-scroll");// 下层不可滑动
          $(".bigImg").addClass("bigImg");
          /* 隐藏 */
          $("#opacityBottom").on("click", clickToSmallImg);
          $(".bigImg").on("click", clickToSmallImg);
          function clickToSmallImg() {
            $("html,body").removeClass("none-scroll");
            $("#opacityBottom").remove();
            // 恢复对缩放的控制
            var mvp = document.getElementById('viewport');
            mvp.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1, viewport-fit=cover');
            // 回复页面原大小  
            var webZoom = document.getElementById('mainBody');
            webZoom.setAttribute("style", "-webkit-transform:scale(1)");
          }
        }, // 预览大图
      },
      requests: {
        /**
         * 点赞点踩接口（可选）
         * @param {string} data.msgId - 消息ID
         * @param {string} data.type - 点赞: good, 点踩: bad
         * @return {object}
        */
        evaluate(data) {
          return {
            data: {
              messageId: data.msgId,
              evaluateType: data.type,
            },
          };
        },
      },
      makeSocket({ ctx }) {
        /**
        * 转人工后收发消息
        * 将机器人返回的消息推送到屏幕上
        */
        directLine.activity$.filter(activity => activity.type === 'message' && activity.from.id === secretID).subscribe(
          message => {
            // 恢复限制
            var mestest = message.text;

            if (typeof (mestest) != undefined && typeof (mestest) != 'undefined' && mestest != null) {
              // 点踩点赞
              if (mestest.indexOf("点赞点踩") >= 0) {
                ctx.appendMessage({
                  type: 'card',
                  content: {
                    code: 'knowledge',
                    data: {
                      text: '请您点评本次解答是否正确，<br/>您的评价对我的成长至关重要！'
                    }
                  },
                  meta: {
                    evaluable: true // 是否展示点赞点踩按钮
                  }
                });
              }
              else {
                // 存在多条回答，需要先行判定系统
                if (checkNeedMoreChoice(ctx, message.text)) {
                  return;
                }
                // 通文本
                var botMessage = getMessage(message);
                ctx.appendMessage(botMessage);

                var messagetext = message.text;
                if (messagetext.indexOf("请问您想联系BD哪个省份的商务经理") != -1) {
                  showBusinessManagers(ctx);
                }
                //推荐列表卡片
                if (typeof (mestest) != undefined && typeof (mestest) != 'undefined' && mestest != null) {
                  var targetUrl = getImgTargetUrl(mestest);
                  if (targetUrl.length >= 1) {
                    ctx.appendMessage({
                      type: 'card',
                      content: {
                        code: 'recommend',
                        data: {
                          list: targetUrl
                        }
                      }
                    });
                  }

                  // 出问题的地方

                  var tarOptionUrl = getSelectOption(mestest);
                  if (tarOptionUrl.length >= 1) {
                    ctx.appendMessage({
                      type: 'card',
                      content: {
                        code: 'recommend',
                        data: {
                          list: tarOptionUrl
                        }
                      }
                    });
                  }
                }

                //商务经理卡片
                if (typeof (message.attachments) != undefined &&
                  typeof (message.attachments) != 'undefined' && message.attachments != null) {
                  var attachments = message.attachments;
                  if (attachments.length > 0 && attachments[0].contentType == 'application/vnd.microsoft.card.hero') {
                    if (typeof (attachments[0].content.buttons) != undefined &&
                      typeof (attachments[0].content.buttons) != 'undefined' && attachments[0].content.buttons != null) {
                      var buttons = attachments[0].content.buttons;
                      var titleListArr = [];
                      for (let button in buttons) {  //prop指对象的属性名
                        var titlestr = buttons[button].title;
                        var title = titlestr.replace(/\b\d+/gi, "");
                        titleListArr.push({
                          title: title
                        });
                      }
                      if (titleListArr.length > 0) {
                        ctx.appendMessage({
                          type: 'card',
                          content: {
                            code: 'recommend',
                            data: {
                              list: titleListArr
                            }
                          }
                        });
                      }
                    }
                  }
                }
              }
            }
            else {
              if (typeof (message.attachments) != undefined &&
                typeof (message.attachments) != 'undefined' && message.attachments != null) {
                var msgAttachments = message.attachments;
                if (msgAttachments.length > 0) {
                  if (msgAttachments[0].contentType == 'image/jpeg' ||
                    msgAttachments[0].contentType == 'image/png' || msgAttachments[0].contentType == 'image/jpg') {
                    //图片
                    ctx.appendMessage({
                      type: 'image',
                      content: {
                        picUrl: msgAttachments[0].contentUrl
                      }
                    });
                  }
                  else if (msgAttachments[0].contentType == 'application/pdf') {
                    var contentUrl = msgAttachments[0].contentUrl;
                    var contentName = msgAttachments[0].name;
                    if (contentName.indexOf("ACE 系统经销商培训手册") != -1) {
                      contentName = 'ACE 系统经销商培训手册__v1.0.pdf';
                    }
                    else if (contentName.indexOf("STS_经销商用户手册") != -1) {
                      contentName = 'STS_经销商用户手册_V1.6.pdf';
                    }
                    else if (contentName.indexOf("线上培训视频录制整合") != -1) {
                      contentName = '线上培训视频录制整合.pdf';
                    }
                    ctx.appendMessage({
                      type: 'card',
                      content: {
                        code: 'knowledge',
                        data: {
                          text: '<div>' + contentName + '  <a href="' + contentUrl + '" download="' + contentName + '"> 下载</a></div>'
                        }
                      }
                    });
                  }
                }
              }
            }
          }
        );

        // 推送消息到后台机器人
        return {
          send(msg) {
            // 恢复限制
            var mvp = document.getElementById('viewport');
            mvp.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1, viewport-fit=cover');

            // 不需要处理的数据直接返回
            var messagetext = msg.content.text;

            switch (messagetext) {
              case "继续查询":
              case " 继续查询":
                directLine.postActivity({
                  from: { id: userId, name: userId },
                  type: "message",
                  text: "1",
                }).subscribe();
                break;
              case "结束查询":
              case " 结束查询":
                directLine.postActivity({
                  from: { id: userId, name: userId },
                  type: "message",
                  text: "2",
                }).subscribe();
                break;
              case 'ACE系统使用问题':
              case 'ACE系统':
                if (getIsNeedMoreChoice()) {
                  setBind("ACE:");
                  sentMoreChoice(directLine, userId);
                }
                else {
                  setBind("ACE:");
                  showACElist(ctx);
                }
                break;
              case 'STS系统使用问题':
              case 'STS系统':
                if (getIsNeedMoreChoice()) {
                  setBind("STS:");
                  sentMoreChoice(directLine, userId);
                }
                else {
                  setBind("STS:");
                  showSTSList(ctx);
                }
                break;
              case '库存盘点问题':
                if (getIsNeedMoreChoice()) {
                  clearBind();
                  sentMoreChoice(directLine, userId);
                }
                else {
                  clearBind();
                  showAuditList(ctx);
                }
                break;
              case '其他常见问题':
                if (getIsNeedMoreChoice()) {
                  clearBind();
                  sentMoreChoice(directLine, userId);
                }
                else {
                  clearBind();
                  showQAList(ctx);
                }
                break;
              case "1.系统登录问题":
                messagetext = "系统登录问题";
                setIsNeedMoreChoice(false);
                sendMessageDircetly(ctx, messagetext, directLine, userId);
                break;
              case "2.如何创建采购订单":
                messagetext = "如何创建采购订单";
                setIsNeedMoreChoice(false);
                sendMessageDircetly(ctx, messagetext, directLine, userId);
                break;
              case "3.如何查询订单状态":
                messagetext = "如何查询订单状态";
                setIsNeedMoreChoice(false);
                sendMessageDircetly(ctx, messagetext, directLine, userId);
                break;
              case "4.销量上报相关问题":
                messagetext = "销量上报相关问题";
                setIsNeedMoreChoice(false);
                sendMessageDircetly(ctx, messagetext, directLine, userId);
                break;
              case "5.库存调整相关问题":
                messagetext = "库存调整相关问题";
                setIsNeedMoreChoice(false);
                sendMessageDircetly(ctx, messagetext, directLine, userId);
                break;
              case "6.如何进行销量红冲":
                messagetext = "如何进行销量红冲";
                setIsNeedMoreChoice(false);
                sendMessageDircetly(ctx, messagetext, directLine, userId);
                break;
              case "7.获取ACE/STS系统操作手册":
                messagetext = "获取ACE/STS系统操作手册";
                setIsNeedMoreChoice(false);
                sendMessageDircetly(ctx, messagetext, directLine, userId);
                break;
              case "8.获取电子签章平台操作手册":
                  messagetext = "电子签章";
                  setIsNeedMoreChoice(false);
                  sendMessageDircetly(ctx, messagetext, directLine, userId);
                  break;
              case "9.获取渠道互利平台操作手册":
                  messagetext = "渠道互利";
                  setIsNeedMoreChoice(false);
                  sendMessageDircetly(ctx, messagetext, directLine, userId);
                  break;
              default:
                if (getIsNeedMoreChoice()) {
                  sendMoreChoiceDircetly(ctx, messagetext, directLine, userId);
                }
                else {
                  sendMessageDircetly(ctx, messagetext, directLine, userId);
                }
                break;
            }
          }
        };
      },
    });
    bot.run();
  }, []);

  return (
    <div style={{ height: "100%" }} ref={wrapper} />
  );
}
