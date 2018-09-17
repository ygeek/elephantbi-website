// reg
const mobileReg = /^[\d|+|-]*$/;
const emailReg = /@(163|foxmail|qq|gmail)\./;

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

var joinListOnClick = function (index) {
  var joinLists = document.getElementsByClassName('list-item');
  var joinListsLength = joinLists.length;
  for (var joinListsIndex = 0; joinListsIndex < joinListsLength; joinListsIndex++) {
    var item = joinLists[joinListsIndex];
    item.className = 'list-item';
  };
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

const request = (url, params) => {
  return fetch(
    `https://api.flexceed.com${url}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(params)
    }
  )
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }

      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(data => ({ data }))
    .catch(err => ({ err }));
};

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
    item.setAttribute('data-err', item.getAttribute('data-attr'));
    item.className = "form-wrap errTextarea";
    return false;
  }

  item.className = "form-wrap";
  return true
};

const validate = (value = '', item, regs = {}) => {
  const { reg, negateReg } = regs;
  if (value.length === 0) {
    item.setAttribute('data-err', item.getAttribute('data-attr'));
    item.className = "form-item err";
    return false;
  }

  if (reg && !reg.test(value)) {
    item.setAttribute('data-err', item.getAttribute('data-input'));
    item.className = "form-item err";
    return false;
  }

  if (negateReg && negateReg.test(value)) {
    item.setAttribute('data-err', item.getAttribute('data-input'));
    item.className = "form-item err";
    return false;
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
    source: SOURCE
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
    source: SOURCE
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
  const matchBackHost = window.backhost.match(/https:\/\/api.(.*).com/)
  const envHost = matchBackHost[1]

  request('/website/domain', { domain: hostsName.value })
    .then((res) => {
      const data = res.data || {};
      if (data.exists === 1) {
        openNewWindow('https://' + hostsName.value + '.' + envHost + '.com/unregister/login');
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
  const matchBackHost = window.backhost.match(/https:\/\/api.(.*).com/)
  const envHost = matchBackHost[1]

  request('/website/domain', { domain: hostsName.value })
    .then((res) => {
      const data = res.data || {};
      if (data.exists === 1) {
        window.location.href = "https://" + hostsName.value + '.' + envHost + '.com/unregister/signup'
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

const requestWx = (url, params) => {
  return fetch(
    `https://api.elephantbi.com${url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  )
    .then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }

      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(data => ({ data }))
    .catch(err => ({ err }));
};

const authlink = () => {
  requestWx('/wx/auth/link')
    .then((res) => {
      const link = res.data.auth_link;
      openNewWindow(link);
    });
};
const wxregisterlink = () => {
  requestWx('/wx/register/link')
    .then((res) => {
      const link = res.data.register_link;
      openNewWindow(link);
    });
};

// 微信扫码登录 服务
// fixed url
const FIXED_URL = window.OAUTHURL;
const gennerateFixedUrlRedirect = (rUrl) => {
  return `${FIXED_URL}/login?redirect_url=${rUrl}`;
};

// 单点登录
const REDIRECT_URL_SSO = encodeURIComponent(`${FIXED_URL}/server_redirect?env=${window.imageEnv}`);
const gennerateWxSSO = (redirectUri) => {
  return `https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=${window.corpid}&redirect_uri=${redirectUri}&usertype=admin`;
};

const WX_SSO_RURL = encodeURIComponent(gennerateWxSSO(REDIRECT_URL_SSO));
const WX_SSO = gennerateFixedUrlRedirect(WX_SSO_RURL);

const openWxServer = () => {
  openNewWindow(WX_SSO);
};

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
    label.innerText = '免验证邮箱域名'

    const domainItemWrapper = document.createElement('span')
    domainItemWrapper.setAttribute('class', 'domain-item-wrapper')

    const domainWrapper = document.createElement('span')
    domainWrapper.setAttribute('class', 'domain-field form-item')

    const domainFixed = document.createElement('span')
    domainFixed.setAttribute('class', 'domain-fixed')
    domainFixed.innerText = '@'

    const domainInput = document.createElement('input')
    domainInput.setAttribute('id', 'input-domain')
    domainInput.placeholder = '请输入团队域名'

    const domainImage = document.createElement('img')
    domainImage.src = require('../assets/checked.png')

    domainWrapper.appendChild(domainFixed)
    domainWrapper.appendChild(domainInput)
    domainWrapper.appendChild(domainImage)
    domainItemWrapper.appendChild(domainWrapper)

    const domainDescription = document.createElement('div')
    domainDescription.setAttribute('class', 'url-description')
    domainDescription.style.width = '300px'
    domainDescription.style.marginBottom = '35px'
    domainDescription.innerText = '免验证邮箱域名登陆后，不需要管理员审核，团队创建巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉'

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
const switchToFree = (e) => {
  if (e.target.checked) {
    const registerForm = document.getElementById('register-form')
    const domainField = document.getElementById('domain-field')
    const groupMobile = document.getElementById('group-mobile')
    if (domainField && groupMobile) {
      const groupMobileItem = groupMobile.parentNode
      const groupMobileLabel = document.getElementById('group-mobile-label')
      registerForm.removeChild(domainField)
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
    }
  }
}

const submitRegister = () => {
  const registerUrl = registerForm.registerUrl.value
  const registerGroupName = registerForm.registerGroupName.value
  const registerTypeGroup = registerForm.registerType[0].checked
  const registerTypeFree = registerForm.registerType[1].checked
  const registerEmail = registerForm.registerEmail.value
  const registerVerifiedCode = registerForm.registerVerifiedCode.value
  const registerPasswordSet = registerForm.registerPasswordSet.value
  const registerPasswordConfirm = registerForm.registerPasswordConfirm.value
  const registerDisplayName = registerForm.registerDisplayName.value
  const registerGroupMobile = registerForm.registerDisplayMobile.value
  const inputDomains = document.getElementsByClassName('input-domain')
  let errorNum = 0
  const aliVerification = JSON.parse(sessionStorage.getItem('aliVerification'))
  if (!aliVerification) {
    const ncContainer = document.getElementById('nc-container')
    ncContainer.className = ncContainer.className + ' error'
    errorNum += 1
    sessionStorage.removeItem('aliVerification')
  }
  if (!registerUrl) {
    const formItem = registerForm.registerUrl.parentNode.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }
  if (!registerGroupName) {
    const formItem = registerForm.registerGroupName.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }
  if (!registerEmail) {
    const formItem = registerForm.registerEmail.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }
  if (!registerVerifiedCode) {
    const formItem = registerForm.registerVerifiedCode.parentNode.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }
  if (!registerPasswordSet) {
    const formItem = registerForm.registerPasswordSet.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }
  if (!registerPasswordConfirm) {
    const formItem = registerForm.registerPasswordConfirm.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }

  if (!registerDisplayName) {
    const formItem = registerForm.registerDisplayName.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }

  if (!registerGroupMobile) {
    const formItem = registerForm.registerDisplayMobile.parentNode
    formItem.className = formItem.className + ' error'
    errorNum += 1
  }

  if (errorNum > 0) {
    return false
  }
  const email_domains = [];
  for (let i = 0; i < inputDomains.length; i++) {
    if (inputDomains[i].value) {
      email_domains.push(inputDomains[i].value)
    }
  }
  const params = {
    domain: registerUrl,
    name: registerGroupName,
    team_type: registerTypeGroup ? 0 : 1,
    email: registerTypeGroup ? registerEmail : null,
    mobile: registerTypeGroup ? registerGroupMobile : registerEmail,
    code: registerVerifiedCode,
    password: registerPasswordSet,
    password_confirm: registerPasswordConfirm,
    username: registerDisplayName,
    email_domains,
    scene: aliVerification.scene,
    token: aliVerification.nc_token,
    sig: aliVerification.sig,
    session_id: aliVerification.csessionid,
    source: '官网'
  }

  request('/team/create', params)
    .then(({ data }) => {
      if (data.id) {
        onSucceed()
        const matchBackHost = window.backhost.match(/https:\/\/api.(.*).com/)
        const envHost = matchBackHost[1]
        window.location.href = 'https://' + registerUrl + '.' + envHost + '.com/unregister/login'
      } else {
        onErr()
      }
    });
}

const sendVerification = () => { //发送存储验证码
  const registerTypeGroup = registerForm.registerType[0].checked
  const registerEmail = registerForm.registerEmail.value
  const params = {
    auth_type: registerTypeGroup ? 0 : 1,
    send_to: registerEmail,
    code_type: 2
  }
  request('/auth/code', params)
    .then(({ data }) => {
      if (data) {
        if (data.code_hash) {
          sessionStorage.setItem("verify", data.code_hash)
        }
      } else {
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
  const md5 = require('MD5')
  const verifyCodeInput = document.getElementById('verifycode')
  const errNode = verifyCodeInput.parentNode.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请输入验证码')
    return false
  } else {
    const verifyCode = sessionStorage.getItem('verify')
    if (md5(value) !== verifyCode) {
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      errNode.setAttribute('data-err', '验证码输入错误')
      return false
    }
    if (currentError(errNode)) {
      errNode.className = errNode.className.replace(/error/, '')
    }
    return true
  }
}

const utlInputValidate = (value) => { //团队域名校验
  const registerUrlInput = document.getElementById('input-url')
  const errNode = registerUrlInput.parentNode.parentNode
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
    return false
  }
  if (currentError(errNode)) {
    errNode.className = errNode.className.replace(/error/, '')
  }
  return true
}

const registerEmailMobileValidate = (value) => { //邮箱手机号校验
  const registerEmail = document.getElementById('register-email')
  const registerTypeGroup = registerForm.registerType[0].checked //checked-email unchecked-mobile
  const errNode = registerEmail.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', registerTypeGroup ? '请输入电子邮箱' : '请输入手机号码')
  } else {
    if (registerTypeGroup) {
      const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (!reg.test(value)) { //邮箱验证不通过
        if (!currentError(errNode)) {
          errNode.className = errNode.className + ' error'
        }
        errNode.setAttribute('data-err', '邮箱格式不正确')
        return false
      }
      if (currentError(errNode)) {
        errNode.className = errNode.className.replace(/error/, '')
      }
      return true
    }
    if (!registerTypeGroup) {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!reg.test(value)) {
        if (!currentError(errNode)) {
          errNode.className = errNode.className + ' error'
        }
        errNode.setAttribute('data-err', '手机格式不正确')
        return false
      }
      if (currentError(errNode)) {
        errNode.className = errNode.className.replace(/error/, '')
      }
      return true
    }
  }
}

