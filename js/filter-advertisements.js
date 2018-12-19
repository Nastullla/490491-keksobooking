'use strict';

(function () {

  var ANY_FILTER_VALUE = 'any';
  var PRICE_LOW_LIMIT = 10000;
  var PRICE_HIGH_LIMIT = 50000;

  var filterPrice = function (price, filterPriceValue) {
    switch (filterPriceValue) {
      case 'low':
        return price < PRICE_LOW_LIMIT;
      case 'middle':
        return price >= PRICE_LOW_LIMIT && price < PRICE_HIGH_LIMIT;
      case 'high':
        return price >= PRICE_HIGH_LIMIT;
      default:
        return true;
    }
  };

  var filterFeatures = function (features, filterFeaturesValues) {
    for (var i = 0; i < filterFeaturesValues.length; i++) {
      if (features.indexOf(filterFeaturesValues[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filterAdvertisements = function (date, filtersValue) {
    var filteredAdvertisements = date.slice()
      .filter(function (element) {
        return (filtersValue.type === ANY_FILTER_VALUE || element.offer.type === filtersValue.type)
               && filterPrice(element.offer.price, filtersValue.price)
               && filterFeatures(element.offer.features, filtersValue.features)
               && (filtersValue.rooms === ANY_FILTER_VALUE || element.offer.rooms === Number(filtersValue.rooms))
               && (filtersValue.guests === ANY_FILTER_VALUE || element.offer.guests === Number(filtersValue.guests));
      });

    return filteredAdvertisements;
  };

  window.filterAdvertisements = {
    filterAdvertisements: filterAdvertisements
  };

})();
