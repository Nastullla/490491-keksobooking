'use strict';

(function () {

  var ANY_FILTER_VALUE = 'any';

  var filterPrice = function (price, filterPriceValue) {
    switch (filterPriceValue) {
      case 'low':
        return price < 10000;
      case 'middle':
        return price >= 10000 && price < 50000;
      case 'high':
        return price >= 50000;
      default:
        return true;
    }
  };

  var filterFeatures = function (features, filterFeaturesValue) {
    for (var i = 0; i < filterFeaturesValue.length; i++) {
      if (features.indexOf(filterFeaturesValue[i]) === -1) {
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
