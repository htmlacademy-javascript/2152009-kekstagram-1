const successMessageTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorMessageTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const MessageFragment = document.createDocumentFragment();
const ALERT_SHOW_TIME = 5000;
export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '20px 10px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#E41749';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
export const isEscapeKey = (evt) => evt.key === 'Escape';

export const renderMessage = (messageType) => {
  const elementMessage =
    messageType === 'success'
      ? successMessageTemplate.cloneNode(true)
      : errorMessageTemplate.cloneNode(true);

  MessageFragment.appendChild(elementMessage);
  document.body.appendChild(MessageFragment);

  const cancelButton =
    elementMessage.querySelector('.success__button') ||
    elementMessage.querySelector('.error__button');
  const removeMessage = () => {
    if (document.body.contains(elementMessage)) {
      document.body.removeChild(elementMessage);
      document.removeEventListener('keydown', onKeydownRemoveMessage);
      window.removeEventListener('click', onClickRemoveMessage);
    }
  };
  //var для поднятия функции
  var onKeydownRemoveMessage = (event) => {
    if (isEscapeKey(event)) {
      removeMessage();
    }
  };
  // var для поднятия функции
  var onClickRemoveMessage = (event) => {
    if (!elementMessage.contains(event.target)) {
      removeMessage();
    }
  };

  if (cancelButton) {
    cancelButton.addEventListener('click', removeMessage);
  }

  document.addEventListener('keydown', onKeydownRemoveMessage);
  window.addEventListener('click', onClickRemoveMessage);
};
export const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};
