// reg
import 'babel-polyfill';
require('es6-promise').polyfill();
import 'fetch-detector';
import 'fetch-ie8';
require('./noCaptcha')
const mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
const emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
const allLocales = require('../locales.json');
const enPathReg = /\/en\/(.*)/
const hkPathReg = /\/hk\/(.*)/;
const mapLocaleToFolder = {
  'zh-cn': '',
  'zh-tw': '/hk',
  'en-US': '/en'
}

const openNewWindow = (url) => {
  window.location.href = url;
};

const isPC = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let v = 0; v < Agents.length; v += 1) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

function isIE() {
  if (!!window.ActiveXObject || "ActiveXObject" in window)
    return true;
  else
    return false;
}

var joinListOnClick = function (index) {
  var joinLists = document.getElementsByClassName('list-item');
  const joinListsArr = [...joinLists]
  var currentOpenIndex = joinListsArr.findIndex((item, index) => item.className.indexOf('list-select') > -1)
  joinLists[currentOpenIndex].className = 'list-item'
  joinLists[index].className = 'list-item list-select';
}

const toggleLoginModalVisible = (e) => {
  e.stopPropagation();
  const loginModal = document.getElementById('login-modal');
  const className = loginModal.className;
  if (className === 'login-modal') {
    const hostsName = document.getElementById('input-hosts');
    hostsName.focus();
    loginModal.className = 'login-modal modal-show';
  } else {
    const hostsName = document.getElementById('input-hosts');
    hostsName.value = null;
    const parent = hostsName.parentNode.parentNode;
    if (parent.className.indexOf('err') > -1) {
      parent.className = parent.className.replace(/err/, '')
    }
    loginModal.className = 'login-modal';
  }
};

// cover
const showCover = () => {
  const cover = document.getElementById('cover');
  if (cover) {
    cover.className = 'cover-show';
  }
};

const hideCover = () => {
  const cover = document.getElementById('cover');
  if (cover) {
    cover.className = '';
  }
};

const closeApplicationModal = () => {
  const applicationModal = document.getElementById('modal-application');
  if (applicationModal) {
    hideCover();
    applicationModal.className = 'modal';
  }
};
const closeleLoginModal = () => {
  const applicationModal = document.getElementById('login-modal');
  if (applicationModal) {
    const hostsName = document.getElementById('input-hosts');
    hostsName.value = null;
    const parent = hostsName.parentNode.parentNode;
    if (parent.className.indexOf('err') > -1) {
      parent.className = parent.className.replace(/err/, '')
    }
    applicationModal.className = 'login-modal';
  }
};

function parseJSON(response) {
  if (response.status === 204) {
    return Promise.resolve({ data: 'success' });
  }
  return response.json();
}

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = await parseJSON(response).then(data => data);
  // 提示请求错误
  // errorMessage(response.status);
  throw error;
}

