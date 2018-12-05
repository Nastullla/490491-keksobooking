'use strict';

(function() {

  var allAdvertisements = window.data.generateAdvertisementsList(8);



})();

// var PIN_WIDTH = 50;
// var PIN_HEIGHT = 70;
// var MAIN_PIN_WIDTH = 62;
// var MAIN_PIN_HEIGHT = 84;
// var MAP_PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
// var MAP_CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.map__card');
// var MAP = document.querySelector('.map');
// var MAP_PINS = MAP.querySelector('.map__pins');
// var MAP_FILTERS_CONTAINER = MAP.querySelector('.map__filters-container');

// // var generatePin = function (advertisement) {
// //   var pinElement = MAP_PIN_TEMPLATE.cloneNode(true);
// //   pinElement.style.left = (advertisement.location.x - PIN_WIDTH / 2) + 'px';
// //   pinElement.style.top = (advertisement.location.y - PIN_HEIGHT) + 'px';

// //   var pinImgElement = pinElement.querySelector('img');
// //   pinImgElement.alt = advertisement.offer.title;
// //   pinImgElement.src = advertisement.author.avatar;

// //   pinElement.addEventListener('click', function () {
// //     closePopup();
// //     renderAdvertisement(advertisement);

// //     var popup = MAP.querySelector('.popup');
// //     var popupClose = popup.querySelector('.popup__close');

// //     popupClose.addEventListener('click', function () {
// //       closePopup();
// //     });
// //   });

// //   return pinElement;
// // };

// // var setPins = function (advertisements) {
// //   var fragment = document.createDocumentFragment();
// //   for (var i = 0; i < advertisements.length; i++) {
// //     fragment.appendChild(window.pin.generatePin(advertisements[i]));
// //   }

// //   MAP_PINS.appendChild(fragment);
// // };

// // var getAdvertisementType = function (advertisementType) {
// //   switch (advertisementType) {
// //     case 'flat':
// //       return 'Квартира';
// //     case 'bungalo':
// //       return 'Бунгало';
// //     case 'house':
// //       return 'Дом';
// //     case 'palace':
// //       return 'Дворец';
// //     default:
// //       return 'Нейзвестный тип';
// //   }
// // };

// // var renderPhotosList = function (advertisementElement, advertisementPhotos) {
// //   var popupPhotos = advertisementElement.querySelector('.popup__photos');
// //   var popupPhoto = popupPhotos.querySelector('.popup__photo');
// //   var fragmentPhotos = document.createDocumentFragment();

// //   for (var i = 0; i < advertisementPhotos.length; i++) {
// //     var photoElement = popupPhoto.cloneNode(true);
// //     photoElement.src = advertisementPhotos[i];
// //     fragmentPhotos.appendChild(photoElement);
// //   }

// //   while (popupPhotos.firstChild) {
// //     popupPhotos.firstChild.remove();
// //   }

// //   popupPhotos.appendChild(fragmentPhotos);
// // };

// // var renderFeatures = function (advertisementElement, advertisementFeatures) {
// //   var popupFeatures = advertisementElement.querySelector('.popup__features');
// //   while (popupFeatures.firstChild) {
// //     popupFeatures.firstChild.remove();
// //   }

// //   var fragmentFeatures = document.createDocumentFragment();
// //   for (var i = 0; i < advertisementFeatures.length; i++) {
// //     var featureElement = document.createElement('li');
// //     featureElement.classList.add('popup__feature');
// //     featureElement.classList.add('popup__feature--' + advertisementFeatures[i]);
// //     fragmentFeatures.appendChild(featureElement);
// //   }

// //   popupFeatures.appendChild(fragmentFeatures);
// // };

// // var generateAdvertisementElement = function (advertisement) {
// //   var advertisementElement = MAP_CARD_TEMPLATE.cloneNode(true);
// //   advertisementElement.querySelector('.popup__title').textContent = advertisement.offer.title;
// //   advertisementElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
// //   advertisementElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
// //   advertisementElement.querySelector('.popup__type').textContent = getAdvertisementType(advertisement.offer.type);

// //   var advertisementCapacity = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
// //   advertisementElement.querySelector('.popup__text--capacity').textContent = advertisementCapacity;

