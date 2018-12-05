'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
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

  window.pin = {
    generatePin: generatePin
  };


})();