const passwordSetValidate = (value) => {
  const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/
  const passwordSet = document.getElementById('password-set')
  const passwordConfirm = document.getElementById('password-confirm')
  const errNode = passwordSet.parentNode
  const confirmErrNode = passwordConfirm.parentNode
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
      errNode.setAttribute('data-err', '密码格式不正确')
      return false
    }
    if (passwordConfirm.value && value !== passwordConfirm.value) {
      if (currentError(errNode)) {
        errNode.className = errNode.className.replace(/error/, '')
      }
      if (!currentError(confirmErrNode)) {
        confirmErrNode.className = errNode.className + ' error'
      }
      confirmErrNode.setAttribute('data-err', '两次密码输入不一致')
      return false
    }
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
    errNode.setAttribute('data-err', '请确认密码')
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


const focusPriceList = (node, i) => {
  const colorLists = {
    '1': '#6b7c93',
    '2': '#76c1ef',
    '3': '#0abebe',
    '4': '#f5a623'
  }
  const priceLists = document.getElementsByClassName('price-list')
  for (let i = 1; i < priceLists.length; i++) {
    priceLists[i].style.border = 'none'
  }
  node.style.border = "2px solid " + colorLists[i]
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
    newInput.setAttribute('placeholder', '请输入免验证域名')
    const newOperator = document.createElement('img')
    newOperator.src = require('../assets/checked.png')
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

const toRegister = (e) => {
  window.location.href = window.location.origin + '/register.html'
}

const toDemo = () => {
  window.location.href = window.location.origin + '/demo.html'
}

const changeHeader = () => {
  const htmlDom = document.documentElement
  const navHeader = document.getElementById('nav-header')
  const logo = document.getElementById('logo')
  if (htmlDom.scrollTop > 0) {
    const navContent = document.getElementsByClassName('nav-content')[0]
    if (navContent) {
      navContent.className = 'nav-scroll-white'
      navHeader.className = navHeader.className + ' nav-header'
      logo.src = require("../assets/nav-logo-black.svg")
    }
  } else {
    const navContent = document.getElementsByClassName('nav-scroll-white')[0]
    if (navContent) {
      navContent.className = 'nav-content'
      navHeader.className = navHeader.className.replace(' nav-header', '')
      if (navHeader.className.indexOf('nav-header') == -1) {
        logo.src = require("../assets/nav-logo.svg")
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
  // carouselList.style.left = carouselList.offsetLeft + scrollStep + 'px'
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
  const remark = feedbackForm.feedbackRemark.value
  let errNum = 0;
  if (!name) {
    const errNode = feedbackForm.feedbackName.parentNode;
    errNode.className = errNode.className.indexOf('error') > -1 ? errNode.className : errNode.className + ' error'
    errNum += 1
  }
  if (!email) {
    const errNode = feedbackForm.feedbackEmail.parentNode;
    errNode.className = errNode.className.indexOf('error') > -1 ? errNode.className : errNode.className + ' error'
    errNum += 1
  }
  if (!mobile) {
    const errNode = feedbackForm.feedbackMobile.parentNode;
    errNode.className = errNode.className.indexOf('error') > -1 ? errNode.className : errNode.className + ' error'
    errNum += 1
  }
  if (!company) {
    const errNode = feedbackForm.feedbackCompany.parentNode;
    errNode.className = errNode.className.indexOf('error') > -1 ? errNode.className : errNode.className + ' error'
    errNum += 1
  }
  if (errNum > 0) {
    return false
  }
  const params = {
    name,
    email,
    mobile,
    company,
    remark
  }
  request('website/feedback', params).then((data) => {

  })
}

const changeMobileHeader = () => {
  const navHeader = document.getElementById('nav-header')
  const logo = document.getElementById('logo')
  const menu = document.getElementById('nav-menu-id')
  if ((document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) > 0) {
    const navContent = document.getElementsByClassName('nav-content')[0]
    if (navContent) {
      navContent.className = 'nav-scroll-white'
      navHeader.className = navHeader.className + ' nav-header'
      logo.src = require("../assets/nav-logo-black.svg")
      menu.src = require('../mobile/assets/nav-menu.svg')
    }
  } else {
    const navContent = document.getElementsByClassName('nav-scroll-white')[0]
    if (navContent) {
      navContent.className = 'nav-content'
      navHeader.className = navHeader.className.replace(' nav-header', '')
      if (navHeader.className.indexOf('nav-header') == -1) {
        logo.src = require("../assets/nav-logo.svg")
        menu.src = require('../mobile/assets/nav-menu-white.png')
      }
    }
  }
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

const validateDemoEmail = (value) => {
  const self = document.getElementById('demo-email')
  const errNode = self.parentNode
  const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请输入电子邮箱')
    return false
  }
  if (value) {
    if (!reg.test(value)) { //邮箱验证不通过
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      errNode.setAttribute('data-err', '邮箱格式不正确')
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
  const errNode = self.parentNode
  if (!value) {
    if (!currentError(errNode)) {
      errNode.className = errNode.className + ' error'
    }
    errNode.setAttribute('data-err', '请输入手机号码')
    return false
  }
  if (value) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!reg.test(value)) {
      if (!currentError(errNode)) {
        errNode.className = errNode.className + ' error'
      }
      errNode.setAttribute('data-err', '手机格式不正确')
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
  if (errNum > 0) {
    return false
  }
  const params = {
    name, email, mobile,
    company, industry, scale,
    department, position, remarks,
    source: '官网'
  }
  request('/website/trail', params).then((data) => {
    if (data) {
      onSucceed()
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
      for(let i = 0; i < egOptions.length; i ++) {
        egOptions[i].style.display = 'none'
      }
    }
    options.style.display = 'block'
  }
  if (options.style.display === 'block') {
    for (let i = 0; i < options.children.length; i ++) {
      options.children[i].addEventListener('click', function(e){ setSelectValue(valueNode, e.currentTarget, options) })
    }
  }
}

const closeEgOptions = () => {
  const egOptions = document.getElementsByClassName('options')
  if (egOptions) {
    for (let i = 0; i < egOptions.length; i ++) {
      egOptions[i].style.display = 'none'
    }
  }
}

const toogleJoinModal = (type) => {
  const joinModal = document.getElementById('join-modal')
  const modalCover = document.getElementById('modal-cover')
  const joinRegister = document.getElementById('input-register')
  const errNode = joinRegister.parentNode.parentNode
  if (joinModal && modalCover) {
    if (type == 'show') {
      modalCover.style.display = 'block'
      joinModal.style.display = 'block'
      document.body.style.overflow = 'hidden'
      joinRegister.value = null
    }
    if (type == 'hide') {
      modalCover.style.display = 'none'
      joinModal.style.display = 'none'
      document.body.style.overflow = 'auto'
      joinRegister.value = null
    }
    if (errNode.className.indexOf('err') > -1) {
      errNode.className = errNode.className.replace('err', '')
    }
  }
}

window.onload = function () {
  //wx login
  const wxbtnlogup = document.getElementById('wx-btn-logup');
  if (wxbtnlogup) {
    wxbtnlogup.addEventListener('click', authlink, true);
  }
  const wxbtnlogin = document.getElementById('wx-btn-login');
  if (wxbtnlogin) {
    wxbtnlogin.addEventListener('click', wxregisterlink, true);
  }
  const wxbtnserverlogin = document.getElementById('wx-login');
  if (wxbtnserverlogin) {
    wxbtnserverlogin.addEventListener('click', openWxServer, true);
  }
  window.onscroll = changeHeader //
  document.body.addEventListener('scroll', function(e) {
    toggleNavModalVisible('hide');
    changeMobileHeader(e);
  })
  const freeBtns = document.getElementsByClassName('free-btn') //免费注册按钮
  if (freeBtns) {
    for (let i = 0; i < freeBtns.length; i++) {
      freeBtns[i].onclick = toRegister
    }
  }
  const demoBtns = document.getElementsByClassName('demo-btn'); //预约演示按钮
  if (demoBtns) {
    for (let i = 0; i < demoBtns.length; i++) {
      demoBtns[i].onclick = toDemo
    }
  }
  const formSubmitBtn = document.getElementById('form-submit-btn-id'); //移动端表单提交按钮
  const loginModal = document.getElementById('login-modal'); //登陆弹窗
  const navLogin = document.getElementById('nav-login'); //导航登陆按钮
  const logo = document.getElementById("logo"); //导航logo
  const footerLogo = document.getElementById("footer-logo") //页底logo
  const industryLink = document.getElementById("nav-industry-link") //导航行业信息链接

  const feedbackBtn = document.getElementById('feedback-submit');
  if (feedbackBtn) {
    feedbackBtn.addEventListener('click', submitFeedback, true)
  }

  if (industryLink) {
    industryLink.addEventListener('click', showIndustryModal, true)
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
    closeEgOptions()
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
    loginProduct.addEventListener('click', opentNewWindow, true);
  }

  const priceLists = document.getElementsByClassName('price-list')
  if (priceLists) {
    for (let i = 1; i < priceLists.length; i++) {
      priceLists[i].addEventListener('mouseover', function () { focusPriceList(priceLists[i], i) }, true)
    }
  }

  if (loginModal) { //登陆弹窗
    loginModal.addEventListener('click', function (e) {
      e.stopPropagation();
    }, false);
  }
  if (navLogin) { //导航登陆按钮
    navLogin.addEventListener('click', toggleLoginModalVisible, true);
  }
  if (formSubmitBtn) { //移动端表单提交按钮
    formSubmitBtn.addEventListener('click', submitForm, true);
  }
  if (logo) { //导航logo
    logo.addEventListener('click', jumpHomePage, true);
  }
  if (footerLogo) { //页底logo
    footerLogo.addEventListener('click', jumpHomePage, true);
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
  const sendVerifyBtn = document.getElementById('send-verifycode')
  const verifyCodeInput = document.getElementById('verifycode')
  const registerUrlInput = document.getElementById('input-url')
  const registerGroupName = document.getElementById('register-group-name')
  const registerEmail = document.getElementById('register-email')
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
  if (sendVerifyBtn) {
    sendVerifyBtn.addEventListener('click', sendVerification, true)
  }
  if (registerUrlInput) {
    registerUrlInput.addEventListener('input', function (e) { utlInputValidate(e.target.value) })
  }
  if (verifyCodeInput) {
    verifyCodeInput.addEventListener('input', function (e) { verifyCodeValidate(e.target.value) })
  }
  if (registerGroupName) {
    registerGroupName.addEventListener('input', function (e) { groupNameValidate(e.target.value) })
  }
  if (registerEmail) {
    registerEmail.addEventListener('input', function (e) { registerEmailMobileValidate(e.target.value) })
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
    registerDisplayName.addEventListener('input', function(e) { registerDisplayNameValidate(e.target.value) })
  }

  if (domainOperators.length > 0) {
    domainOperators[0].addEventListener('click', changeDomainItems, true)
  }

  if (registerGroupMobile) {
    registerGroupMobile.addEventListener('input', function(e) { registerGroupMobileValidate(e.target.value) })
  }
  /**********************************/
  /***********demo***********/
  const demoName = document.getElementById('demo-name')
  const demoEmail = document.getElementById('demo-email')
  const demoMobile = document.getElementById('demo-mobile')
  const demoCompany = document.getElementById('demo-company')
  if (demoName) {
    demoName.addEventListener('input', function(e){ validateDemoName(e.target.value) })
  }
  if (demoEmail) {
    demoEmail.addEventListener('input', function(e){ validateDemoEmail(e.target.value) })
  }
  if (demoMobile) {
    demoMobile.addEventListener('input', function(e){ validateDemoMobile(e.target.value) })
  }
  if (demoCompany) {
    demoCompany.addEventListener('input', function(e){ validateDemoCompany(e.target.value) })
  }

  /**********fix select option***********/
  const egs = document.getElementsByClassName('eg')
  if (egs) {
    for(let i = 0; i < egs.length; i ++) {
      egs[i].addEventListener('click', switchOptions)
    }
  }

  /***********demo***********/
  const reserveSubmitBtn = document.getElementById('form-reserve-submit-btn-id')
  if (reserveSubmitBtn) {
    reserveSubmitBtn.addEventListener('click', submitFormReserve)
  }

  const priceListButton = document.getElementsByClassName('price-list-button')
  if (priceListButton) {
    for(let i = 0; i < priceListButton.length; i ++ ) {
      priceListButton[i].addEventListener('click', toRegister)
    }
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
    for (let i = 0; i < industry0.length; i ++ ) {
      industry0[i].addEventListener('click', function(){ toDemoDetail(0) })
    }
  }
  if (industry1) {
    for (let i = 0; i < industry1.length; i ++ ) {
      industry1[i].addEventListener('click', function(){ toDemoDetail(1) })
    }
  }
  if (industry2) {
    for (let i = 0; i < industry2.length; i ++ ) {
      industry2[i].addEventListener('click', function(){ toDemoDetail(2) })
    }
  }
  if (industry3) {
    for (let i = 0; i < industry3.length; i ++ ) {
      industry3[i].addEventListener('click', function(){ toDemoDetail(3) })
    }
  }
  if (industry4) {
    for (let i = 0; i < industry4.length; i ++ ) {
      industry4[i].addEventListener('click', function(){ toDemoDetail(4) })
    }
  }
  if (industry5) {
    for (let i = 0; i < industry5.length; i ++ ) {
      industry5[i].addEventListener('click', function(){ toDemoDetail(5) })
    }
  }
  if (industry6) {
    for (let i = 0; i < industry6.length; i ++ ) {
      industry6[i].addEventListener('click', function(){ toDemoDetail(6) })
    }
  }
  if (industry7) {
    for (let i = 0; i < industry7.length; i ++ ) {
      industry7[i].addEventListener('click', function(){ toDemoDetail(7) })
    }
  }
  if (industry8) {
    for (let i = 0; i < industry8.length; i ++ ) {
      industry8[i].addEventListener('click', function(){ toDemoDetail(8) })
    }
  }
  if (industry9) {
    for (let i = 0; i < industry9.length; i ++ ) {
      industry9[i].addEventListener('click', function(){ toDemoDetail(9) })
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
  document.getElementById('tootip-succeed').addEventListener('click', function () {
    hideTootip();
  }, true);
  document.getElementById('tootip-err').addEventListener('click', function () {
    hideTootip();
  }, true);
  const joinTeam = document.getElementById('join-team')
  if (joinTeam) {
    joinTeam.addEventListener('click', function() { toogleJoinModal('show') })
  }
  const joinCancel = document.getElementById('login-register-cancel')
  if (joinCancel) {
    joinCancel.addEventListener('click', function() { toogleJoinModal('hide') })
  }
  const modalCover = document.getElementById('modal-cover')
  if (modalCover) {
    modalCover.addEventListener('click', function() { toogleJoinModal('hide')})
  }
  const loginRegister = document.getElementById('login-register')
  if (loginRegister) {
    loginRegister.addEventListener('click', jumpToProduct, true)
  }

}
