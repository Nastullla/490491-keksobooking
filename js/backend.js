'use strict';

(function () {

  var REQUEST_TIMEOUT = 10000; // 10 секунд
  var JSON_RESPONSE_TYPE = 'json';

  var getErrorMessage = function (status, statusText) {
    switch (status) {
      case 400:
        return 'Неверный запрос';
      case 404:
        return 'Ничего не найдено';
      case 500:
        return 'Ошибка сервера';
      default:
        return 'Статус ответа: ' + status + ' ' + statusText;
    }
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
