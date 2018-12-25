'use strict';

(function () {

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var mapElement = document.querySelector('.map');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');

  var startCoords = {};

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: moveEvt.clientX - startCoords.x,
      y: moveEvt.clientY - startCoords.y
    };

    var endCoords = {
      x: mapPinMainElement.offsetLeft + shift.x,
      y: mapPinMainElement.offsetTop + shift.y
    };

    if ((endCoords.x >= 0) && (endCoords.x <= mapElement.offsetWidth - MAIN_PIN_WIDTH)) {
      startCoords.x = moveEvt.clientX;
      mapPinMainElement.style.left = endCoords.x + 'px';
    }

    if ((endCoords.y >= MIN_Y - MAIN_PIN_HEIGHT) && (endCoords.y <= MAX_Y - MAIN_PIN_HEIGHT)) {
      startCoords.y = moveEvt.clientY;
      mapPinMainElement.style.top = endCoords.y + 'px';
    }
  };

  var onErrorLoad = function (errorText) {
    window.utils.onError(errorText, load);
  };

  var load = function () {
    window.backend.load(window.data.onSuccessLoad, onErrorLoad);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (!window.form.activeState) {
      window.form.activateState();
      load();
    }
    window.form.setAddress();
  };

  mapPinMainElement.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();

    startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
