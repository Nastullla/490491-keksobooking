'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  var KeyCode = {
    ESC: 27
  };

  var isEscKey = function (evt) {
    return evt.keyCode === KeyCode.ESC;
  };

  var createMessageElement = function (id, selector) {
    var messageTemplateElement = document.querySelector('#' + id).content.querySelector('.' + selector);
    var message = messageTemplateElement.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', message);
    return message;
  };

  var getMessageElement = function (id, selector) {
    var messageElement = document.querySelector('.' + selector);
    if (!messageElement) {
      messageElement = createMessageElement(id, selector);
    }
    return messageElement;
  };

  var onError = function (errorMessage, onClickButton) {
    var errorElement = getMessageElement('error', 'error');
    errorElement.querySelector('.error__message').textContent = errorMessage;
    errorElement.classList.remove('hidden');

    var errorButtonElement = errorElement.querySelector('.error__button');

    var closeErrorMessage = function () {
      errorElement.classList.add('hidden');
      errorElement.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
      errorButtonElement.removeEventListener('click', onClickErrorButton);
    };

    var onClick = function () {
      closeErrorMessage();
    };

    var onKeyDown = function (evt) {
      if (isEscKey(evt)) {
        closeErrorMessage();
      }
    };

    var onClickErrorButton = function () {
      closeErrorMessage();
      if (onClickButton) {
        onClickButton();
      }
    };

    errorElement.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    errorButtonElement.addEventListener('click', onClickErrorButton);
  };

  var onSuccess = function () {
    var successElement = getMessageElement('success', 'success');
    successElement.classList.remove('hidden');

    var onClick = function () {
      successElement.classList.add('hidden');
      successElement.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };

    var onKeyDown = function (evt) {
      if (isEscKey(evt)) {
        successElement.classList.add('hidden');
        successElement.removeEventListener('click', onClick);
        document.removeEventListener('keydown', onKeyDown);
      }
    };

    successElement.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    isEscKey: isEscKey,
    onError: onError,
    onSuccess: onSuccess,
    debounce: debounce
  };

})();
