'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var MAP = document.querySelector('.map');
  var MAP_PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');

  var generatePin = function (advertisement) {
    var pinElement = MAP_PIN_TEMPLATE.cloneNode(true);
    pinElement.style.left = (advertisement.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (advertisement.location.y - PIN_HEIGHT) + 'px';

    var pinImgElement = pinElement.querySelector('img');
    pinImgElement.alt = advertisement.offer.title;
    pinImgElement.src = advertisement.author.avatar;

    return pinElement;
  };

  var removePins = function () {
    var pins = MAP.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  window.pin = {
    generatePin: generatePin,
    removePins: removePins
  };


})();
