'use strict';

(function () {

  var onSuccessLoad = function (data) {
    window.data.correctData = data.filter(function (element) {
      return element.offer;
    });
    window.map.setPins(window.data.correctData);
  };

  window.data = {
    correctData: [],
    onSuccessLoad: onSuccessLoad
  };

})();
