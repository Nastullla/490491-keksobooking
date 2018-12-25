'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapElement = document.querySelector('.map');
  var mapPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var generatePin = function (advertisement) {
    var pinElement = mapPinTemplateElement.cloneNode(true);
    pinElement.style.left = (advertisement.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (advertisement.location.y - PIN_HEIGHT) + 'px';

    var pinImgElement = pinElement.querySelector('img');
    pinImgElement.alt = advertisement.offer.title;
    pinImgElement.src = advertisement.author.avatar;

    return pinElement;
  };

  var removePins = function () {
    var pinsElements = mapElement.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsElements.length; i++) {
      pinsElements[i].remove();
    }
  };

  window.pin = {
    generatePin: generatePin,
    removePins: removePins
  };


})();
