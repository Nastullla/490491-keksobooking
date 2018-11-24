'use strict';

var ADVERTISEMENT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ADVERTISEMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADVERTISEMENT_TIMES = ['12:00', '13:00', '14:00'];
var ADVERTISEMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var ADVERTISEMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinWidth = 50;
var pinHeight = 70;

var selectRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumberFromRange = function (firstValue, lastValue) {
  return Math.floor(Math.random() * (lastValue - firstValue + 1)) + firstValue;
};

var selectFeatures = function (array) {
  var randomArray = [];
  for (var i = 0; i < array.length; i++) {
    if (Math.round(Math.random())) { // выбирает 0 или 1
      randomArray.push(array[i]);
    }
  }
  return randomArray;
};

// var selectPhotos = function (array) {
//   var temporaryArray = array;
//   var randomArray = [];
//   var count = temporaryArray.length;
//   for (var i = 0; i < count; i++) {
//     var removedItem = temporaryArray.splice(getRandomNumberFromRange(0, temporaryArray.length - 1), 1);
//     randomArray.push(removedItem[0]);
//   }
//   return randomArray;
// };

var generateNewAdvertisement = function (index) {
  var randomTitleIndex = getRandomNumberFromRange(0, ADVERTISEMENT_TITLES.length - 1);
  var randomTitle = ADVERTISEMENT_TITLES.splice(randomTitleIndex, 1);

  var locationX = getRandomNumberFromRange(0, 1200);
  var locationY = getRandomNumberFromRange(130, 630);
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },

    'offer': {
      'title': randomTitle[0],
      'address': locationX + ', ' + locationY,
      'price': getRandomNumberFromRange(1000, 1000000),
      'type': selectRandomItem(ADVERTISEMENT_TYPES),
      'rooms': getRandomNumberFromRange(1, 5),
      'guests': getRandomNumberFromRange(1, 10),
      'checkin': selectRandomItem(ADVERTISEMENT_TIMES),
      'checkout': selectRandomItem(ADVERTISEMENT_TIMES),
      'features': selectFeatures(ADVERTISEMENT_FEATURES),
      'description': '',
      'photos': /* selectPhotos(ADVERTISEMENT_PHOTOS) */[]
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

var switchMap = document.querySelector('.map');
switchMap.classList.remove('map--faded');

var allAdvertisements = generateAdvertisementsList(8);

//
// console.log(advertisements);
//

var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

var generatePin = function (advertisement) {
  var pinElement = mapPin.cloneNode(true);
  pinElement.style.left = (advertisement.location.x - pinWidth / 2) + 'px';
  pinElement.style.top = (advertisement.location.y - pinHeight) + 'px';
  var pinImgElement = pinElement.querySelector('img');
  pinImgElement.alt = advertisement.offer.title;
  pinImgElement.src = advertisement.author.avatar;
  return pinElement;
};

var mapPins = document.querySelector('.map__pins');

var setPins = function (advertisements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(generatePin(advertisements[i]));
  }
  mapPins.appendChild(fragment);
};

setPins(allAdvertisements);

//
// console.log(mapPins);
//

var mapCard = document.querySelector('#card').content.querySelector('.map__card');

var generateAdvertisementElement = function (advertisement) {
  var advertisementElement = mapCard.cloneNode(true);
  advertisementElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';

  var advertisementType;
  if (advertisement.offer.type === 'flat') {
    advertisementType = 'Квартира';
  }
  if (advertisement.offer.type === 'bungalo') {
    advertisementType = 'Бунгало';
  }
  if (advertisement.offer.type === 'house') {
    advertisementType = 'Дом';
  }
  if (advertisement.offer.type === 'palace') {
    advertisementType = 'Дворец';
  }
  advertisementElement.querySelector('.popup__type').textContent = advertisementType;

  advertisementElement.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  advertisementElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

  // features

  advertisementElement.querySelector('.popup__description').textContent = advertisement.offer.description;

  var popupPhotos = advertisementElement.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');
  var fragmentPhotos = document.createDocumentFragment();
  for (var i = 0; i < advertisement.offer.photos.length; i++) {
    var photoElement = popupPhoto.cloneNode(true);
    photoElement.src = advertisement.offer.photos[i];
    fragmentPhotos.appendChild(photoElement);
  }
  popupPhotos.appendChild(fragmentPhotos);

  advertisementElement.querySelector('.popup__avatar').src = advertisement.author.avatar;

  return advertisementElement;
};

var map = document.querySelector('.map');
var mapFiltersContainer = map.querySelector('.map__filters-container');

var renderAdvertisements = function (advertisements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(generateAdvertisementElement(advertisements[i]));
  }

  var TempDiv = document.createElement('div');
  TempDiv.appendChild(fragment);
  mapFiltersContainer.insertAdjacentHTML('beforeBegin', TempDiv.innerHTML);
};

renderAdvertisements(allAdvertisements);

