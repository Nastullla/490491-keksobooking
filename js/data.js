'use strict';

(function() {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var MAP = document.querySelector('.map');

  var ADVERTISEMENT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var ADVERTISEMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ADVERTISEMENT_TIMES = ['12:00', '13:00', '14:00'];
  var ADVERTISEMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ADVERTISEMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var selectFeatures = function (array) {
    var randomIndex = window.utils.getRandomNumberFromRange(0, array.length - 1);
    var mixArray = getMixArrays(array);
    return mixArray.splice(0, randomIndex);
  };

  var getMixArrays = function (arrayForMix) {
    var array = arrayForMix.slice();
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  var generateNewAdvertisement = function (index) {
    var randomTitleIndex = window.utils.getRandomNumberFromRange(0, ADVERTISEMENT_TITLES.length - 1);
    var randomTitle = ADVERTISEMENT_TITLES.splice(randomTitleIndex, 1);

    var locationX = window.utils.getRandomNumberFromRange(PIN_WIDTH / 2, MAP.offsetWidth - PIN_WIDTH / 2);
    var locationY = window.utils.getRandomNumberFromRange(130, 630);

    return {
      'author': {
        'avatar': 'img/avatars/user0' + (index + 1) + '.png'
      },

      'offer': {
        'title': randomTitle[0],
        'address': locationX + ', ' + locationY,
        'price': window.utils.getRandomNumberFromRange(1000, 1000000),
        'type': window.utils.selectRandomItem(ADVERTISEMENT_TYPES),
        'rooms': window.utils.getRandomNumberFromRange(1, 5),
        'guests': window.utils.getRandomNumberFromRange(1, 5),
        'checkin': window.utils.selectRandomItem(ADVERTISEMENT_TIMES),
        'checkout': window.utils.selectRandomItem(ADVERTISEMENT_TIMES),
        'features': selectFeatures(ADVERTISEMENT_FEATURES),
        'description': '',
        'photos': getMixArrays(ADVERTISEMENT_PHOTOS)
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  };

  var generateAdvertisementsList = function (count) {
    var advertisements = [];

    for (var i = 0; i < count; i++) {
      advertisements.push(generateNewAdvertisement(i));
    }

    return advertisements;
  };

  var allAdvertisements = generateAdvertisementsList(8);

  window.data = {
    generateAdvertisementsList: generateAdvertisementsList,
    allAdvertisements: allAdvertisements
  }

})();
