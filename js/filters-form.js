'use strict';

(function () {

  var FILTERS_FORM = document.querySelector('.map__filters');

  var TYPE = FILTERS_FORM.querySelector('select[name = housing-type]');
  var PRICE = FILTERS_FORM.querySelector('select[name = housing-price]');
  var ROOMS = FILTERS_FORM.querySelector('select[name = housing-rooms]');
  var GUESTS = FILTERS_FORM.querySelector('select[name = housing-guests]');
  var FEATURES = FILTERS_FORM.querySelectorAll('input[name = features]');

  var setFilteredPins = function () {
    window.pin.removePins();
    window.map.closePopup();

    var selectFeatures = [];
    FEATURES.forEach(function (element) {
      if (element.checked) {
        selectFeatures.push(element.value);
      }
    });

    var FiltersValue = {
      type: TYPE.value,
      price: PRICE.value,
      rooms: ROOMS.value,
      guests: GUESTS.value,
      features: selectFeatures
    };

    window.map.setPins(window.filterAdvertisements.filterAdvertisements(window.moveMailPin.correctDate, FiltersValue));
  };

  var debouncedSetFilteredPins = window.utils.debounce(setFilteredPins);

  TYPE.addEventListener('change', function () {
    debouncedSetFilteredPins();
  });

  PRICE.addEventListener('change', function () {
    debouncedSetFilteredPins();
  });

  ROOMS.addEventListener('change', function () {
    debouncedSetFilteredPins();
  });

  GUESTS.addEventListener('change', function () {
    debouncedSetFilteredPins();
  });

  FEATURES.forEach(function (element) {
    element.addEventListener('change', function () {
      debouncedSetFilteredPins();
    });
  });

})();
