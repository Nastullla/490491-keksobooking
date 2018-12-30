'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var generate = function (advertisement) {
    var pinElement = mapPinTemplateElement.cloneNode(true);
    pinElement.style.left = (advertisement.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (advertisement.location.y - PIN_HEIGHT) + 'px';

    var pinImgElement = pinElement.querySelector('img');
    pinImgElement.alt = advertisement.offer.title;
    pinImgElement.src = advertisement.author.avatar;

    return pinElement;
  };

  var removeAll = function () {
    var pinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pinsElements.forEach(function (element) {
      element.remove();
    });
  };

  window.pin = {
    generate: generate,
    removeAll: removeAll
  };

})();