// //   var advertisementTime = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
// //   advertisementElement.querySelector('.popup__text--time').textContent = advertisementTime;

// //   renderFeatures(advertisementElement, advertisement.offer.features);
// //   advertisementElement.querySelector('.popup__description').textContent = advertisement.offer.description;
// //   renderPhotosList(advertisementElement, advertisement.offer.photos);
// //   advertisementElement.querySelector('.popup__avatar').src = advertisement.author.avatar;

// //   return advertisementElement;
// // };

// // var renderAdvertisement = function (advertisement) {
// //   MAP.insertBefore(window.card.generateAdvertisementElement(advertisement), MAP_FILTERS_CONTAINER);
// // };

// // var allAdvertisements = window.data.generateAdvertisementsList(8);

// /* ----------------------------------------------------- */

// // var AD_FORM = document.querySelector('.ad-form');
// // var AD_FORM_INPUTS = AD_FORM.querySelectorAll('input');
// // var AD_FORM_SELECTS = AD_FORM.querySelectorAll('select');
// // var AD_FORM_SUBMIT = AD_FORM.querySelector('.ad-form__submit');

// // var MAP_FILTERS = MAP.querySelector('.map__filters');
// // var MAP_FILTERS_INPUTS = MAP_FILTERS.querySelectorAll('input');
// // var MAP_FILTERS_SELECTS = MAP_FILTERS.querySelectorAll('select');

// // var MAP_PIN_MAIN = MAP_PINS.querySelector('.map__pin--main');

// // var ADDRESS = AD_FORM.querySelector('input[name="address"]');
// // var PRICE_INPUT = AD_FORM.querySelector('input[name = price]');
// // var TITLE_INPUT = AD_FORM.querySelector('input[name = title]');

// // var TYPE = AD_FORM.querySelector('select[name="type"]');
// // var TIMEIN = AD_FORM.querySelector('select[name="timein"]');
// // var TIMEOUT = AD_FORM.querySelector('select[name="timeout"]');
// // var ROOMS = AD_FORM.querySelector('select[name="rooms"]');
// // var CAPACITY = AD_FORM.querySelector('select[name="capacity"]');

// // var setAddress = function () {
// //   ADDRESS.value = (MAP_PIN_MAIN.offsetLeft + MAIN_PIN_WIDTH / 2) + ', '
// //                 + (MAP_PIN_MAIN.offsetTop + MAIN_PIN_HEIGHT);
// // };

// // var setDisabled = function (array, isDisabled) {
// //   for (var i = 0; i < array.length; i++) {
// //     array[i].disabled = isDisabled;
// //   }
// // };

// var getMinPrice = function (typeHouseroom) {
//   switch (typeHouseroom) {
//     case 'bungalo':
//       return 0;
//     case 'flat':
//       return 1000;
//     case 'house':
//       return 5000;
//     case 'palace':
//       return 10000;
//     default:
//       return 0;
//   }
// };

// TYPE.addEventListener('change', function (evt) {
//   PRICE_INPUT.min = getMinPrice(evt.target.value);
//   PRICE_INPUT.placeholder = PRICE_INPUT.min;
// });

// TIMEIN.addEventListener('change', function (evt) {
//   TIMEOUT.value = evt.target.value;
// });

// TIMEOUT.addEventListener('change', function (evt) {
//   TIMEIN.value = evt.target.value;
// });

// var setCapacityDependency = function (roomsValue) {
//   if (roomsValue === '100') {
//     for (var i = 0; i < CAPACITY.length; i++) {
//       CAPACITY[i].disabled = CAPACITY[i].value !== '0';
//     }
//   } else {
//     for (i = 0; i < CAPACITY.length; i++) {
//       CAPACITY[i].disabled = !(roomsValue >= CAPACITY[i].value && CAPACITY[i].value !== '0');
//     }
//   }
// };

// ROOMS.addEventListener('change', function (evt) {
//   setCapacityDependency(evt.target.value);
// });

// var init = function () {
//   ADDRESS.value = (MAP_PIN_MAIN.offsetLeft + MAIN_PIN_WIDTH / 2) + ', '
//                 + (MAP_PIN_MAIN.offsetTop + MAIN_PIN_WIDTH / 2);
//   PRICE_INPUT.min = getMinPrice(TYPE.value);
//   PRICE_INPUT.placeholder = PRICE_INPUT.min;
//   TIMEOUT.value = TIMEIN.value;
//   setCapacityDependency(ROOMS.value);

