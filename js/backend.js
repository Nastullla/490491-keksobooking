'use strict';

(function () {

  var REQUEST_TIMEOUT = 10000; // 10 секунд
  var JSON_RESPONSE_TYPE = 'json';
  var RESPONSE_ERROR_STATUS_MESSAGE = 'Статус ответа: {status} {statusText}';
  var ResponseStatuses = {
    '400': 'Неверный запрос',
    '404': 'Ничего не найдено',
    '500': 'Ошибка сервера'
  };

  var getErrorMessage = function (status, statusText) {
    var messageText = ResponseStatuses[status];
    if (!messageText) {
      messageText = RESPONSE_ERROR_STATUS_MESSAGE.replace('{status}', status).replace('{statusText}', statusText);
    }

    return messageText;
  };

  var performRequest = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = JSON_RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(getErrorMessage(xhr.status, xhr.statusText));
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;

    xhr.open(method, url);

    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    performRequest('https://js.dump.academy/keksobooking/data', 'GET', onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    performRequest('https://js.dump.academy/keksobooking', 'POST', onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
