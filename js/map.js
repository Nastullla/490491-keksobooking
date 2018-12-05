'use strict';

(function () {

  var MAP = document.querySelector('.map');
  var MAP_PINS = MAP.querySelector('.map__pins');
  var MAP_FILTERS_CONTAINER = MAP.querySelector('.map__filters-container');

  var closePopup = function () {
    var popup = MAP.querySelector('.popup');

    if (popup) {
      popup.remove();
    }
  };

  document.addEventListener('keydown', function () {
    if (window.utils.isEscKey) {
      closePopup();
    }
  });

  var renderAdvertisement = function (advertisement) {
    MAP.insertBefore(window.card.generateAdvertisementElement(advertisement), MAP_FILTERS_CONTAINER);
  };

  var addClickListener = function (advertisement, pinElement) {
    pinElement.addEventListener('click', function () {
      closePopup();

      renderAdvertisement(advertisement);

      var popup = MAP.querySelector('.popup');
      var popupClose = popup.querySelector('.popup__close');

      popupClose.addEventListener('click', function () {
        closePopup();
      });
    });
  };

  var setPins = function (advertisements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisements.length; i++) {
      var pinElement = window.pin.generatePin(advertisements[i]);
      fragment.appendChild(pinElement);

      addClickListener(advertisements[i], pinElement);
    }

    MAP_PINS.appendChild(fragment);
  };

  window.map = {
    setPins: setPins
  };

})();
