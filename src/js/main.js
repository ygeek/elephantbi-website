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
  applicationModal.className = 'modal';
};
const closeleLoginModal = () => {
  const applicationModal = document.getElementById('login-modal');
  applicationModal.className = 'login-modal';
};

window.onload = function () {
  document.getElementById('nav-application').addEventListener('click', toggleApplicationModalVisible, true);
  document.getElementById('root').addEventListener('click', function() {
    closeApplicationModal();
    closeleLoginModal();
  }, false);
  document.getElementById('nav-login').addEventListener('click', toggleLoginModalVisible, true);
  document.getElementById('login-modal').addEventListener('click', function(e) {
    e.stopPropagation();
  }, false);

  const modalIdClose = document.getElementById('modal-id-close');
  modalIdClose.onclick = closeApplicationModal;
}
