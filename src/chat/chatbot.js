/* jshint esversion: 11 */
import { getBind, setBind, setIsNeedMoreChoice, clearBind, getIsNeedMoreChoice } from "../tools/global";
import { getStrUrl } from "../tools/regular";

// 判断是不是需要用户选择系统
const keyText = "SYSTEM_CMD_MORECHOICE";
var lastContentText = "";

const itemListACE = [
  '1. ACE 系统登录问题',
  '2. 销量上报相关问题',
  '3. 如何进行销量红冲',
  '4. 库存调整相关问题',
  '5. 获取 ACE 系统操作手册',
];
const itemListSTS = [
  '1. STS 系统登录问题',
  '2. STS 库存调整相关问题',
  '3. STS 订单管理相关问题',
  '4. 销量上报相关问题',
  '5. 如何进行销量红冲',
  '6. 获取 STS 系统操作手册',
];
const itemListAudit = [
  '1. 审计项目',
  '2. 审计范围',
  '3. 审计方法',
  '4. 违规定义与级别',
];
const itemListOther = [
  '1. 财务相关问题',
  '2. 供应链相关问题',
  '3. 两票制发票相关问题',
  '4. 产品使用过程中不良事件投诉',
  '5. 合规相关事件投诉方式',
];
/**
 * 机器人返回的消息对象
 */
var messageObjTest = {
  type:"text",
  content:{text: ''}
};

var messageObj = {
  type: 'card',
  content: {
    code: 'knowledge',
    data: {
      text: ''
    }
  }
};

/**
 * 过滤消息
 * message 机器人返回的消息对象
 */
export function getMessage(message) {
  var botMessage  = '抱歉这个问题我还需要继续研究.';
  if (typeof(message.text) != undefined && typeof(message.text) != 'undefined' && message.text != null) {
    var text = message.text;
    if (typeof(text) == undefined && typeof(text) == 'undefined' && text == null) {
      botMessage = ''; 
    }
    else {
      botMessage = text.replace(/<a[^>]*href=['"]([^"]*)['"][^>]*>(.*?)<\/a>/gim, '');// 正则替换标签
      botMessage = botMessage.replace(/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/gim, '');// 正则替换select标签
      var regUrl = getStrUrl(botMessage);
      //暂时先替换一个URL,如果有多个后续就做一个轮询
      if (regUrl != null) {
        botMessage = text.replace(/(https?|http):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/gim, '<a href="' + regUrl + '">' + regUrl + '</a>');// 正则替换url  
        botMessage = botMessage.replace(/\n/gim, '<br/>');//替换换行符
        messageObj.content.data.text = botMessage;
        return messageObj;
      }
      else {
        messageObjTest.content.text = botMessage; 
      }
    }
  }
  return messageObjTest;
}

export function showBusinessManagers(ctx) {
  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'promotion',
      data: {
        array: [
          {
            action: 'send',
            title: '北京',
            params: {
              content: '北京'
            }
          },
          {
            action: 'send',
            title: '天津',
            params: {
              content: '天津'
            }
          },
          
          {
            action: 'send',
            title: '上海',
            params: {
              content: '上海'
            }
          }
        ]
      }
    }
  });

  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'promotion',
      data: {
        array: [
          {
            action: 'send',
            title: '重庆',
            params: {
              content: '重庆'
            }
          },
          {
            action: 'send',
            title: '河北',
            params: {
              content: '河北'
            }
          },
          
          {
            action: 'send',
            title: '河南',
            params: {
              content: '河南'
            }
          }
        ]
      }
    }
  });

  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'promotion',
      data: {
        array: [
          {
            action: 'send',
            title: '湖北',
            params: {
              content: '湖北'
            }
          },
          {
            action: 'send',
            title: '湖南',
            params: {
              content: '湖南'
            }
          },
          
          {
            action: 'send',
            title: '江苏',
            params: {
              content: '江苏'
            }
          }
        ]
      }
    }
  });
  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'promotion',
      data: {
        array: [
          {
            action: 'send',
            title: '江西',
            params: {
              content: '江西'
            }
          },
          {
            action: 'send',
            title: '辽宁',
            params: {
              content: '辽宁'
            }
          },
          
          {
            action: 'send',
            title: '吉林',
            params: {
              content: '吉林'
            }
          }
        ]
      }
    }
  });
  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'promotion',
      data: {
        array: [
          {
            action: 'send',
            title: '黑龙江',
            params: {
              content: '黑龙江'
            }
          },
          {
            action: 'send',
            title: '陕西',
            params: {
              content: '陕西'
            }
          },
          
          {
            action: 'send',
            title: '山西',
            params: {
              content: '山西'
            }
          }
        ]
      }
    }
  });
  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'promotion',
      data: {
        array: [
          {
            action: 'send',
            title: '山东',
            params: {
              content: '山东'
            }
          },
          {
            action: 'send',
            title: '四川',
            params: {
              content: '四川'
            }
          },
          {
            action: 'send',
            title: '青海',
            params: {
              content: '青海'
            }
          }
        ]
      }
    }
  });
  ctx.appendMessage({
    type: 'card',
    content: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      code: 'promotion',
      data: {
        array: [
          {
            action: 'send',
            title: '安徽',
            params: {
              content: '安徽'
            }
          },
          {
            action: 'send',
            title: '海南',
            params: {
              content: '海南'
            }
          },
          
          {
            action: 'send',
            title: '广东',
            params: {
              content: '广东'
            }
          }
        ]
      }
    }
  });
  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'promotion',
      data: {
        array: [
          {
            action: 'send',
            title: '贵州',
            params: {
              content: '贵州'
            }
          },
          {
            action: 'send',
            title: '浙江',
            params: {
              content: '浙江'
            }
          },
          
          {
            action: 'send',
            title: '福建',
            params: {
              content: '福建'
            }
          }
        ]
      }
    }
  });

  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'promotion',
      data: {
        array: [
          {
            action: 'send',
            title: '甘肃',
            params: {
              content: '甘肃'
            }
          },
          {
            action: 'send',
            title: '云南',
            params: {
              content: '云南'
            }
          },
          
          {
            action: 'send',
            title: '西藏',
            params: {
              content: '西藏'
            }
          }
        ]
      }
    }
  });

  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'promotion',
      data: {
        array: [
          {
            action: 'send',
            title: '宁夏',
            params: {
              content: '宁夏'
            }
          },
          {
            action: 'send',
            title: '广西',
            params: {
              content: '广西'
            }
          },
          
          {
            action: 'send',
            title: '新疆',
            params: {
              content: '新疆'
            }
          }
        ]
      }
    }
  });

  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'promotion',
      data: {
        array: [
          {
            title: '-',
            params: {
              content: '-'
            }
          },
          {
            action: 'send',
            title: '内蒙古',
            params: {
              content: '内蒙古'
            }
          },
          {
            title: '-',
            params: {
              content: '-'
            }
          },
        ]
      }
    }
  });
}

