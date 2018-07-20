window.host = 'https://elephantbi.com';
window.backhost = 'https://api.elephantbi.com';

var joinListOnClick = function(index) {
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
    loginModal.className = 'login-modal modal-show';
  } else {
    loginModal.className = 'login-modal';
  }
};

const toggleApplicationModalVisible = (e) => {
  e.stopPropagation();
  const applicationModal = document.getElementById('modal-application');
  const className = applicationModal.className;
  if (className === 'modal') {
    applicationModal.className = 'modal modal-show';
  } else {
    document.removeEventListener('root').addEventListener('click', closeApplicationModal, false);
    applicationModal.className = 'modal';
  }
};

const closeApplicationModal = () => {
  const applicationModal = document.getElementById('modal-application');
  if (applicationModal) {
    applicationModal.className = 'modal';
  }
};
const closeleLoginModal = () => {
  const applicationModal = document.getElementById('login-modal');
  if (applicationModal) {
    applicationModal.className = 'login-modal';
  }
};

const request = (url, params) => {
  return fetch(
    `https://api.elephantbi.com${url}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(params)
    }
  ).then(function(response) {
      return response.json();
    });
};

const submitForm = () => {
  const params = {
    name: form1.name.value,
    email: form1.email.value,
    mobile: form1.mobile.value,
    company: form1.company.value,
    department: form1.department.value,
    title: form1.title.value
  };
  request('/website/trail', params)
    .then(() => {
      closeApplicationModal();
    });
};

const submitModalForm = () => {
  const params = {
    name: formModal.name.value,
    email: formModal.email.value,
    mobile: formModal.mobile.value,
    company: formModal.company.value,
    department: formModal.department.value,
    title: formModal.title.value
  };
  request('/website/trail', params)
    .then(() => {
      closeApplicationModal();
    });
};

const submitFormReserve = () => {
  const type1 = formReserve.type[0].checked;
  const type2 = formReserve.type[1].checked;
  const type = () => {
    if (type1) {
      return 0;
    }
    if (type2) {
      return 1;
    }
    return undefined;
  };
  const params = {
    name: formReserve.name.value,
    email: formReserve.email.value,
    mobile: formReserve.mobile.value,
    company: formReserve.company.value,
    type: type(),
    content: formReserve.content.value
  };
  request('/website/feedback', params);
};

const nextCard = () => {
  const cards = document.getElementsByClassName('show-card');
  const cardsLength = cards.length;
  let currentIndex = 0;
  for (let cardsIndex = 0; cardsIndex < cardsLength; cardsIndex++) {
    const item = cards[cardsIndex];
    const className = item.className;
    if (className === 'show-card show') {
      currentIndex = cardsIndex;
      item.className = 'show-card';
    }
  };
  const nextIndex = (currentIndex + 1) % cardsLength;
  cards[nextIndex].className = 'show-card show';

};

const upCard = () => {
  const cards = document.getElementsByClassName('show-card');
  const cardsLength = cards.length;
  let currentIndex = 0;
  for (let cardsIndex = 0; cardsIndex < cardsLength; cardsIndex++) {
    const item = cards[cardsIndex];
    const className = item.className;
    if (className === 'show-card show') {
      currentIndex = cardsIndex;
      item.className = 'show-card';
    }
  };
  const upIndex = (cardsLength + currentIndex - 1) % cardsLength;
  cards[upIndex].className = 'show-card show';
};

const opentNewWindow = () => {
  const hostsName = document.getElementById('input-hosts');
  window.open('https://' + hostsName.value + '.elephantbi.com', '_blank');
  closeleLoginModal();
};

const jumpHomePage = () => {
  window.location.href = window.host;
};

window.onload = function () {
  const navApplication = document.getElementById('nav-application');
  const freeBtn = document.getElementById('free-btn-id');
  const formSubmitBtn = document.getElementById('form-submit-btn-id');
  const formModalSubmitBtn = document.getElementById('form-modal-submit-btn-id');
  const formReserveSubmitBtn = document.getElementById('form-reserve-submit-btn-id');
  const loginModal = document.getElementById('login-modal');
  const navLogin = document.getElementById('nav-login');
  const logo = document.getElementById("logo");

  const loginProduct = document.getElementById('login-product');

  const upBtn = document.getElementById('up-btn');
  const downBtn = document.getElementById('down-btn');

  if (loginProduct) {
    loginProduct.addEventListener('click', opentNewWindow, true);
  }

  if (upBtn) {
    upBtn.addEventListener('click', upCard, true);
  }
  if (downBtn) {
    downBtn.addEventListener('click', nextCard, true);
  }

  if (loginModal) {
    loginModal.addEventListener('click', function(e) {
      e.stopPropagation();
    }, false);
  }
  if (navLogin) {
    navLogin.addEventListener('click', toggleLoginModalVisible, true);
  }
  if (navApplication) {
    navApplication.addEventListener('click', toggleApplicationModalVisible, true);
  }
  if (freeBtn) {
    freeBtn.addEventListener('click', toggleApplicationModalVisible, true);
  }
  if (formModalSubmitBtn) {
    formModalSubmitBtn.addEventListener('click', submitModalForm, true);
  }
  if (formReserveSubmitBtn) {
    formReserveSubmitBtn.addEventListener('click', submitFormReserve, true);
  }
  if (formSubmitBtn) {
    formSubmitBtn.addEventListener('click', submitForm, true);
  }
  if (logo) {
    logo.addEventListener('click', jumpHomePage, true);
  }

  document.getElementById('root').addEventListener('click', function() {
    closeApplicationModal();
    closeleLoginModal();
  }, false);

  const modalIdClose = document.getElementById('modal-id-close');
  modalIdClose.onclick = closeApplicationModal;

  var joinLists = document.getElementsByClassName('list-item');
  var joinListsLength = joinLists.length;
  for (var joinListsIndex = 0; joinListsIndex < joinListsLength; joinListsIndex++) {
    var item = joinLists[joinListsIndex];
    var aelement = item.getElementsByTagName('a');
    const target = joinListsIndex;
    aelement[0].onclick = function() {
      joinListOnClick(target);
    };
  }

  const cards = document.getElementsByClassName('card-btn');
  const cardsLength = cards.length;
  let currentIndex = 0;
  for (let cardsIndex = 0; cardsIndex < cardsLength; cardsIndex++) {
    const item = cards[cardsIndex];
    item.onclick= toggleApplicationModalVisible;
  };
}
