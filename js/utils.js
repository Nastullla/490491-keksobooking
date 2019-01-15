'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var errorMessageElement;
  var successMessageElement;

  var KeyCode = {
    ESC: 27
  };

  var isEscKey = function (evt) {
    return evt.keyCode === KeyCode.ESC;
  };

  var setDisabled = function (elements, isDisabled) {
    elements.forEach(function (element) {
      element.disabled = isDisabled;
    });
  };

  var createMessageElement = function (id, selector) {
    var messageTemplateElement = document.querySelector('#' + id).content.querySelector('.' + selector);
    var message = messageTemplateElement.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', message);
    return message;
  };

  var onError = function (errorMessage, onClickButton) {
    if (!errorMessageElement) {
      errorMessageElement = createMessageElement('error', 'error');
    }
    errorMessageElement.querySelector('.error__message').textContent = errorMessage;
    errorMessageElement.classList.remove('hidden');

    var errorButtonElement = errorMessageElement.querySelector('.error__button');

    var closeErrorMessage = function () {
      errorMessageElement.classList.add('hidden');
      errorMessageElement.removeEventListener('click', onClick);
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

    errorMessageElement.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    errorButtonElement.addEventListener('click', onClickErrorButton);
  };

  var onSuccess = function () {
    if (!successMessageElement) {
      successMessageElement = createMessageElement('success', 'success');
    }
    successMessageElement.classList.remove('hidden');

    var onClick = function () {
      successMessageElement.classList.add('hidden');
      successMessageElement.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };

    var onKeyDown = function (evt) {
      if (isEscKey(evt)) {
        successMessageElement.classList.add('hidden');
        successMessageElement.removeEventListener('click', onClick);
        document.removeEventListener('keydown', onKeyDown);
      }
    };

    successMessageElement.addEventListener('click', onClick);
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
    debounce: debounce,
    setDisabled: setDisabled
  };

})();