export function showACElist(ctx) {
  setBind('ACE:');
  ctx.appendMessage({
    type: 'text',
    content: {
      text: '您现在可以咨询ACE 系统使用相关问题了，您可以点击如下常见问题列表，也可以直接向我提问。\n如您想继续提问其他类别问题，请记得先点击屏幕下方相应栏目进行切换。'
    }
  });

  var listValue = [];

  for (var i = 0; i < itemListACE.length; i++) {
    listValue.push({title: itemListACE[i]});    
  }

  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'recommend',
      data: {
        list: listValue,
      }
    }
  });
}

export function showSTSList(ctx) {
  setBind('STS:');
  ctx.appendMessage({
    type: 'text',
    content: {
      text: '您现在可以咨询STS 系统使用相关问题了，您可以点击如下常见问题列表，也可以直接向我提问。\n如您想继续提问其他类别问题，请记得先点击屏幕下方相应栏目进行切换。'
    }
  });

  var listValue = [];

  for (var i = 0; i < itemListSTS.length; i++) {
    listValue.push({title: itemListSTS[i]});    
  }

  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'recommend',
      data: {
        list: listValue,
      }
    }
  });
}

export function showAuditList(ctx) {
  ctx.appendMessage({
    type: 'text',
    content: {
      text: '您现在可以咨询库存盘点相关问题了，您可以点击如下常见问题列表，也可以直接向我提问。\n如您想继续提问其他类别问题，请记得先点击屏幕下方相应栏目进行切换。'
    }
  });
  var listValue = [];

  for (var i = 0; i < itemListAudit.length; i++) {
    listValue.push({title: itemListAudit[i]});    
  }

  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'recommend',
      data: {
        list: listValue,
      }
    }
  });
}

export function showQAList(ctx) {
  ctx.appendMessage({
    type: 'text',
    content: {
      text: '您现在可以咨询经销商其他常见问题了，您可以点击如下常见问题列表，也可以直接向我提问。\n如您想继续提问其他类别问题，请记得先点击屏幕下方相应栏目进行切换。'
    }
  });
  var listValue = [];

  for (var i = 0; i < itemListOther.length; i++) {
    listValue.push({title: itemListOther[i]});    
  }

  ctx.appendMessage({
    type: 'card',
    content: {
      code: 'recommend',
      data: {
        list: listValue
      }
    }
  });
}

