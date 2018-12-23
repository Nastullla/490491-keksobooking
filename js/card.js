'use strict';

(function () {

  var mapCardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');

  var TypeAdvertisemenMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var getDataAvailability = function (advertisement) {
    return [
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
        value: TypeAdvertisemenMap[advertisement.offer.type]
      },
    ];
  };

  var renderPhotosList = function (advertisementElement, advertisementPhotos) {
    var popupPhotosElement = advertisementElement.querySelector('.popup__photos');
    var popupPhotoElement = popupPhotosElement.querySelector('.popup__photo');

    if (advertisementPhotos.length) {
      var fragmentPhotos = document.createDocumentFragment();

      for (var i = 0; i < advertisementPhotos.length; i++) {
        var photoElement = popupPhotoElement.cloneNode(true);
        photoElement.src = advertisementPhotos[i];
        fragmentPhotos.appendChild(photoElement);
      }

      while (popupPhotosElement.firstChild) {
        popupPhotosElement.firstChild.remove();
      }

      popupPhotosElement.appendChild(fragmentPhotos);
    } else {
      popupPhotosElement.remove();
    }

  };

  var renderFeatures = function (advertisementElement, advertisementFeatures) {
    var popupFeaturesElement = advertisementElement.querySelector('.popup__features');

    if (advertisementFeatures.length) {
      while (popupFeaturesElement.firstChild) {
        popupFeaturesElement.firstChild.remove();
      }

      var fragmentFeatures = document.createDocumentFragment();
      for (var i = 0; i < advertisementFeatures.length; i++) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature');
        featureElement.classList.add('popup__feature--' + advertisementFeatures[i]);
        fragmentFeatures.appendChild(featureElement);
      }

      popupFeaturesElement.appendChild(fragmentFeatures);
    } else {
      popupFeaturesElement.remove();
    }
  };

  var checkDataAvailability = function (advertisementElement, element, value) {
    if (value) {
      advertisementElement.querySelector(element).textContent = value;
    } else {
      advertisementElement.querySelector(element).remove();
    }
  };

  var generateAdvertisementElement = function (advertisement) {
    var dataAvailability = getDataAvailability(advertisement);

    var advertisementElement = mapCardTemplateElement.cloneNode(true);

    for (var i = 0; i < dataAvailability.length; i++) {
      checkDataAvailability(advertisementElement, dataAvailability[i].element, dataAvailability[i].value);
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