const request = (url, params) => {
  return fetch(
    `${window.backhost}${url}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(params)
    }
  )
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
};

const requestIE = (url, params) => {
  let xhr;
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xhr = new XMLHttpRequest();
  } else {
    // IE6, IE5 浏览器执行代码
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      return Promise.resolve({ data: JSON.parse(xhr.responseText) })
    }
  }

  xhr.open("POST", `${window.backhost}${url}`, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhr.send(JSON.stringify(params));
}

const onChangeClearErr = (item) => {
  if (item && item.className !== "form-item") {
    item.className = "form-item";
  }
};

const addItemListen = () => {
  const mapItems = (items) => {
    for (let i = 0; i < items.length; i++) {
      const itemBlock = items[i];
      const itemInput = itemBlock.querySelector('input');
      if (itemInput) {
        const onChange = () => {
          onChangeClearErr(itemBlock);
        };
        itemInput.addEventListener('input', onChange, true);
      }
    }
  };

  try {
    if (form1) {
      const form1s = form1.querySelectorAll('.form-item') || [];
      mapItems(form1s);
    }
  } catch (e) {
  }
  try {
    if (formModal) {
      const formModals = formModal.querySelectorAll('.form-item');
      mapItems(formModals);
    }
  } catch (e) {
  }
  try {
    if (formReserve) {
      const formReserves = formReserve.querySelectorAll('.form-item') || [];
      mapItems(formReserves);
      const itemBlock = formReserve.querySelector('.form-wrap');
      const itemTextarea = itemBlock.querySelector('textarea');
      const onChange = () => {
        itemBlock.className = 'form-wrap';
      };
      itemTextarea.addEventListener('input', onChange, true);
    }
  } catch (e) {
  }
};

const validateTextarea = (value = '', item) => {
  if (value.length === 0) {
    const localeId = item.getAttribute('data-locale-id');
    item.setAttribute('data-err', allLocales[localeId][getLocalLocale()]);
    item.className = "form-wrap errTextarea";
    return false;
  }

  item.className = "form-wrap";
  return true
};

const validate = (value = '', item, regs = {}) => {
  const { reg, negateReg } = regs;
  let i = 0
  if (value.length === 0) {
    const localeId = item.getAttribute('data-locale-id');
    item.setAttribute('data-err', allLocales[localeId][getLocalLocale()]);
    item.className = "form-item err";
    i += 1
  }

  if (reg && reg.test(value)) {
    console.log(reg, reg.test(value))
    const localeId = item.getAttribute('data-input-locale-id')
    item.setAttribute('data-err', allLocales[localeId][getLocalLocale()]);
    item.className = "form-item err";
    i += 1
  }

  if (negateReg && negateReg.test(value)) {
    console.log(negateReg, negateReg.test(value))
    const localeId = item.getAttribute('data-input-locale-id')
    item.setAttribute('data-err', allLocales[localeId][getLocalLocale()]);
    item.className = "form-item err";
    i += 1
  }
  if (i > 0) {
    return false
  }

  item.className = "form-item";
  return true;
};

const clearForm = () => {
  form1.name.value = '';
  form1.email.value = '';
  form1.mobile.value = '';
  form1.company.value = '';
  form1.department.value = '';
  form1.title.value = '';
};

const getSource = () => {
  const matchBackHost = window.backhost.match(/(.*):\/\/(.*)\.(.*)\.(.*)/)
  return '官网 - www' + '.' + matchBackHost[3] + '.' + matchBackHost[4]
}

const submitForm = () => {
  const name = form1.name.value;
  const email = form1.email.value;
  const mobile = form1.mobile.value;
  const company = form1.company.value;
  const department = form1.department.value;
  const title = form1.title.value;

  const allItem = form1.querySelectorAll('.form-item');
  const validateAll = () => {
    let isErr = false;

    if (!validate(name, allItem[0])) {
      isErr = true;
    }
    if (!validate(email, allItem[1], { negateReg: emailReg })) {
      isErr = true;
    }
    if (!validate(mobile, allItem[2], { reg: mobileReg })) {
      isErr = true;
    }
    if (!validate(company, allItem[3])) {
      isErr = true;
    }
    if (!validate(department, allItem[4])) {
      isErr = true;
    }
    if (!validate(title, allItem[5])) {
      isErr = true;
    }
    return isErr;
  };

  if (
    validateAll()
  ) {
    return false;
  }

  const params = {
    name,
    email,
    mobile,
    company,
    department,
    title,
    source: getSource()
  };
  request('/website/trail', params)
    .then(({ data }) => {
      if (data) {
        closeApplicationModal();
        clearForm();
        onSucceed();
      } else {
        onErr();
      }
    });
};

const clearFormReserve = () => {
  formReserve.name.value = "";
  formReserve.email.value = "";
  formReserve.mobile.value = "";
  formReserve.company.value = "";
  formReserve.type[0].checked = true;
  formReserve.type[1].checked = false;
  formReserve.content.value = "";
};


const submitFormReserve = () => {
  const type1 = formReserve.type[0].checked;
  const type2 = formReserve.type[1].checked;
  const typeValue = () => {
    if (type1) {
      return 0;
    }
    if (type2) {
      return 1;
    }
    return undefined;
  };

  const name = formReserve.name.value;
  const email = formReserve.email.value;
  const mobile = formReserve.mobile.value;
  const company = formReserve.company.value;
  const type = typeValue();
  const content = formReserve.content.value;
  const params = {
    name,
    email,
    mobile,
    company,
    type,
    content,
    source: getSource()
  };

  const allItem = formReserve.querySelectorAll('.form-item');
  const textareaItem = formReserve.querySelector('.form-wrap');

  const validateAll = () => {
    let isErr = false;
    if (!validate(name, allItem[0])) {
      isErr = true;
    }
    if (!validate(email, allItem[1], { negateReg: emailReg })) {
      isErr = true;
    }
    if (!validate(mobile, allItem[2], { reg: mobileReg })) {
      isErr = true;
    }
    if (!validate(company, allItem[3])) {
      isErr = true;
    }
    if (!validateTextarea(content, textareaItem)) {
      isErr = true;
    }
    return isErr;
  };

  if (
    validateAll()
  ) {
    return false;
  }


  request('/website/feedback', params)
    .then(({ data }) => {
      if (data) {
        onSucceed();
        clearFormReserve();
      } else {
        onErr();
      }
    });
};

const opentNewWindow = () => {
  const hostsName = document.getElementById('input-hosts');
  const matchBackHost = window.backhost.match(/(.*):\/\/(.*)\.(.*)\.(.*)/)
  request('/website/domain', { domain: hostsName.value })
    .then((res) => {
      const data = res.data || {};
      if (data.exists === 1) {
        openNewWindow(matchBackHost[1] + '://' + hostsName.value + '.' + matchBackHost[3] + '.' + matchBackHost[4] + '/accounts/login');
        hostsName.value === null
        closeleLoginModal();
      } else {
        const parent = hostsName.parentNode.parentNode;
        parent.setAttribute('class', parent.className + ' ' + 'err')
      }
    });
};

const jumpToProduct = () => {
  const hostsName = document.getElementById('input-register');
  const matchBackHost = window.backhost.match(/(.*):\/\/(.*)\.(.*)\.(.*)/)

  request('/website/domain', { domain: hostsName.value })
    .then((res) => {
      const data = res.data || {};
      if (data.exists === 1) {
        window.location.href = matchBackHost[1] + '://' + hostsName.value + '.' + matchBackHost[3] + '.' + matchBackHost[4] + '/accounts/signup'
        hostsName.value === null
        toogleJoinModal('hide')
      } else {
        const parent = hostsName.parentNode.parentNode;
        parent.setAttribute('class', parent.className + ' ' + 'err')
      }
    });
}

const jumpHomePage = () => {
  window.location.href = window.host;
};

const toggleNavModalVisible = (type) => {
  const modal = document.getElementById("nav-modal-id");
  if (modal) {
    modal.className = type === 'show' ? 'nav-modal modal-show' : "nav-modal";
  }
};

const loginCellOnKeyDown = (e) => {
  if (e.keyCode === 13) {
    opentNewWindow();
    return false;
  }
  return true;
};

// tootip
const onSucceed = () => {
  const tootipSucceed = document.getElementById('tootip-succeed');
  if (tootipSucceed) {
    showCover();
    tootipSucceed.className = 'tootip-modal tootip-modal-show';
    setTimeout(function () {
      hideTootip()
      hideCover()
    }, 3000)
  }
};
const onErr = () => {
  const tootipErr = document.getElementById('tootip-err');
  if (tootipErr) {
    showCover();
    tootipErr.className = 'tootip-modal tootip-modal-show';
    setTimeout(function () {
      hideTootip()
      hideCover()
    }, 3000)
  }
};

const hideTootip = () => {
  const tootipSucceed = document.getElementById('tootip-succeed');
  const tootipErr = document.getElementById('tootip-err');
  if (tootipErr && tootipErr.className !== 'tootip-modal') {
    hideCover();
    tootipErr.className = 'tootip-modal';
  }
  if (tootipSucceed && tootipSucceed.className !== 'tootip-modal') {
    hideCover();
    tootipSucceed.className = 'tootip-modal';
  }
};

// const requestWx = (url, params) => {
//   return fetch(
//     `https://api.elephantbi.com${url}`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8'
//       }
//     }
//   )
//     .then(function (response) {
//       if (response.status >= 200 && response.status < 300) {
//         return response.json();
//       }

//       const error = new Error(response.statusText);
//       error.response = response;
//       throw error;
//     })
//     .then(data => ({ data }))
//     .catch(err => ({ err }));
// };

// const authlink = () => {
//   requestWx('/wx/auth/link')
//     .then((res) => {
//       const link = res.data.auth_link;
//       openNewWindow(link);
//     });
// };
// const wxregisterlink = () => {
//   requestWx('/wx/register/link')
//     .then((res) => {
//       const link = res.data.register_link;
//       openNewWindow(link);
//     });
// };

// 微信扫码登录 服务
// fixed url
// const FIXED_URL = window.OAUTHURL;
// const gennerateFixedUrlRedirect = (rUrl) => {
//   return `${FIXED_URL}/login?redirect_url=${rUrl}`;
// };

// 单点登录
// const REDIRECT_URL_SSO = encodeURIComponent(`${FIXED_URL}/server_redirect?env=${window.imageEnv}`);
// const gennerateWxSSO = (redirectUri) => {
//   return `https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=${window.corpid}&redirect_uri=${redirectUri}&usertype=admin`;
// };

// const WX_SSO_RURL = encodeURIComponent(gennerateWxSSO(REDIRECT_URL_SSO));
// const WX_SSO = gennerateFixedUrlRedirect(WX_SSO_RURL);

// const openWxServer = () => {
//   openNewWindow(WX_SSO);
// };

const showIndustryModal = (e) => {
  const industryModal = document.getElementById("nav-industry-modal")
  e.stopPropagation();
  if (industryModal) {
    industryModal.style.display = 'block'
  }
}

const closeIndustryModal = (e) => {
  const industryModal = document.getElementById("nav-industry-modal")
  if (industryModal) {
    industryModal.style.display = 'none'
  }
}


/*********************************/
const switchToGroup = (e) => {
  if (e.target.checked) {

    const domainField = document.createElement('div')
    domainField.setAttribute('id', 'domain-field')

    const label = document.createElement('label');
    label.setAttribute('class', 'fake-label')
    label.innerText = '免验证邮箱后缀'

    const domainItemWrapper = document.createElement('span')
    domainItemWrapper.setAttribute('class', 'domain-item-wrapper')

    const domainWrapper = document.createElement('span')
    domainWrapper.setAttribute('class', 'domain-field form-item')

    const domainFixed = document.createElement('span')
    domainFixed.setAttribute('class', 'domain-fixed')
    domainFixed.innerText = '@'

    const domainInput = document.createElement('input')
    domainInput.setAttribute('id', 'input-domain')
    domainInput.placeholder = '请输入公司域名'

    const domainImage = document.createElement('img')
    domainImage.src = require('../assets/checked.svg')
    domainImage.setAttribute('class', 'input-domain-check input-domain-operator')

    domainWrapper.appendChild(domainFixed)
    domainWrapper.appendChild(domainInput)
    domainWrapper.appendChild(domainImage)
    domainItemWrapper.appendChild(domainWrapper)

    const domainDescription = document.createElement('div')
    domainDescription.setAttribute('class', 'url-description')
    domainDescription.style.width = '300px'
    domainDescription.style.marginBottom = '35px'
    domainDescription.innerText = '团队成员使用免验证邮箱后缀注册，则不需要管理员审核，可直接进入团队。后缀示例：qq.com'

    domainField.appendChild(label)
    domainField.appendChild(domainItemWrapper)
    domainField.appendChild(domainDescription)
    const freeTitle = document.getElementById('free-title')
    const registerForm = document.getElementById('register-form')
    registerForm.insertBefore(domainField, freeTitle)

    const switchLabel = document.getElementById('switch-label')
    const required = document.createElement('span')
    required.innerText = '*'
    required.setAttribute('class', 'required')
    switchLabel.innerText = "电子邮箱"
    switchLabel.appendChild(required)
    const registerEmail = document.getElementById('register-email')
    registerEmail.value = null;
    registerEmail.placeholder = '请输入登录团队使用的邮箱'
    registerEmail.parentNode.setAttribute('data-err', '请输入电子邮箱')

    const groupMobileLabel = document.createElement('label')
    groupMobileLabel.innerText = '手机号'
    groupMobileLabel.setAttribute('id', 'group-mobile-label')
    groupMobileLabel.setAttribute('for', 'group-mobile')
    const groupMobileRequired = document.createElement('span')
    groupMobileRequired.innerText = '*'
    groupMobileRequired.setAttribute('class', 'required')
    groupMobileLabel.appendChild(groupMobileRequired)
    const groupMobileItem = document.createElement('span')
    groupMobileItem.setAttribute('class', 'register-form-item')
    const groupMobileInput = document.createElement('input')
    groupMobileInput.setAttribute('id', 'group-mobile')
    groupMobileInput.setAttribute('class', 'normal-input')
    groupMobileInput.setAttribute('name', 'registerDisplayMobile')
    groupMobileInput.placeholder = '请输入登录时使用的手机号'
    groupMobileItem.appendChild(groupMobileInput)
    registerForm.appendChild(groupMobileLabel)
    registerForm.appendChild(groupMobileItem)
  }
}

const _switchToFree = () => {
  const registerForm = document.getElementById('register-form')
  // const domainField = document.getElementById('domain-field')
  const groupMobile = document.getElementById('group-mobile')
  if (groupMobile) {
    const groupMobileItem = groupMobile.parentNode
    const groupMobileLabel = document.getElementById('group-mobile-label')
    // registerForm.removeChild(domainField)
    registerForm.removeChild(groupMobileLabel)
    registerForm.removeChild(groupMobileItem)
    const switchLabel = document.getElementById('switch-label')
    const required = document.createElement('span')
    required.innerText = '*'
    required.setAttribute('class', 'required')
    switchLabel.innerText = "手机号"
    switchLabel.appendChild(required)
    const registerEmail = document.getElementById('register-email')
    registerEmail.value = null;
    registerEmail.placeholder = '请输入登录团队使用的手机号'
    registerEmail.parentNode.setAttribute('data-err', '请输入手机号码')
  }
}

const switchToFree = (e) => {
  if (e.target.checked) {
    _switchToFree()
  }
}

const submitRegister = () => {
  const registerUrl = registerForm.registerUrl.value
  const registerGroupName = registerForm.registerGroupName.value
  const registerTypeGroup = registerForm.registerType[0].checked
  // const registerTypeFree = registerForm.registerType[1].checked
  const registerEmail = registerForm.registerEmail.value
  const registerVerifiedCode = registerForm.registerVerifiedCode.value
  const registerPasswordSet = registerForm.registerPasswordSet.value
  // const registerPasswordConfirm = registerForm.registerPasswordConfirm.value
  const registerDisplayName = registerForm.registerDisplayName.value
  // const registerGroupMobile = registerTypeGroup ? registerForm.registerDisplayMobile.value : null
  // const inputDomains = document.getElementsByClassName('input-domain')
  let errorNum = 0
  const aliVerification = JSON.parse(sessionStorage.getItem('aliVerification'))
  if (!aliVerification) {
    const errNode = document.getElementById('nc-container').parentNode
    if (errNode.className.indexOf('error') == -1) {
      errNode.className = errNode.className + ' error'
    }
    errorNum += 1
    sessionStorage.removeItem('aliVerification')
  }
  if (!utlInputValidate(registerUrl)) { errorNum += 1 }
  if (!groupNameValidate(registerGroupName)) { errorNum += 1 }
  if (!registerEmailMobileValidate(registerEmail)) { errorNum += 1 }
  if (!verifyCodeValidate(registerVerifiedCode)) { errorNum += 1 }
  if (!passwordSetValidate(registerPasswordSet)) { errorNum += 1 }
  if (!registerDisplayNameValidate(registerDisplayName)) { errorNum += 1 }
  if (errorNum > 0) {
    return false
  }
  // const email_domains = [];
  // for (let i = 0; i < inputDomains.length; i++) {
  //   if (inputDomains[i].value) {
  //     email_domains.push(inputDomains[i].value)
  //   }
  // }
  const params = {
    domain: registerUrl,
    name: registerGroupName,
    team_type: registerTypeGroup ? 0 : 1,
    email: null,
    mobile: registerEmail,
    code: registerVerifiedCode,
    password: registerPasswordSet,
    password_confirm: registerPasswordSet,
    username: registerDisplayName,
    email_domains: [],
    scene: aliVerification.scene,
    token: aliVerification.nc_token,
    sig: aliVerification.sig,
    session_id: aliVerification.csessionid,
    source: getSource()
  }

  request('/team/create', params)
    .then(({ data, err }) => {
      if (data && data.hasOwnProperty('id')) {
        onSucceed()
        sessionStorage.removeItem('mobile')
        const matchBackHost = window.backhost.match(/(.*):\/\/(.*)\.(.*)\.(.*)/)
        window.location.href = matchBackHost[1] + '://' + registerUrl + '.' + matchBackHost[3] + '.' + matchBackHost[4] + '/unregister/login'
      }
      if (err) {
        if (err.response.error == "DOMAIN_EXISTS") { //域名重复
          const domainInput = document.getElementById('input-url')
          const errNode = domainInput.parentNode.parentNode
          if (errNode.className.indexOf('error') == -1) {
            errNode.className = errNode.className + ' error'
          }
          errNode.setAttribute('data-err', '子域名已被占用，请尝试其他子域名')
        }
        if (err.response.error == 'MAN_MACHINE_VERIFICATION_FAILED') { //人机验证失效
          const authModalTitle = document.getElementById('auth-modal-title')
          const authModalContent = document.getElementById('auth-modal-content')
          if (authModalTitle && authModalContent) {
            authModalTitle.innerText = "人机验证失效"
            authModalContent.innerText = "人机验证已失效，请从新进行人机验证"
          }
          toogleAuthInvalidModal('show')
        }
        if (err.response.error == 'AUTH_CODE_TIME_OUT') { //验证码失效
          const authModalTitle = document.getElementById('auth-modal-title')
          const authModalContent = document.getElementById('auth-modal-content')
          if (authModalTitle && authModalContent) {
            authModalTitle.innerText = "验证码失效"
            authModalContent.innerText = "验证码已失效，请从新获取验证码"
          }
          toogleAuthInvalidModal('show')
        }
        if (err.response.error == 'ERR_VERIFICATION_CODE') { //验证码错误
          const errNode = registerForm.registerVerifiedCode.parentNode
          if (!currentError(errNode)) {
            errNode.className = errNode.className + ' error'
          }
          errNode.setAttribute('data-err', '验证码输入错误')
        }
      }
    });
}

const currentError = (node) => { //校验当前是否为错误状态
  if (node.className.indexOf('error') == -1) {
    return false
  }
  return true
}

const verifyCodeValidate = (value) => { //验证码校验
  const verifyCodeInput = document.getElementById('verifycode')
  const errNode = verifyCodeInput.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请输入验证码')
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const utlInputValidate = (value) => { //团队域名校验
  const registerUrlInput = document.getElementById('input-url')
  const errNode = registerUrlInput.parentNode.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请输入公司域名')
    return false
  }
  const reg = /^\w+$/
  if (!reg.test(value)) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '只支持数字、大小写字母和英文下划线')
    return false
  }
  if (value.length > 10) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '最多可输入10个字符')
    return false
  }
  let exist = 0;
  request('/website/domain', {
    domain: value
  }).then((data) => {
    if (data && data.data && data.data.exists === 1) {
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      errNode.setAttribute('data-err', '子域名已被占用，请尝试其他子域名')
      exist = 1
    }
  })
  if (exist === 1) {
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const groupNameValidate = (value) => { //团队名称校验
  const registerGroupName = document.getElementById('register-group-name')
  const errNode = registerGroupName.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const registerDisplayNameValidate = (value) => {
  const registerDisplayName = document.getElementById('display-name')
  const errNode = registerDisplayName.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const registerGroupMobileValidate = (value) => {
  const registerGroupMobile = document.getElementById('group-mobile')
  const errNode = registerGroupMobile.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请输入手机号码')
    return false
  } else {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!reg.test(value)) {
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      errNode.setAttribute('data-err', '手机格式不正确')
      return false
    }
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const passwordSetValidate = (value) => {
  const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,32}$/
  const passwordSet = document.getElementById('password-set')
  // const passwordConfirm = document.getElementById('password-confirm')
  const errNode = passwordSet.parentNode
  // const confirmErrNode = passwordConfirm.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请输入密码')
  } else {
    if (!reg.test(value)) {
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      errNode.setAttribute('data-err', '请输入至少8位密码，需要包含数字和字母')
      return false
    }
    // if (passwordConfirm.value && value !== passwordConfirm.value) {
    //   if (currentError(errNode)) {
    //     errNode.className = errNode.className.replace(/error/, '')
    //   }
    //   if (!currentError(confirmErrNode)) {
    //     confirmErrNode.className = errNode.className + ' error'
    //   }
    //   confirmErrNode.setAttribute('data-err', '两次密码输入不一致')
    //   return false
    // }
    if (currentError(errNode)) {
      errNode.className = errNode.className.replace(/error/, '')
    }
    return true
  }
}

const passwordConfirmValidate = (value) => {
  const passwordSet = document.getElementById('password-set')
  const passwordConfirm = document.getElementById('password-confirm')
  const errNode = passwordConfirm.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请再次输入相同的密码')
  } else {
    if (passwordSet.value !== value) {
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      errNode.setAttribute('data-err', '两次密码输入不一致')
      return false
    }
    if (currentError(errNode)) {
      errNode.className = errNode.className.replace(/error/, '')
    }
    return true
  }
}

