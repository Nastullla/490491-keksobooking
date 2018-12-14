'use strict';

(function () {

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
        return null;
    }
  };

  var renderPhotosList = function (advertisementElement, advertisementPhotos) {
    var popupPhotos = advertisementElement.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');

    if (advertisementPhotos.length) {
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
    } else {
      popupPhotos.remove();
    }

  };

  var renderFeatures = function (advertisementElement, advertisementFeatures) {
    var popupFeatures = advertisementElement.querySelector('.popup__features');

    if (advertisementFeatures.length) {
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
    } else {
      popupFeatures.remove();
    }
  };

  var checkDataAvailability = function (advertisement, element, value) {
    if (value) {
      advertisement.querySelector(element).textContent = value;
    } else {
      advertisement.querySelector(element).remove();
    }
  };

  var generateAdvertisementElement = function (advertisement) {
    var Data = [
      {
        element: '.popup__title',
        value: advertisement.offer.title
      },
      {
        element: '.popup__text--address',
        value: advertisement.offer.address
      },
      {
        element: '.popup__text--price',
        value: advertisement.offer.price ? advertisement.offer.price + '₽/ночь' : null
      },
      {
        element: '.popup__text--capacity',
        value: advertisement.offer.rooms && advertisement.offer.guests ? advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей' : null
      },
      {
        element: '.popup__text--time',
        value: advertisement.offer.checkin && advertisement.offer.checkout ? 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout : null
      },
      {
        element: '.popup__description',
        value: advertisement.offer.description
      },
      {
        element: '.popup__type',
        value: getAdvertisementType(advertisement.offer.type)
      },
    ];

    var advertisementElement = MAP_CARD_TEMPLATE.cloneNode(true);

    for (var i = 0; i < Data.length; i++) {
      checkDataAvailability(advertisementElement, Data[i].element, Data[i].value);
    }

    renderFeatures(advertisementElement, advertisement.offer.features);
    renderPhotosList(advertisementElement, advertisement.offer.photos);

    if (advertisement.author.avatar) {
      advertisementElement.querySelector('.popup__avatar').src = advertisement.author.avatar;
    } else {
      advertisementElement.querySelector('.popup__avatar').remove();
    }

    return advertisementElement;
  };

  window.card = {
    generateAdvertisementElement: generateAdvertisementElement
  };

})();