//   setDisabled(AD_FORM_INPUTS, true);
//   setDisabled(AD_FORM_SELECTS, true);
//   setDisabled(MAP_FILTERS_INPUTS, true);
//   setDisabled(MAP_FILTERS_SELECTS, true);
// };

// // var activateState = function () {
// //   MAP.classList.remove('map--faded');
// //   AD_FORM.classList.remove('ad-form--disabled');
// //   setDisabled(AD_FORM_INPUTS, false);
// //   setDisabled(AD_FORM_SELECTS, false);
// //   setDisabled(MAP_FILTERS_INPUTS, false);
// //   setDisabled(MAP_FILTERS_SELECTS, false);
// //   ADDRESS.disabled = true;
// // };

// var startCoords = {};

// var onMouseMove = function (moveEvt) {
//   moveEvt.preventDefault();

//   var shift = {
//     x: moveEvt.clientX - startCoords.x,
//     y: moveEvt.clientY - startCoords.y
//   };

//   var endCoords = {
//     x: MAP_PIN_MAIN.offsetLeft + shift.x,
//     y: MAP_PIN_MAIN.offsetTop + shift.y
//   };

//   if ((endCoords.x >= 0) && (endCoords.x <= MAP.offsetWidth - MAIN_PIN_WIDTH)) {
//     startCoords.x = moveEvt.clientX;
//     MAP_PIN_MAIN.style.left = endCoords.x + 'px';
//   }

//   if ((endCoords.y >= 130 - MAIN_PIN_HEIGHT) && (endCoords.y <= 630 - MAIN_PIN_HEIGHT)) {
//     startCoords.y = moveEvt.clientY;
//     MAP_PIN_MAIN.style.top = endCoords.y + 'px';
//   }
// };

// var allAdvertisements = window.data.generateAdvertisementsList(8);

// var onMouseUp = function (upEvt) {
//   upEvt.preventDefault();

//   document.removeEventListener('mousemove', onMouseMove);
//   document.removeEventListener('mouseup', onMouseUp);

//   if (!activeState) {
//     activateState();
//     window.map.setPins(allAdvertisements);
//     activeState = true;
//   }
//   setAddress();
// };

// MAP_PIN_MAIN.addEventListener('mousedown', function (downEvt) {
//   downEvt.preventDefault();

//   startCoords = {
//     x: downEvt.clientX,
//     y: downEvt.clientY
//   };

//   document.addEventListener('mousemove', onMouseMove);
//   document.addEventListener('mouseup', onMouseUp);
// });

// var setValidation = function (input) {
//   input.addEventListener('invalid', function () {
//     if (input.validity.tooShort) {
//       input.setCustomValidity('Имя должно состоять минимум из ' + input.minLength + '-х символов');
//     } else if (input.validity.rangeUnderflow) {
//       input.setCustomValidity('Число должно быть больше ' + input.min);
//     } else if (input.validity.rangeOverflow) {
//       input.setCustomValidity('Число должно быть меньше ' + input.max);
//     } else if (input.validity.valueMissing) {
//       input.setCustomValidity('Обязательное поле');
//     } else {
//       input.setCustomValidity('');
//     }
//   });

//   input.addEventListener('input', function (evt) {
//     var target = evt.target;
//     if (target.value.length === 0) {
//       target.setCustomValidity('Обязательное поле');
//     } else if (target.value.length < input.minLength) {
//       target.setCustomValidity('Имя должно состоять минимум из ' + input.minLength + '-х символов');
//     } else {
//       target.setCustomValidity('');
//     }
//   });
// };

// AD_FORM_SUBMIT.addEventListener('click', function (evt) {
//   if (CAPACITY.selectedOptions[0].disabled) {
//     CAPACITY.setCustomValidity('Выберите доступное значение!');
//     evt.stopPropagation();
//   } else {
//     CAPACITY.setCustomValidity('');
//   }
// });

// init();

// setValidation(TITLE_INPUT);
// setValidation(PRICE_INPUT);

// var activeState = false;
