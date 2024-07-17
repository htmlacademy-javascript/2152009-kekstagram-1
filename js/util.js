const successMessageTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorMessageTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const alertContainerError = document.querySelector('#alertContainerError').content.querySelector('.alertContainerError');
const messageFragment = document.createDocumentFragment();
const alertContainerFragment = document.createDocumentFragment();
const ALERT_SHOW_TIME = 5000;
export const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};
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

  messageFragment.appendChild(elementMessage);
  document.body.appendChild(messageFragment);

  const cancelButton =
    elementMessage.querySelector('.success__button') ||
    elementMessage.querySelector('.error__button');
  const removeMessage = () => {
    if (document.body.contains(elementMessage)) {
      document.body.removeChild(elementMessage);
      document.removeEventListener('keydown', onKeydownRemoveMessage);
      window.removeEventListener('click', handleClickRemoveMessage);
    }
  };

  function onKeydownRemoveMessage(evt){
    if (isEscapeKey(evt)) {
      removeMessage();
    }
  }

  function handleClickRemoveMessage (evt) {
    if (!elementMessage.contains(evt.target)) {
      removeMessage();
    }
  }
  cancelButton?.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onKeydownRemoveMessage);
  window.addEventListener('click', handleClickRemoveMessage);
};

export const debounce = (callback, timeoutDelay) =>{
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
};