const submitMobile = () => {
  const registerGroupMobile = document.getElementById('group-mobile').value
  if (!registerGroupMobileValidate(registerGroupMobile)) {
    return false
  }
  sessionStorage.setItem('mobile', registerGroupMobile)
  request('/account/mobile_register', {
    mobile: registerGroupMobile,
    source: getSource()
  }).then(() => {
    window.location.href = window.location.origin + '/register-info.html'
  })
}

const changeDomainItems = (e) => {
  const currentOperator = e.target
  const currentWrapper = currentOperator.parentNode
  const constainer = currentWrapper.parentNode
  const currentInput = currentWrapper.getElementsByTagName('input')[0]
  if (currentOperator.className.indexOf('input-domain-check') > -1) {
    if (!currentInput.value) {
      return false
    }
    currentOperator.className = currentOperator.className.replace('input-domain-check', 'input-domain-delete')
    currentOperator.src = require('../assets/delete.png')
    const newWrapper = document.createElement('span');
    newWrapper.setAttribute('class', 'domain-field form-item')
    const newFix = document.createElement('span')
    newFix.setAttribute('class', ' domain-fixed')
    newFix.innerText = '@'
    const newInput = document.createElement('input');
    newInput.setAttribute('id', 'input-domain');
    newInput.setAttribute('class', 'input-domain')
    newInput.setAttribute('placeholder', '免验证邮箱后缀')
    const newOperator = document.createElement('img')
    newOperator.src = require('../assets/checked.svg')
    newOperator.setAttribute('class', 'input-domain-check input-domain-operator')
    newOperator.addEventListener('click', changeDomainItems)
    newWrapper.appendChild(newFix)
    newWrapper.appendChild(newInput)
    newWrapper.appendChild(newOperator)
    constainer.appendChild(newWrapper)
  }
  else {
    constainer.removeChild(currentWrapper)
  }
}
function getScrollTop() {
  const el = document.scrollingElement || document.documentElement || document.body
  return el.scrollTop
}
const changeHeader = () => {
  const scrollTop = getScrollTop()
  const htmlDom = document.documentElement
  const navHeader = document.getElementById('nav-header')
  const logo = document.getElementById('logo')
  const menu = document.getElementById('nav-menu-id')
  if (scrollTop > 0) {
    const navContent = document.getElementsByClassName('nav-content')[0]
    if (navContent) {
      navContent.className = 'nav-scroll-white'
      navHeader.className = navHeader.className + ' nav-header'
      logo.src = require("../assets/nav-logo-black.svg")
      if (menu) {
        menu.src = require('../mobile/assets/nav-menu.svg')
      }
    }
  } else {
    const navContent = document.getElementsByClassName('nav-scroll-white')[0]
    if (navContent) {
      navContent.className = 'nav-content'
      navHeader.className = navHeader.className.replace(' nav-header', '')
      if (navHeader.className.indexOf('nav-header') == -1) {
        logo.src = require("../assets/nav-logo.svg")
        if (menu) {
          menu.src = require('../mobile/assets/nav-menu-white.png')
        }
      }
    }
  }
}

