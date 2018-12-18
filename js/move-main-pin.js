'use strict';

(function () {

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;

  var MAP = document.querySelector('.map');
  var MAP_PINS = MAP.querySelector('.map__pins');
  var MAP_PIN_MAIN = MAP_PINS.querySelector('.map__pin--main');

  var startCoords = {};

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: moveEvt.clientX - startCoords.x,
      y: moveEvt.clientY - startCoords.y
    };

    var endCoords = {
      x: MAP_PIN_MAIN.offsetLeft + shift.x,
      y: MAP_PIN_MAIN.offsetTop + shift.y
    };

    if ((endCoords.x >= 0) && (endCoords.x <= MAP.offsetWidth - MAIN_PIN_WIDTH)) {
      startCoords.x = moveEvt.clientX;
      MAP_PIN_MAIN.style.left = endCoords.x + 'px';
    }

    if ((endCoords.y >= 130 - MAIN_PIN_HEIGHT) && (endCoords.y <= 630 - MAIN_PIN_HEIGHT)) {
      startCoords.y = moveEvt.clientY;
      MAP_PIN_MAIN.style.top = endCoords.y + 'px';
    }
  };

  var onSuccessLoad = function (data) {
    window.moveMailPin.correctDate = data.filter(function (element) {
      return element.offer;
    });
    window.map.setPins(window.moveMailPin.correctDate);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (!window.form.activeState) {
      window.form.activateState();
      window.backend.load(onSuccessLoad, window.utils.onError);
    }
    window.form.setAddress();
  };

  MAP_PIN_MAIN.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();

    startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.moveMailPin = {

  };

})();
