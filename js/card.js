'use strict';

(function () {

  var TypeAdvertisemenMap = {
    'FLAT': 'Квартира',
    'BUNGALO': 'Бунгало',
    'HOUSE': 'Дом',
    'PALACE': 'Дворец'
  };

  var mapCardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');

  var getDataAvailability = function (advertisement) {
    return [
      {
        selector: '.popup__title',
        value: advertisement.offer.title
      },
      {
        selector: '.popup__text--address',
        value: advertisement.offer.address
      },
      {
        selector: '.popup__text--price',
        value: advertisement.offer.price ? advertisement.offer.price + '₽/ночь' : null
      },
      {
        selector: '.popup__text--capacity',
        value: advertisement.offer.rooms && advertisement.offer.guests ? advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей' : null
      },
      {
        selector: '.popup__text--time',
        value: advertisement.offer.checkin && advertisement.offer.checkout ? 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout : null
      },
      {
        selector: '.popup__description',
        value: advertisement.offer.description
      },
      {
        selector: '.popup__type',
        value: advertisement.offer.type ? TypeAdvertisemenMap[advertisement.offer.type.toUpperCase()] : null
      },
    ];
  };

  var renderPhotosList = function (advertisementElement, advertisementPhotos) {
    var popupPhotosElement = advertisementElement.querySelector('.popup__photos');
    var popupPhotoElement = popupPhotosElement.querySelector('.popup__photo');

    if (advertisementPhotos.length) {
      var fragmentPhotos = document.createDocumentFragment();

      advertisementPhotos.forEach(function (photoUrl) {
        var photoElement = popupPhotoElement.cloneNode(true);
        photoElement.src = photoUrl;
        fragmentPhotos.appendChild(photoElement);
      });

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

      advertisementFeatures.forEach(function (feature) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature');
        featureElement.classList.add('popup__feature--' + feature);
        fragmentFeatures.appendChild(featureElement);
      });


      popupFeaturesElement.appendChild(fragmentFeatures);
    } else {
      popupFeaturesElement.remove();
    }
  };

  var checkDataAvailability = function (advertisementElement, selector, value) {
    var targetElement = advertisementElement.querySelector(selector);
    if (value) {
      targetElement.textContent = value;
    } else {
      targetElement.remove();
    }
  };

  var generateAdvertisementElement = function (advertisement) {
    var dataAvailability = getDataAvailability(advertisement);

    var advertisementElement = mapCardTemplateElement.cloneNode(true);

    dataAvailability.forEach(function (dataAvailabilityItem) {
      checkDataAvailability(advertisementElement, dataAvailabilityItem.selector, dataAvailabilityItem.value);
    });

    renderFeatures(advertisementElement, advertisement.offer.features);
    renderPhotosList(advertisementElement, advertisement.offer.photos);

    var avatarElement = advertisementElement.querySelector('.popup__avatar');
    if (advertisement.author.avatar) {
      avatarElement.src = advertisement.author.avatar;
    } else {
      avatarElement.remove();
    }

    return advertisementElement;
  };

  window.generateAdvertisementElement = generateAdvertisementElement;

})();
