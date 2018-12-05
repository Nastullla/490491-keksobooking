'use strict';

(function() {

  var MAP_CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.map__card');

  var getAdvertisementType = function (advertisementType) {
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
    var advertisementElement = MAP_CARD_TEMPLATE.cloneNode(true);
    advertisementElement.querySelector('.popup__title').textContent = advertisement.offer.title;
    advertisementElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    advertisementElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
    advertisementElement.querySelector('.popup__type').textContent = getAdvertisementType(advertisement.offer.type);

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

  window.card = {
    generateAdvertisementElement: generateAdvertisementElement
  };

})();
