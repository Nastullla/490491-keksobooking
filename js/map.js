'use strict';

var ADVERTISEMENT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ADVERTISEMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADVERTISEMENT_TIMES = ['12:00', '13:00', '14:00'];
var ADVERTISEMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADVERTISEMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PINWIDTH = 50;
var PINHEIGHT = 70;
var MAPPINTEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
var MAPCARDTEMPLATE = document.querySelector('#card').content.querySelector('.map__card');
var MAP = document.querySelector('.map');
var MAPPINS = MAP.querySelector('.map__pins');
var MAPFILTERSCONTAINER = MAP.querySelector('.map__filters-container');

var selectRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumberFromRange = function (firstValue, lastValue) {
  return Math.floor(Math.random() * (lastValue - firstValue + 1)) + firstValue;
};

var selectFeatures = function (array) {
  var mixArray = getMixArrays(array);
  var randomIndex = getRandomNumberFromRange(0, array.length - 1);
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
  var randomTitleIndex = getRandomNumberFromRange(0, ADVERTISEMENT_TITLES.length - 1);
  var randomTitle = ADVERTISEMENT_TITLES.splice(randomTitleIndex, 1);

  var locationX = getRandomNumberFromRange(PINWIDTH / 2, MAP.offsetWidth - PINWIDTH / 2);
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
      'guests': getRandomNumberFromRange(1, 5),
      'checkin': selectRandomItem(ADVERTISEMENT_TIMES),
      'checkout': selectRandomItem(ADVERTISEMENT_TIMES),
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

var generatePin = function (advertisement) {
  var pinElement = MAPPINTEMPLATE.cloneNode(true);
  pinElement.style.left = (advertisement.location.x - PINWIDTH / 2) + 'px';
  pinElement.style.top = (advertisement.location.y - PINHEIGHT) + 'px';

  var pinImgElement = pinElement.querySelector('img');
  pinImgElement.alt = advertisement.offer.title;
  pinImgElement.src = advertisement.author.avatar;

  return pinElement;
};

var setPins = function (advertisements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(generatePin(advertisements[i]));
  }

  MAPPINS.appendChild(fragment);
};

var returnAdvertisementType = function (advertisementType) {
  switch (advertisementType) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return 'Нейзвестный тип';
  }
};

var renderPhotosList = function (advertisementElement, advertisementPhotos) {
  var popupPhotos = advertisementElement.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');
  var fragmentPhotos = document.createDocumentFragment();

  for (var i = 0; i < advertisementPhotos.length; i++) {
    var photoElement = popupPhoto.cloneNode(true);
    photoElement.src = advertisementPhotos[i];
    fragmentPhotos.appendChild(photoElement);
  }

  while (popupPhotos.firstChild) {
    popupPhotos.firstChild.remove();
  }

  popupPhotos.appendChild(fragmentPhotos);
};

var renderFeatures = function (advertisementElement, advertisementFeatures) {
  var popupFeatures = advertisementElement.querySelector('.popup__features');
  while (popupFeatures.firstChild) {
    popupFeatures.firstChild.remove();
  }

  var fragmentFeatures = document.createDocumentFragment();
  for (var i = 0; i < advertisementFeatures.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + advertisementFeatures[i]);
    fragmentFeatures.appendChild(featureElement);
  }

  popupFeatures.appendChild(fragmentFeatures);
};

var generateAdvertisementElement = function (advertisement) {
  var advertisementElement = MAPCARDTEMPLATE.cloneNode(true);
  advertisementElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
  advertisementElement.querySelector('.popup__type').textContent = returnAdvertisementType(advertisement.offer.type);

  var advertisementCapacity = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  advertisementElement.querySelector('.popup__text--capacity').textContent = advertisementCapacity;

  var advertisementTime = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  advertisementElement.querySelector('.popup__text--time').textContent = advertisementTime;

  renderFeatures(advertisementElement, advertisement.offer.features);
  advertisementElement.querySelector('.popup__description').textContent = advertisement.offer.description;
  renderPhotosList(advertisementElement, advertisement.offer.photos);
  advertisementElement.querySelector('.popup__avatar').src = advertisement.author.avatar;

  return advertisementElement;
};

var renderAdvertisements = function (advertisements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(generateAdvertisementElement(advertisements[i]));
  }

  MAP.insertBefore(fragment, MAPFILTERSCONTAINER);
};

var switchMap = document.querySelector('.map');
switchMap.classList.remove('map--faded');

var allAdvertisements = generateAdvertisementsList(8);

setPins(allAdvertisements);

renderAdvertisements(allAdvertisements);