/*********************************/

/**********mobile start***********/
const industryScrollLeft = () => {
  const casourelSection = document.getElementsByClassName('casourel-section')[0]
  const scrollStep = casourelSection.offsetWidth;
  const carouselList = document.getElementsByClassName('casourel-list')[0];
  const carouseItemlength = carouselList.getElementsByTagName('li').length
  const speed = 30
  const target = carouselList.offsetLeft - scrollStep
  let timer = setInterval(() => {
    carouselList.style.left = carouselList.offsetLeft - speed + 'px'
    if (target >= carouselList.offsetLeft) {
      carouselList.style.left = target + 'px'
      if (carouselList.offsetLeft <= -scrollStep * (carouseItemlength - 1)) {
        carouselList.style.left = -scrollStep + 'px'
      }
      clearInterval(timer)
    }
  }, 10)
}
const industryScrollRight = () => {
  const casourelSection = document.getElementsByClassName('casourel-section')[0]
  const scrollStep = casourelSection.offsetWidth;
  const carouselList = document.getElementsByClassName('casourel-list')[0];
  const carouseItemlength = carouselList.getElementsByTagName('li').length
  const target = carouselList.offsetLeft + scrollStep
  const speed = 30
  let timer = setInterval(() => {
    carouselList.style.left = carouselList.offsetLeft + speed + 'px'
    if (target <= carouselList.offsetLeft) {
      carouselList.style.left = target + 'px'
      if (carouselList.offsetLeft >= 0) {
        carouselList.style.left = -scrollStep * (carouseItemlength - 2) + 'px'
      }
      clearInterval(timer)
    }
  }, 10)
}

const submitFeedback = () => {
  const name = feedbackForm.feedbackName.value;
  const email = feedbackForm.feedbackEmail.value;
  const mobile = feedbackForm.feedbackMobile.value;
  const company = feedbackForm.feedbackCompany.value;
  const remark = feedbackForm.feedbackRemark.value;
  const type0 = feedbackForm.type0
  const type1 = feedbackForm.type1
  let type
  if (type0 && type1) {
    if (type0.checked) {
      type = 0
    }
    if (type1.checked) {
      type = 1
    }
  }
  let errNum = 0;
  if (!feedbackNameVerify(name)) { errNum += 1 }
  if (!feedbackEmailVerify(email)) { errNum += 1 }
  if (!feedbackMobileVerify(mobile)) { errNum += 1 }
  if (!feedbackCompanyVerify(company)) { errNum += 1 }
  if (!feedbackRemarkVerify(remark)) { errNum += 1 }
  if (errNum > 0) {
    return false
  }
  const params = {
    name,
    email,
    mobile,
    company,
    content: remark,
    source: getSource(),
    type
  }
  request('/website/feedback', params).then(({ data }) => {
    if (data) {
      onSucceed();
      feedbackForm.feedbackName.value = null
      feedbackForm.feedbackEmail.value = null
      feedbackForm.feedbackMobile.value = null
      feedbackForm.feedbackCompany.value = null
      feedbackForm.feedbackRemark.value = null
    } else {
      onErr();
    }
  });
}

/**********mobile end*************/

