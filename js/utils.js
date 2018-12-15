'use strict';

(function () {

  var keyCodes = {
    esc: 27
  };

  var isEscKey = function (evt) {
    return evt.keyCode === keyCodes.esc;
  };

  var selectRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomNumberFromRange = function (firstValue, lastValue) {
    return Math.floor(Math.random() * (lastValue - firstValue + 1)) + firstValue;
  };

  var createMessageElement = function (id, selector) {
    var messageTemplate = document.querySelector('#' + id).content.querySelector('.' + selector);
    var message = messageTemplate.cloneNode(true);
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

    var errorButton = errorElement.querySelector('.error__button');

    var closeErrorMessage = function () {
      errorElement.classList.add('hidden');
      errorElement.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
      errorButton.removeEventListener('click', onClickErrorButton);
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
    errorButton.addEventListener('click', onClickErrorButton);
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

  window.utils = {
    keyCode: keyCodes,
    isEscKey: isEscKey,
    selectRandomItem: selectRandomItem,
    getRandomNumberFromRange: getRandomNumberFromRange,
    onError: onError,
    onSuccess: onSuccess
  };

})();
