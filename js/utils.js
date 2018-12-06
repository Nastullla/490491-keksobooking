'use strict';

(function () {

  var keyCodes = {
    esc: 27
  };

  var isEscKey = function (evt) {
    return evt.keyCode === keyCodes.esc;
  };

  var selectRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomNumberFromRange = function (firstValue, lastValue) {
    return Math.floor(Math.random() * (lastValue - firstValue + 1)) + firstValue;
  };

  window.utils = {
    keyCode: keyCodes,
    isEscKey: isEscKey,
    selectRandomItem: selectRandomItem,
    getRandomNumberFromRange: getRandomNumberFromRange

  };

})();