/*************demo*************/
const validateDemoName = (value) => {
  const self = document.getElementById('demo-name')
  const errNode = self.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const getLocalLocale = () => {
  const pathname = window.location.pathname;
  if (pathname.indexOf('/en') > -1) {
    return 'en-US'
  } else if (pathname.indexOf('/hk') > -1) {
    return 'zh-tw'
  }
  return 'zh-cn'
}

const validateDemoEmail = (value) => {
  const self = document.getElementById('demo-email')
  const errNode = self.parentNode;
  const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    const localeId = errNode.getAttribute('data-locale-id')
    errNode.setAttribute('data-err', allLocales[localeId][getLocalLocale()])
    return false
  }
  if (value) {
    if (!reg.test(value)) { //邮箱验证不通过
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      const localeId = errNode.getAttribute('data-input-locale-id')
      errNode.setAttribute('data-err', allLocales[localeId][getLocalLocale()])
      return false
    }
    if (currentError(errNode)) {
      errNode.className = errNode.className.replace(/error/, '')
    }
    return true
  }
}

const validateDemoMobile = (value) => {
  const self = document.getElementById('demo-mobile')
  const errNode = self.parentNode;
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    const localeId = errNode.getAttribute('data-locale-id')
    errNode.setAttribute('data-err', allLocales[localeId][getLocalLocale()])
    return false
  }
  if (value) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!reg.test(value)) {
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      const localeId = errNode.getAttribute('data-input-locale-id')
      errNode.setAttribute('data-err', allLocales[localeId][getLocalLocale()])
      return false
    }
    if (currentError(errNode)) {
      errNode.className = errNode.className.replace(/error/, '')
    }
    return true
  }
}

const validateDemoCompany = (value) => {
  const self = document.getElementById('demo-company')
  const errNode = self.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const validateDemoIndustry = (value) => {
  const self = document.getElementById('demo-industry')
  const errNode = self.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const validateDemoScale = (value) => {
  const self = document.getElementById('demo-scale')
  const errNode = self.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const submitDemo = () => {
  const name = demoForm.demoName.value // required
  const email = demoForm.demoEmail.value // required
  const mobile = demoForm.demoMobile.value // required
  const company = demoForm.demoCompany.value // required
  const industry = demoForm.demoIndustry.value // required
  const scale = demoForm.demoScale.value // required
  const department = demoForm.demoDepart.value
  const position = demoForm.demoPosi.value
  const remarks = demoForm.demoRemark.value
  let errNum = 0;
  if (!validateDemoName(name)) { errNum += 1 }
  if (!validateDemoEmail(email)) { errNum += 1 }
  if (!validateDemoMobile(mobile)) { errNum += 1 }
  if (!validateDemoCompany(company)) { errNum += 1 }
  if (!validateDemoIndustry(industry)) { errNum += 1 }
  if (!validateDemoScale(scale)) { errNum += 1 }
  if (errNum > 0) {
    return false
  }
  const params = {
    name, email, mobile,
    company, industry, scale,
    department, position, remarks,
    source: getSource()
  }
  request('/website/trail', params).then((data) => {
    if (data) {
      onSucceed()
      demoForm.demoName.value = null
      demoForm.demoEmail.value = null
      demoForm.demoMobile.value = null
      demoForm.demoCompany.value = null
      demoForm.demoIndustry.value = '' //移动端是select，所以在这里赋值为空字符串
      demoForm.demoScale.value = ''
      demoForm.demoDepart.value = ''
      demoForm.demoPosi.value = null
      demoForm.demoRemark.value = null
    } else {
      onErr()
    }
  })
}
/*************demo*************/

const toDemoDetail = (id) => {
  window.location.href = window.DEMOURL + '/demo/' + id
}

const setSelectValue = (valueNode, currentNode, targetOptions) => {
  valueNode.value = currentNode.getAttribute('value');
  targetOptions.style.display = 'none';
  const errNode = valueNode.parentNode;
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
}

const switchOptions = (e) => {
  e.stopPropagation()
  const valueNode = e.currentTarget
  const options = valueNode.nextElementSibling
  if (options.style.display === 'block') {
    options.style.display = 'none'
  } else {
    const egOptions = document.getElementsByClassName('options')
    if (egOptions) {
      for (let i = 0; i < egOptions.length; i++) {
        egOptions[i].style.display = 'none'
      }
    }
    options.style.display = 'block'
  }
  if (options.style.display === 'block') {
    for (let i = 0; i < options.children.length; i++) {
      options.children[i].addEventListener('click', function (e) { setSelectValue(valueNode, e.currentTarget, options) })
    }
  }
}

const closeEgOptions = () => {
  const egOptions = document.getElementsByClassName('options')
  if (egOptions) {
    for (let i = 0; i < egOptions.length; i++) {
      egOptions[i].style.display = 'none'
    }
  }
}

const toogleJoinModal = (type) => {
  const joinModal = document.getElementById('join-modal')
  if (joinModal) {
    const joinRegister = document.getElementById('input-register')
    const errNode = joinRegister.parentNode.parentNode
    if (type == 'show') {
      toggleModalCover(type)
      joinModal.style.display = 'block'
      joinRegister.value = null
    }
    if (type == 'hide') {
      toggleModalCover(type)
      joinModal.style.display = 'none'
      joinRegister.value = null
    }
    if (errNode.className.indexOf('err') > -1) {
      errNode.className = errNode.className.replace('err', '')
    }
  }
}

const toogleAuthInvalidModal = (type) => {
  const authInvalidModal = document.getElementById('auth-invalid-modal');
  if (authInvalidModal) {
    if (type === 'show') {
      toggleModalCover(type)
      authInvalidModal.style.display = 'block';
    }
    if (type === 'hide') {
      toggleModalCover(type)
      authInvalidModal.style.display = 'none';
    }
  }
}

function addEvent(obj, type, handle) {
  try {  // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
    obj.addEventListener(type, handle, false);
  } catch (e) {
    try {  // IE8.0及其以下版本
      obj.attachEvent('on' + type, handle);
    } catch (e) {  // 早期浏览器
      obj['on' + type] = handle;
    }
  }
}

const registerEmailMobileValidate = (value) => { //邮箱手机号校验
  const registerEmail = document.getElementById('register-email')
  const registerTypeGroup = 0 //checked-email unchecked-mobile
  const errNode = registerEmail.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请输入手机号码')
    nc.reload()
    return false
  } else {
    if (!registerTypeGroup) {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!reg.test(value)) {
        if (!currentError(errNode)) {
          errNode.className = errNode.className + ' error'
        }
        errNode.setAttribute('data-err', '手机格式不正确')
        nc.reload()
        return false
      }
      if (currentError(errNode)) {
        errNode.className = errNode.className.replace(/error/, '')
      }
      return true
    }
  }
}

const toggleModalCover = (type) => {
  const modalCover = document.getElementById('modal-cover')
  if (modalCover) {
    modalCover.style.display = (type === 'show' ? 'block' : 'none')
  }
}

const toggleVideoCover = (type) => {
  const videoCover = document.getElementById('video-cover')
  if (videoCover) {
    videoCover.style.display = (type === 'show' ? 'block' : 'none')
  }
}

const toggleVideo = (type) => {
  const videoPlayer = document.getElementById('video-player')
  const officialVideo = document.getElementById('official-video')
  if (videoPlayer) {
    const player = videojs('video-player')
    officialVideo.style.display = (type === 'show' ? 'block' : 'none')
    type === 'show' ? player.play() : player.pause()
  }
}

function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}

const toggleVideoMask = (type) => {
  const videoMask = document.getElementById('video-mask');
  if (videoMask) {
    videoMask.style.display = (type === 'show' ? 'block' : 'none')
  }
}

const replayVideo = () => {
  const player = videojs('video-player')
  toggleVideoMask('hide')
  player.play()
}

const pushHmt = (action, duration) => {
  if (_hmt) {
    _hmt.push(['_trackEvent', 'video', action, 'duration', duration])
  }
}