export function sendMessageDircetly(ctx, messagetext, directLine, userId) {
  var contentText = messagetext.replace(/[:]/gim, '');//替换:
  lastContentText = contentText;
  var sendText  = getBind() + contentText;
  
  // 如果用户输入中包含ACE或STS，按照ACE或STS处理
  var isACE = false;
  var isSTS = false;
  var isMenu = false;
  

  var contentListACE = [
    'ACE 系统登录问题',
    '销量上报相关问题',
    '如何进行销量红冲',
    '库存调整相关问题',
    '获取 ACE 系统操作手册',
  ];
  var contentListSTS = [
    'STS 系统登录问题',
    'STS 库存调整相关问题',
    'STS 订单管理相关问题',
    '销量上报相关问题',
    '如何进行销量红冲',
    '获取 STS 系统操作手册',
  ];
  var contentListAudit = [
    '审计项目',
    '审计范围',
    '审计方法',
    '违规定义与级别',
  ];
  var contentListOther = [
    '财务相关问题',
    '供应链相关问题',
    '两票制发票相关问题',
    '产品使用过程中不良事件投诉',
    '合规相关事件投诉方式',
  ];
    
  for (var i = 0; i < itemListACE.length; i ++) {
    if (contentText == itemListACE[i]) {
      contentText = contentListACE[i];
      setBind("ACE:");
      sendText  = getBind() + contentText;
      lastContentText = "";
      isMenu = true;
      break;
    }
  }
  
  if (!isMenu) {
    for (i = 0; i < itemListSTS.length; i ++) {
      if (contentText == itemListSTS[i]) {
        contentText = contentListSTS[i];
        setBind("STS:");
        sendText  = getBind() + contentText;
        lastContentText = "";
        isMenu = true;
        break;
      }
    }
  }

  if (!isMenu) {
    for (i = 0; i < itemListAudit.length; i ++) {
      if (contentText == itemListAudit[i]) {
        clearBind();
        contentText = contentListAudit[i];
        sendText  = getBind() + contentText;
        lastContentText = "";
        isMenu = true;
        break;
      }
    }
  }

  if (!isMenu) {
    for (i = 0; i < itemListOther.length; i ++) {
      if (contentText == itemListOther[i]) {
        clearBind();
        contentText = contentListOther[i];
        sendText  = getBind() + contentText;
        lastContentText = "";
        isMenu = true;
        break;
      }
    }
  }

  if (!isMenu) {
    if (contentText.toUpperCase().indexOf("ACE") != -1 &&
      messagetext != "获取ACE/STS系统操作手册") {
      isACE = true;
    }
    if (contentText.toUpperCase().indexOf("STS") != -1 &&
      messagetext != "获取ACE/STS系统操作手册") {
      isSTS = true;
    }

    if (isACE && isSTS) {
      checkNeedMoreChoice(ctx, keyText);
      return;
    }
    else if (isACE) {
      setBind('ACE:');
      lastContentText = "";
      sendText  = getBind() + contentText.toUpperCase();
    }
    else if (isSTS) {
      setBind('STS:');
      lastContentText = "";
      sendText  = getBind() + contentText.toUpperCase();
    }
    else if (contentText == '商务经理查询') {
      clearBind();
      lastContentText = "";
      sendText = '商务经理查询';
    }
    else if (contentText == '商务经理联系信息') {
      clearBind();
      lastContentText = "";
      sendText  = '商务经理联系信息';
    }
  }
  directLine.postActivity({
    from: { id: userId, name: userId }, 
    type: 'message',
    text: sendText
  }).subscribe();  
}

export function checkNeedMoreChoice(ctx, messagetext) {
  if (messagetext == keyText) {
    setIsNeedMoreChoice(true);
                  
    ctx.appendMessage({
      type: 'text',
      content: {
        text: "目前您还未指定问题所属系统，请先选择如下："
      }
    });
    ctx.appendMessage({
      type: 'card',
      content: {
        code: 'recommend',
        data: {
          list: [
            {
              title: 'ACE系统'
            },
            {
              title: 'STS系统'
            },
          ]
        }
      }
    });
   
    return true;
  }

  return false;
}

export function sentMoreChoice(directLine, userId) {
  var sendText = getBind() + lastContentText;
  directLine.postActivity({
    from: { id: userId, name: userId }, 
    type: 'message',
    text: sendText,
  }).subscribe();
  setIsNeedMoreChoice(false);
}

export function sendMoreChoiceDircetly(ctx, messagetext, directLine, userId) {
   var contentText = messagetext.replace(/[:]/gim, '');//替换:
  
  // 如果用户输入中包含ACE或STS，按照ACE或STS处理
  var isACE = false;
  var isSTS = false;
  
  if (contentText.toUpperCase().indexOf("ACE") != -1) {
    isACE = true;
  }
  if (contentText.toUpperCase().indexOf("STS") != -1) {
    isSTS = true;
  }
  
  if (isACE && isSTS) {
    checkNeedMoreChoice(ctx, keyText);
    return;
  }
  else if (isACE) {
    setBind('ACE:');
  }
  else if (isSTS) {
    setBind('STS:');
  }
  else {
    checkNeedMoreChoice(ctx, keyText);
    return;
  }
  sentMoreChoice(directLine, userId);
  return;
}
