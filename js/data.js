'use strict';

(function () {

  var onSuccessLoad = function (data) {
    window.data.correctAdvertisements = data.filter(function (element) {
      return element.offer;
    });
    window.map.setPins(window.data.correctAdvertisements);
    window.filtersForm.activateState();
  };

  window.data = {
    correctAdvertisements: [],
    onSuccessLoad: onSuccessLoad
  };

})();