const feedbackRemarkVerify = (value) => {
  const self = document.getElementById('feedback-remark')
  const errNode = self.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const feedbackNameVerify = (value) => {
  const self = document.getElementById('feedback-name')
  const errNode = self.parentNode;
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const feedbackCompanyVerify = (value) => {
  const self = document.getElementById('feedback-company')
  const errNode = self.parentNode

  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const feedbackMobileVerify = (value) => {
  const self = document.getElementById('feedback-mobile')
  const errNode = self.parentNode
  if (!value) {
    const localeId = errNode.getAttribute('data-locale-id')
    errNode.setAttribute('data-err', allLocales[localeId][getLocalLocale()])
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (value) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!reg.test(value)) {
      const localeId = errNode.getAttribute('data-input-locale-id')
      errNode.setAttribute('data-err', allLocales[localeId][getLocalLocale()])
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      return false
    }
    if (currentError(errNode)) {
      errNode.className = errNode.className.replace(/error/, '')
    }
    return true
  }
}

const feedbackEmailVerify = (value) => {
  const self = document.getElementById('feedback-email')
  const errNode = self.parentNode
  const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  if (!value) {
    const localeId = errNode.getAttribute('data-locale-id')
    errNode.setAttribute('data-err', allLocales[localeId][getLocalLocale()])
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    return false
  }
  if (value) {
    if (!reg.test(value)) { //邮箱验证不通过
      const localeId = errNode.getAttribute('data-input-locale-id')
      errNode.setAttribute('data-err', allLocales[localeId][getLocalLocale()])
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      return false
    }
    if (currentError(errNode)) {
      errNode.className = errNode.className.replace(/error/, '')
    }
    return true
  }
}

const translateLocale = (locale) => {
  const localeNodes = document.querySelectorAll("[data-locale-id]");
  for (let i = 0; i < localeNodes.length; i++) {
    const localeId = localeNodes[i].getAttribute("data-locale-id");
    switch (localeNodes[i].tagName.toLowerCase()) {
      case 'input':
      case 'textarea':
      case 'select':
        localeNodes[i].placeholder = allLocales[localeId] ? allLocales[localeId][locale] : localeNodes[i].placeholder;
        break;
      default:
        if (localeNodes[i].getAttribute('data-err')) {
          localeNodes[i].setAttribute('data-err', allLocales[localeId][locale])
        } else {
          localeNodes[i].innerHTML = allLocales[localeId] ? allLocales[localeId][locale] : localeNodes.innerHTML;
          if (localeNodes[i].tagName.toLowerCase() === 'option' || localeNodes[i].getAttribute('data-locale-type')) {
            localeNodes[i].setAttribute('value', allLocales[localeId][locale])
          }
        }
    }
  }
}

const changeLocaleBtnText = (locale) => {
  const localeBtn = document.getElementById('nav-locale-btn');
  if (localeBtn) {
    if (locale === 'en-US') {
      localeBtn.innerHTML = '中文'
    } else {
      localeBtn.innerHTML = 'English'
    }
  }
}

const changeLocaleCheckVisible = (locale) => {
  const localeChecks = document.getElementsByClassName('locale-check');
  for (let i = 0; i < localeChecks.length; i++) {
    if (localeChecks[i].getAttribute('data-locale') !== locale) {
      localeChecks[i].style.visibility = 'hidden';
    } else {
      localeChecks[i].style.visibility = 'visible';
    }
  }
}

const changeLocaleClassName = (locale) => {
  const nodes =  document.querySelectorAll("[data-locale-style]");
  for (let i = 0; i < nodes.length; i ++) {
    if (locale === 'en-US') {
      nodes[i].setAttribute('class', nodes[i].className + ' en')
    } else {
      nodes[i].setAttribute('class', nodes[i].className.replace(' en', ''))
    }
  }
}

const changeLocale = (e) => {
  e.stopPropagation();
  const locale = e.target.getAttribute('data-locale');
  const prevPathname = window.location.pathname;
  const origin = window.location.origin;
  let currentPath = '';
  if (enPathReg.exec(prevPathname) || hkPathReg.exec(prevPathname)) {
    const test = enPathReg.exec(prevPathname) || hkPathReg.exec(prevPathname);
    currentPath = mapLocaleToFolder[locale] + '/' + test[1]
  } else {
    currentPath = mapLocaleToFolder[locale] + prevPathname
  }
  window.location.href = origin + currentPath
}

const toggleLocaleModal = (visible) => {
  const localeModal = document.getElementById('nav-locale-modal');
  if (localeModal) {
    if (visible) {
      localeModal.style.display = 'block'
    } else {
      localeModal.style.display = 'none'
    }
  }
}

const toogleQuickEntryTootip = (tootip, visible) => {
  if (visible) {
    tootip.style.display = 'block';
  } else {
    tootip.style.display = 'none';
  }
}

window.onload = function () {
  /*********new**********/
  const localeItems = document.getElementsByClassName('locale-item'); //导航多语言弹窗每一项
  if (localeItems) {
    for (let i = 0; i < localeItems.length; i++) {
      localeItems[i].addEventListener('click', changeLocale)
    }
  }

  const localeBtn = document.getElementById('nav-locale-btn'); //多语言按钮
  if (localeBtn) {
    localeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLocaleModal(true)
    })
  }

  translateLocale(getLocalLocale());
  changeLocaleBtnText(getLocalLocale());
  changeLocaleCheckVisible(getLocalLocale())
  changeLocaleClassName(getLocalLocale())

  const quickEntryItems = document.getElementsByClassName('quick-entry-item');
  if (quickEntryItems) {
    for (let i = 0; i < quickEntryItems.length; i++) {
      const quickEntryItem = quickEntryItems[i];
      const quickEntryTootip = quickEntryItem.getElementsByClassName('quick-entry-tootip');
      if (quickEntryTootip.length > 0) {
        quickEntryItem.addEventListener('mouseenter', () => toogleQuickEntryTootip(quickEntryTootip[0], true));
        quickEntryItem.addEventListener('mouseleave', () => toogleQuickEntryTootip(quickEntryTootip[0], false))
      }
    }
  }

  /*********new**********/
  const videoPlayer = document.getElementById('video-player')
  if (videoPlayer) {
    const player = videojs('video-player')
    player.on('ended', () => {
      toggleVideoMask('show')
    })
    player.on('play', () => {
      pushHmt('play', player.currentTime())
    })
    player.on('pause', () => {
      pushHmt('pause', player.currentTime())
    })
  }
  const videoReplayBtn = document.getElementById('video-replay')
  if (videoReplayBtn) {
    videoReplayBtn.addEventListener('click', replayVideo)
  }

  if (window.location.pathname === '/register-info.html') {
    const mobile = sessionStorage.getItem('mobile')
    if (!mobile) {
      window.location.href = window.location.origin + '/register.html'
    }
  }

  if (sessionStorage.getItem('aliVerification')) {
    sessionStorage.removeItem('aliVerification')
  }
  if (sessionStorage.getItem('verify')) {
    sessionStorage.removeItem('verify')
  }
  const matchBackHost = window.backhost.match(/(.*):\/\/(.*)\.(.*)\.(.*)/)
  const loginFixed = document.getElementById('login-fixed')
  const joinFixed = document.getElementById('join-fixed')
  const registerFixed = document.getElementById('register-fixed')
  if (registerFixed) {
    if (matchBackHost) {
      registerFixed.innerText = matchBackHost[3] + '.' + matchBackHost[4]
    } else {
      registerFixed.innerText = 'elephantbi.com'
    }
  }
  if (loginFixed) {
    if (matchBackHost) {
      loginFixed.innerText = matchBackHost[3] + '.' + matchBackHost[4]
    } else {
      loginFixed.innerText = 'elephantbi.com'
    }
  }
  if (joinFixed) {
    if (matchBackHost) {
      joinFixed.innerText = matchBackHost[3] + '.' + matchBackHost[4]
    } else {
      loginFixed.innerText = 'elephantbi.com'
    }
  }

  const registerEmail = document.getElementById('register-email')
  if (registerEmail) {
    const mobile = sessionStorage.getItem('mobile')
    if (mobile) {
      registerEmail.value = mobile;
      registerEmail.setAttribute('disabled', 'disabled')
    }
  }
  const ncContainer = document.getElementById('nc-container')
  if (ncContainer) {
    var nc_token = ["FFFF0N00000000006B76", (new Date()).getTime(), Math.random()].join(':');
    var NC_Opt =
    {
      renderTo: "nc-container",
      appkey: "FFFF0N00000000006B76",
      scene: "register",
      token: nc_token,
      customWidth: 244,
      trans: { "key1": "code0" },
      elementID: ["usernameID"],
      is_Opt: 0,
      language: "cn",
      isEnabled: true,
      timeout: 3000,
      times: 5,
      apimap: {
      },
      callback: function (data) {
        const params = {
          scene: "register",
          nc_token,
          csessionid: data.csessionid,
          sig: data.sig
        }
        sessionStorage.setItem('aliVerification', JSON.stringify(params))
        const errNode = document.getElementById('nc-container').parentNode
        if (errNode.className.indexOf('error') > -1) {
          errNode.className = errNode.className.replace('error', '')
        }
        const registerMobile = document.getElementById('register-email').value
        if (!registerEmailMobileValidate(registerMobile)) {
          return false
        }
        sendVerification()
      }
    }
    var nc = new noCaptcha(NC_Opt)

    nc.upLang('cn', {
      _startTEXT: "请滑动获取",
      _yesTEXT: "已发送验证码",
      _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
      _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>"
    })

    const sendVerification = () => { //发送存储验证码
      let second = 60;
      const authCodeTip = document.getElementById('auth-code-tip')
      authCodeTip.style.visibility = 'visible'
      const timer = setInterval(() => {
        second -= 1
        authCodeTip.innerText = second + '秒后可重新获取'
        if (second === 0) {
          clearInterval(timer)
          authCodeTip.style.visibility = 'hidden'
          second = 60
          authCodeTip.innerText = second + '秒后可重新获取'
          nc.reload()
        }
      }, 1000)
      const aliVerification = JSON.parse(sessionStorage.getItem('aliVerification'))
      const registerTypeGroup = registerForm.registerType[0].checked
      const registerEmail = registerForm.registerEmail.value
      const params = {
        auth_type: registerTypeGroup ? 0 : 1,
        send_to: registerEmail,
        code_type: 2,
        scene: aliVerification.scene,
        nc_token: aliVerification.nc_token,
        csessionid: aliVerification.csessionid,
        sig: aliVerification.sig
      }
      request('/auth/code', params)
        .then(({ data }) => {
          if (data) {
          } else {
          }
        });
    }

    const sendVerifyBtn = document.getElementById('send-verifycode')
    if (sendVerifyBtn) {
      sendVerifyBtn.addEventListener('click', sendVerification, true)
    }
  }

  // NOTE (zhamgmeng): temporary restrict to only use free team
  // _switchToFree();

  //wx login
  // const wxbtnlogup = document.getElementById('wx-btn-logup');
  // if (wxbtnlogup) {
  //   wxbtnlogup.addEventListener('click', authlink, true);
  // }
  // const wxbtnlogin = document.getElementById('wx-btn-login');
  // if (wxbtnlogin) {
  //   wxbtnlogin.addEventListener('click', wxregisterlink, true);
  // }
  // const wxbtnserverlogin = document.getElementById('wx-login');
  // if (wxbtnserverlogin) {
  //   wxbtnserverlogin.addEventListener('click', openWxServer, true);
  // }
  window.onscroll = function () { //页面滚动
    changeHeader() //
    toggleNavModalVisible('hide');
  }

  changeHeader() //刷新页面触发一次

  const formSubmitBtn = document.getElementById('form-submit-btn-id'); //移动端表单提交按钮
  const loginModal = document.getElementById('login-modal'); //登陆弹窗
  const navLogin = document.getElementById('nav-login'); //导航登陆按钮
  const industryLink = document.getElementById("nav-industry-link") //导航行业信息链接

  const feedbackRemark = document.getElementById('feedback-remark')
  const feedbackName = document.getElementById('feedback-name')
  const feedbackEmail = document.getElementById('feedback-email')
  const feedbackMobile = document.getElementById('feedback-mobile')
  const feedbackCompany = document.getElementById('feedback-company')
  if (feedbackRemark) {
    feedbackRemark.addEventListener('input', function (e) {
      feedbackRemarkVerify(e.target.value)
    })
  }
  if (feedbackName) {
    feedbackName.addEventListener('input', function (e) {
      feedbackNameVerify(e.target.value)
    })
  }
  if (feedbackEmail) {
    feedbackEmail.addEventListener('input', function (e) {
      feedbackEmailVerify(e.target.value)
    })
  }
  if (feedbackMobile) {
    feedbackMobile.addEventListener('input', function (e) {
      feedbackMobileVerify(e.target.value)
    })
  }
  if (feedbackCompany) {
    feedbackCompany.addEventListener('input', function (e) {
      feedbackCompanyVerify(e.target.value)
    })
  }

  const feedbackBtn = document.getElementById('feedback-submit');
  if (feedbackBtn) {
    feedbackBtn.addEventListener('click', submitFeedback, true)
  }

  if (industryLink) {
    industryLink.addEventListener('mouseenter', showIndustryModal, true)
  }

  var joinLists = document.getElementsByClassName('list-item'); //关于我们页面招聘信息
  if (joinLists) {
    var joinListsLength = joinLists.length;
    for (var joinListsIndex = 0; joinListsIndex < joinListsLength; joinListsIndex++) {
      var item = joinLists[joinListsIndex];
      var aelement = item.getElementsByTagName('a');
      const target = joinListsIndex;
      aelement[0].onclick = function () {
        joinListOnClick(target);
      };
    }
  }
  // root listen
  document.getElementById('root').addEventListener('click', function () { //监听根节点，点击空白触发事件
    // closeApplicationModal();
    closeleLoginModal();
    toggleNavModalVisible('hide');
    hideTootip();
    closeIndustryModal();
    closeEgOptions();
    toggleLocaleModal(false)
  }, false);

  // items onchange
  addItemListen();
  const loginCell = document.body.querySelector('.login-cell');
  if (loginCell) {
    loginCell.addEventListener('keydown', loginCellOnKeyDown, true);
  }

  //mobile nav menu
  const mNavMenu = document.getElementById("nav-menu-id");
  const mNavClose = document.getElementById("nav-modal-close-id");
  if (mNavMenu) {
    const show = (e) => {
      e.stopPropagation();
      toggleNavModalVisible('show')
    };
    mNavMenu.addEventListener('click', show, true);
  }
  if (mNavClose) {
    const hide = () => toggleNavModalVisible('hide');
    mNavClose.addEventListener('click', hide, true);
  }

  const loginProduct = document.getElementById('login-product');

  if (loginProduct) {
    addEvent(loginProduct, 'click', opentNewWindow)
    // loginProduct.addEventListener('click', opentNewWindow, true);
  }

  if (loginModal) { //登陆弹窗
    loginModal.addEventListener('click', function (e) {
      e.stopPropagation();
    }, false);
  }
  if (navLogin) { //导航登陆按钮
    addEvent(navLogin, 'click', toggleLoginModalVisible)
    // navLogin.addEventListener('click', toggleLoginModalVisible, true);
  }
  if (formSubmitBtn) { //移动端表单提交按钮
    formSubmitBtn.addEventListener('click', submitForm, true);
  }
  /***********mobile***********/
  const industryLeftBtn = document.getElementById('industry-left')
  const industryRightBtn = document.getElementById('industry-right')
  if (industryLeftBtn) {
    industryLeftBtn.addEventListener('click', industryScrollRight, true)
  }
  if (industryRightBtn) {
    industryRightBtn.addEventListener('click', industryScrollLeft, true)
  }
  /*********mobile end*********/

  /**********************************/

  const registerGroupRadio = document.getElementById('comp-group')
  const registerFreeRadio = document.getElementById('free-group')
  // const sendVerifyBtn = document.getElementById('send-verifycode')
  const verifyCodeInput = document.getElementById('verifycode')
  const registerUrlInput = document.getElementById('input-url')
  const registerGroupName = document.getElementById('register-group-name')
  const passwordSet = document.getElementById('password-set')
  const passwordConfirm = document.getElementById('password-confirm')
  const demoSubmitBtn = document.getElementById('demo-submit');
  const domainOperators = document.getElementsByClassName('input-domain-operator');
  const registerDisplayName = document.getElementById('display-name')
  const registerGroupMobile = document.getElementById('group-mobile')
  if (registerGroupRadio) {
    registerGroupRadio.addEventListener('change', switchToGroup)
  }
  if (registerFreeRadio) {
    registerFreeRadio.addEventListener('change', switchToFree)
  }
  const registerBtn = document.getElementById('register-button')
  if (registerBtn) {
    registerBtn.addEventListener('click', submitRegister, true);
  }
  // if (sendVerifyBtn) {
  //   sendVerifyBtn.addEventListener('click', sendVerification, true)
  // }
  if (registerUrlInput) {
    registerUrlInput.addEventListener('input', function (e) { utlInputValidate(e.target.value) })
  }
  if (verifyCodeInput) {
    verifyCodeInput.addEventListener('input', function (e) { verifyCodeValidate(e.target.value) })
  }
  if (registerGroupName) {
    registerGroupName.addEventListener('input', function (e) { groupNameValidate(e.target.value) })
  }
  if (passwordSet) {
    passwordSet.addEventListener('input', function (e) { passwordSetValidate(e.target.value) })
  }
  if (passwordConfirm) {
    passwordConfirm.addEventListener('input', function (e) { passwordConfirmValidate(e.target.value) })
  }

  if (demoSubmitBtn) {
    demoSubmitBtn.addEventListener('click', submitDemo, true)
  }

  if (registerDisplayName) {
    registerDisplayName.addEventListener('input', function (e) { registerDisplayNameValidate(e.target.value) })
  }

  if (domainOperators.length > 0) {
    domainOperators[0].addEventListener('click', changeDomainItems, true)
  }

  if (registerGroupMobile) {
    registerGroupMobile.addEventListener('input', function (e) { registerGroupMobileValidate(e.target.value) })
  }
  /**********************************/
  /***********demo***********/
  const demoName = document.getElementById('demo-name')
  const demoEmail = document.getElementById('demo-email')
  const demoMobile = document.getElementById('demo-mobile')
  const demoCompany = document.getElementById('demo-company')
  if (demoName) {
    demoName.addEventListener('input', function (e) { validateDemoName(e.target.value) })
  }
  if (demoEmail) {
    demoEmail.addEventListener('input', function (e) { validateDemoEmail(e.target.value) })
  }
  if (demoMobile) {
    demoMobile.addEventListener('input', function (e) { validateDemoMobile(e.target.value) })
  }
  if (demoCompany) {
    demoCompany.addEventListener('input', function (e) { validateDemoCompany(e.target.value) })
  }

  /**********fix select option***********/
  const egs = document.getElementsByClassName('eg')
  if (egs) {
    for (let i = 0; i < egs.length; i++) {
      egs[i].addEventListener('click', switchOptions)
    }
  }

  /***********demo***********/
  const reserveSubmitBtn = document.getElementById('form-reserve-submit-btn-id')
  if (reserveSubmitBtn) {
    reserveSubmitBtn.addEventListener('click', submitFormReserve)
  }

  const industry0 = document.getElementsByClassName('industry0')
  const industry1 = document.getElementsByClassName('industry1')
  const industry2 = document.getElementsByClassName('industry2')
  const industry3 = document.getElementsByClassName('industry3')
  const industry4 = document.getElementsByClassName('industry4')
  const industry5 = document.getElementsByClassName('industry5')
  const industry6 = document.getElementsByClassName('industry6')
  const industry7 = document.getElementsByClassName('industry7')
  const industry8 = document.getElementsByClassName('industry8')
  const industry9 = document.getElementsByClassName('industry9')
  if (industry0) {
    for (let i = 0; i < industry0.length; i++) {
      industry0[i].addEventListener('click', function () { toDemoDetail(0) })
    }
  }
  if (industry1) {
    for (let i = 0; i < industry1.length; i++) {
      industry1[i].addEventListener('click', function () { toDemoDetail(1) })
    }
  }
  if (industry2) {
    for (let i = 0; i < industry2.length; i++) {
      industry2[i].addEventListener('click', function () { toDemoDetail(2) })
    }
  }
  if (industry3) {
    for (let i = 0; i < industry3.length; i++) {
      industry3[i].addEventListener('click', function () { toDemoDetail(3) })
    }
  }
  if (industry4) {
    for (let i = 0; i < industry4.length; i++) {
      industry4[i].addEventListener('click', function () { toDemoDetail(4) })
    }
  }
  if (industry5) {
    for (let i = 0; i < industry5.length; i++) {
      industry5[i].addEventListener('click', function () { toDemoDetail(5) })
    }
  }
  if (industry6) {
    for (let i = 0; i < industry6.length; i++) {
      industry6[i].addEventListener('click', function () { toDemoDetail(6) })
    }
  }
  if (industry7) {
    for (let i = 0; i < industry7.length; i++) {
      industry7[i].addEventListener('click', function () { toDemoDetail(7) })
    }
  }
  if (industry8) {
    for (let i = 0; i < industry8.length; i++) {
      industry8[i].addEventListener('click', function () { toDemoDetail(8) })
    }
  }
  if (industry9) {
    for (let i = 0; i < industry9.length; i++) {
      industry9[i].addEventListener('click', function () { toDemoDetail(9) })
    }
  }

  // cover listen
  // document.getElementById('cover').addEventListener('click', function () {
  //   closeApplicationModal();
  //   clearFormModal();
  //   closeleLoginModal();
  //   toggleNavModalVisible('hide');
  //   hideTootip();
  // }, false);

  // tootip listent
  const closeJoinModal = document.getElementById('close-join-modal');
  if (closeJoinModal) {
    closeJoinModal.addEventListener('click', function () {
      toogleJoinModal('hide')
    })
  }
  document.getElementById('tootip-succeed').addEventListener('click', function () {
    hideTootip();
  }, true);
  document.getElementById('tootip-err').addEventListener('click', function () {
    hideTootip();
  }, true);
  const joinTeam = document.getElementById('join-team')
  if (joinTeam) {
    joinTeam.addEventListener('click', function () { toogleJoinModal('show') })
  }
  const joinCancel = document.getElementById('login-register-cancel')
  if (joinCancel) {
    joinCancel.addEventListener('click', function () { toogleJoinModal('hide') })
  }
  const modalCover = document.getElementById('modal-cover')
  if (modalCover) {
    modalCover.addEventListener('click', function () {
      toogleJoinModal('hide')
      toogleAuthInvalidModal('hide')
      toggleModalCover('hide')
    })
  }
  const authConfirmBtn = document.getElementById('auth-confirm-btn')
  if (authConfirmBtn) {
    authConfirmBtn.addEventListener('click', function () {
      toogleAuthInvalidModal('hide')
    })
  }
  const loginRegister = document.getElementById('login-register')
  if (loginRegister) {
    loginRegister.addEventListener('click', jumpToProduct, true)
  }
  const registerMobileBtn = document.getElementById('register-mobile-button')
  if (registerMobileBtn) {
    registerMobileBtn.addEventListener('click', submitMobile, true)
  }

  const videoPlayButton = document.getElementById('play-btn')
  if (videoPlayButton) {
    videoPlayButton.addEventListener('click', function () {
      toggleVideo('show')
      toggleVideoCover('show')
    })
  }

  const closeVideoBtn = document.getElementById('close-video');
  if (closeVideoBtn) {
    const player = videojs('video-player')
    closeVideoBtn.addEventListener('click', function () {
      toggleVideoCover('hide')
      toggleVideo('hide')
      toggleVideoMask('hide')
      pushHmt('close', player.currentTime())
    })
  }

  const videoCovor = document.getElementById('video-cover')
  if (videoCovor) {
    const player = videojs('video-player')
    videoCovor.addEventListener('click', function () {
      toggleVideoCover('hide')
      toggleVideo('hide')
      toggleVideoMask('hide')
      pushHmt('close', player.currentTime())
    })
  }

  const videoRegisterBtn = document.getElementById('video-register-btn')
  if (videoRegisterBtn) {
    videoRegisterBtn.addEventListener('click', function () {
      pushHmt('register')
    })
  }

  const videoDemoBtn = document.getElementById('video-demo-btn')
  if (videoDemoBtn) {
    videoDemoBtn.addEventListener('click', function () {
      pushHmt('demo')
    })
  }
}
