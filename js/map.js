'use strict';

(function () {

  var MAP = document.querySelector('.map');
  var MAP_PINS = MAP.querySelector('.map__pins');
  var MAP_FILTERS_CONTAINER = MAP.querySelector('.map__filters-container');

  var MAX_PINS_COUNT = 5;

  var closePopup = function () {
    hideActivePin();
    var popup = MAP.querySelector('.popup');

    if (popup) {
      popup.remove();
    }
  };

  var hideActivePin = function () {
    var pinActive = MAP_PINS.querySelector('.map__pin--active');
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  var renderAdvertisement = function (advertisement) {
    MAP.insertBefore(window.card.generateAdvertisementElement(advertisement), MAP_FILTERS_CONTAINER);
  };

  var addClickListener = function (advertisement, pinElement) {
    pinElement.addEventListener('click', function () {
      closePopup();

      renderAdvertisement(advertisement);

      pinElement.classList.add('map__pin--active');

      var popup = MAP.querySelector('.popup');
      var popupClose = popup.querySelector('.popup__close');

      popupClose.addEventListener('click', function () {
        closePopup();
      });
    });
  };

  var setPins = function (advertisements) {
    var fragment = document.createDocumentFragment();
    var countPins = advertisements.length < MAX_PINS_COUNT ? advertisements.length : MAX_PINS_COUNT;

    for (var i = 0; i < countPins; i++) {
      var pinElement = window.pin.generatePin(advertisements[i]);
      fragment.appendChild(pinElement);

      addClickListener(advertisements[i], pinElement);
    }

    MAP_PINS.appendChild(fragment);
  };

  document.addEventListener('keydown', function (evt) {
    if (window.utils.isEscKey(evt)) {
      closePopup();
    }
  });

  window.map = {
    setPins: setPins,
    closePopup: closePopup
  };

})();
