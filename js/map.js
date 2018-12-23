'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var mapPinsElement = mapElement.querySelector('.map__pins');
  var mapFiltersContainerElement = mapElement.querySelector('.map__filters-container');

  var MAX_PINS_COUNT = 5;

  var closePopup = function () {
    hideActivePin();
    var popupElement = mapElement.querySelector('.popup');

    if (popupElement) {
      popupElement.remove();
    }
  };

  var hideActivePin = function () {
    var pinActiveElement = mapPinsElement.querySelector('.map__pin--active');
    if (pinActiveElement) {
      pinActiveElement.classList.remove('map__pin--active');
    }
  };

  var renderAdvertisement = function (advertisement) {
    mapElement.insertBefore(window.card.generateAdvertisementElement(advertisement), mapFiltersContainerElement);
  };

  var addClickListener = function (advertisement, pinElement) {
    pinElement.addEventListener('click', function () {
      closePopup();

      renderAdvertisement(advertisement);

      pinElement.classList.add('map__pin--active');

      var popupElement = mapElement.querySelector('.popup');
      var popupCloseElement = popupElement.querySelector('.popup__close');

      popupCloseElement.addEventListener('click', function () {
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

    mapPinsElement.appendChild(fragment);
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
