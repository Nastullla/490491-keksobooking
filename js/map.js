'use strict';

(function () {

  var MAX_PINS_COUNT = 5;

  var mapElement = document.querySelector('.map');
  var mapPinsElement = mapElement.querySelector('.map__pins');
  var mapFiltersContainerElement = mapElement.querySelector('.map__filters-container');

  var onEscKeydown = function (evt) {
    if (window.utils.isEscKey(evt)) {
      closePopup();
    }
  };

  var closePopup = function () {
    hideActivePin();
    var popupElement = mapElement.querySelector('.popup');

    if (popupElement) {
      popupElement.remove();
    }

    document.removeEventListener('keydown', onEscKeydown);
  };

  var hideActivePin = function () {
    var pinActiveElement = mapPinsElement.querySelector('.map__pin--active');
    if (pinActiveElement) {
      pinActiveElement.classList.remove('map__pin--active');
    }
  };

  var renderAdvertisement = function (advertisement) {
    mapElement.insertBefore(window.generateAdvertisementElement(advertisement), mapFiltersContainerElement);
  };

  var addClickListener = function (advertisement, pinElement) {
    pinElement.addEventListener('click', function () {
      closePopup();

      renderAdvertisement(advertisement);

      document.addEventListener('keydown', onEscKeydown);

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
    var selectedAdvertisements = advertisements.slice(0, MAX_PINS_COUNT);

    selectedAdvertisements.forEach(function (advertisement) {
      var pinElement = window.pin.generate(advertisement);
      fragment.appendChild(pinElement);

      addClickListener(advertisement, pinElement);
    });

    mapPinsElement.appendChild(fragment);
  };

  window.map = {
    setPins: setPins,
    closePopup: closePopup
  };

})();
