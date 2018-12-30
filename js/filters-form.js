'use strict';

(function () {

  var DEFAULT_FILTER_VALUE = 'any';

  var filterFormElement = document.querySelector('.map__filters');

  var typeElement = filterFormElement.querySelector('select[name = housing-type]');
  var priceElement = filterFormElement.querySelector('select[name = housing-price]');
  var roomsElement = filterFormElement.querySelector('select[name = housing-rooms]');
  var guestsElement = filterFormElement.querySelector('select[name = housing-guests]');
  var featuresElements = filterFormElement.querySelectorAll('input[name = features]');
  var mapFiltersSelectsElements = filterFormElement.querySelectorAll('select');

  var resetFilters = function () {
    mapFiltersSelectsElements.forEach(function (element) {
      element.value = DEFAULT_FILTER_VALUE;
    });
    featuresElements.forEach(function (element) {
      element.checked = false;
    });
  };

  var init = function () {
    window.utils.setDisabled(featuresElements, true);
    window.utils.setDisabled(mapFiltersSelectsElements, true);
    resetFilters();
    removeEventListeners();
  };

  var activateState = function () {
    window.utils.setDisabled(featuresElements, false);
    window.utils.setDisabled(mapFiltersSelectsElements, false);
    setEventListeners();
  };

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
    window.pin.removeAll();
    window.map.closePopup();

    var filtersValue = {
      type: typeElement.value,
      price: priceElement.value,
      rooms: roomsElement.value,
      guests: guestsElement.value,
      features: getSelectFeatures()
    };

    window.map.setPins(window.filterAdvertisements(window.data.correctAdvertisements, filtersValue));
  };

  var debouncedSetFilteredPins = window.utils.debounce(setFilteredPins);

  var onFilterChange = function () {
    debouncedSetFilteredPins();
  };

  var setEventListeners = function () {
    typeElement.addEventListener('change', onFilterChange);
    priceElement.addEventListener('change', onFilterChange);
    roomsElement.addEventListener('change', onFilterChange);
    guestsElement.addEventListener('change', onFilterChange);
    featuresElements.forEach(function (element) {
      element.addEventListener('change', onFilterChange);
    });
  };

  var removeEventListeners = function () {
    typeElement.removeEventListener('change', onFilterChange);
    priceElement.removeEventListener('change', onFilterChange);
    roomsElement.removeEventListener('change', onFilterChange);
    guestsElement.removeEventListener('change', onFilterChange);
    featuresElements.forEach(function (element) {
      element.removeEventListener('change', onFilterChange);
    });
  };

  init();

  window.filtersForm = {
    init: init,
    activateState: activateState
  };

})();
