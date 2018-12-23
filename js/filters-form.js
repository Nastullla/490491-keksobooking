'use strict';

(function () {

  var filterFormElement = document.querySelector('.map__filters');

  var typeElement = filterFormElement.querySelector('select[name = housing-type]');
  var priceElement = filterFormElement.querySelector('select[name = housing-price]');
  var roomsElement = filterFormElement.querySelector('select[name = housing-rooms]');
  var guestsElement = filterFormElement.querySelector('select[name = housing-guests]');
  var featuresElements = filterFormElement.querySelectorAll('input[name = features]');

  var getSelectFeatures = function () {
    var selectFeatures = [];

    featuresElements.forEach(function (element) {
      if (element.checked) {
        selectFeatures.push(element.value);
      }
    });

    return selectFeatures;
  };

  var setFilteredPins = function () {
    window.pin.removePins();
    window.map.closePopup();

    var filtersValue = {
      type: typeElement.value,
      price: priceElement.value,
      rooms: roomsElement.value,
      guests: guestsElement.value,
      features: getSelectFeatures()
    };

    window.map.setPins(window.filterAdvertisements.filterAdvertisements(window.data.correctData, filtersValue));
  };

  var debouncedSetFilteredPins = window.utils.debounce(setFilteredPins);

  typeElement.addEventListener('change', function () {
    debouncedSetFilteredPins();
  });

  priceElement.addEventListener('change', function () {
    debouncedSetFilteredPins();
  });

  roomsElement.addEventListener('change', function () {
    debouncedSetFilteredPins();
  });

  guestsElement.addEventListener('change', function () {
    debouncedSetFilteredPins();
  });

  featuresElements.forEach(function (element) {
    element.addEventListener('change', function () {
      debouncedSetFilteredPins();
    });
  });

})();
