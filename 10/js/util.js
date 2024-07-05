const successMessageTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorMessageTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const alertContainerError = document.querySelector('#alertContainerError').content.querySelector('.alertContainerError');
const MessageFragment = document.createDocumentFragment();
const alertContainerFragment = document.createDocumentFragment();
const ALERT_SHOW_TIME = 5000;
export const showAlert = (message) => {
  const alertElement = alertContainerError.cloneNode(true);
  alertElement.querySelector('.alertContainerErrorMessage').innerHTML = message;
  alertContainerFragment.appendChild(alertElement);
  document.body.appendChild(alertContainerFragment);

  setTimeout(() => {
    document.body.removeChild(alertContainerFragment);
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

  function onKeydownRemoveMessage(event){
    if (isEscapeKey(event)) {
      removeMessage();
    }
  }

  function onClickRemoveMessage (event) {
    if (!elementMessage.contains(event.target)) {
      removeMessage();
    }
  }


  cancelButton?.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onKeydownRemoveMessage);
  window.addEventListener('click', onClickRemoveMessage);
};
export const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};
