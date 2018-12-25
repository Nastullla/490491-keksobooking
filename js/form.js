'use strict';

(function () {

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;

  var STARTING_COORDINATE = {
    x: '570px',
    y: '375px'
  };

  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var adFormInputsElements = adFormElement.querySelectorAll('input');
  var adFormSelectsElements = adFormElement.querySelectorAll('select');
  var adFormSubmitElement = adFormElement.querySelector('.ad-form__submit');
  var adFormReset = adFormElement.querySelector('.ad-form__reset');

  var mapFiltersElement = mapElement.querySelector('.map__filters');
  var mapFiltersInputsElements = mapFiltersElement.querySelectorAll('input');
  var mapFiltersSelectsElements = mapFiltersElement.querySelectorAll('select');

  var mapPinsElement = mapElement.querySelector('.map__pins');
  var mapPinMainElement = mapPinsElement.querySelector('.map__pin--main');

  var adressElement = adFormElement.querySelector('input[name="address"]');
  var priceInputElement = adFormElement.querySelector('input[name = price]');
  var titleInputElement = adFormElement.querySelector('input[name = title]');
  var descriptionInputElement = adFormElement.querySelector('textarea[name = description]');

  var typeElement = adFormElement.querySelector('select[name="type"]');
  var timeInElement = adFormElement.querySelector('select[name="timein"]');
  var timeOutElement = adFormElement.querySelector('select[name="timeout"]');
  var roomsElement = adFormElement.querySelector('select[name="rooms"]');
  var capacityElement = adFormElement.querySelector('select[name="capacity"]');

  var setAddress = function () {
    adressElement.value = (mapPinMainElement.offsetLeft + MAIN_PIN_WIDTH / 2) + ', '
    + (mapPinMainElement.offsetTop + MAIN_PIN_HEIGHT);
  };

  var setDisabled = function (array, isDisabled) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = isDisabled;
    }
  };

  var getMinPrice = function (typeHouseroom) {
    switch (typeHouseroom) {
      case 'bungalo':
        return 0;
      case 'flat':
        return 1000;
      case 'house':
        return 5000;
      case 'palace':
        return 10000;
      default:
        return 0;
    }
  };

  var setCapacityDependency = function (roomsValue) {
    for (var i = 0; i < capacityElement.length; i++) {
      if (roomsValue === '100') {
        capacityElement[i].disabled = capacityElement[i].value !== '0';
      } else {
        capacityElement[i].disabled = !(roomsValue >= capacityElement[i].value && capacityElement[i].value !== '0');
      }
    }
  };

  var init = function () {
    mapPinMainElement.style.left = STARTING_COORDINATE.x;
    mapPinMainElement.style.top = STARTING_COORDINATE.y;

    adressElement.value = (mapPinMainElement.offsetLeft + MAIN_PIN_WIDTH / 2) + ', '
    + (mapPinMainElement.offsetTop + MAIN_PIN_WIDTH / 2);

    mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');

    if (window.form.activeState) {
      window.pin.removePins();
      window.map.closePopup();
    }

    priceInputElement.min = getMinPrice(typeElement.value);
    priceInputElement.placeholder = priceInputElement.min;
    timeOutElement.value = timeInElement.value;
    setCapacityDependency(roomsElement.value);

    setDisabled(adFormInputsElements, true);
    setDisabled(adFormSelectsElements, true);
    setDisabled(mapFiltersInputsElements, true);
    setDisabled(mapFiltersSelectsElements, true);
    adFormSubmitElement.disabled = true;
    adFormReset.disabled = true;
    descriptionInputElement.disabled = true;
    window.form.activeState = false;
  };

  var activateState = function () {
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    setDisabled(adFormInputsElements, false);
    setDisabled(adFormSelectsElements, false);
    setDisabled(mapFiltersInputsElements, false);
    setDisabled(mapFiltersSelectsElements, false);
    adFormSubmitElement.disabled = false;
    adFormReset.disabled = false;
    descriptionInputElement.disabled = false;
    adressElement.readOnly = true;
    window.form.activeState = true;
  };

  var setValidation = function (input) {
    input.addEventListener('invalid', function () {
      if (input.validity.tooShort) {
        input.setCustomValidity('Имя должно состоять минимум из ' + input.minLength + '-х символов');
      } else if (input.validity.rangeUnderflow) {
        input.setCustomValidity('Число должно быть больше ' + input.min);
      } else if (input.validity.rangeOverflow) {
        input.setCustomValidity('Число должно быть меньше ' + input.max);
      } else if (input.validity.valueMissing) {
        input.setCustomValidity('Обязательное поле');
      } else {
        input.setCustomValidity('');
      }
    });

    input.addEventListener('input', function (evt) {
      var target = evt.target;
      if (target.value.length === 0) {
        target.setCustomValidity('Обязательное поле');
      } else if (target.value.length < input.minLength) {
        target.setCustomValidity('Имя должно состоять минимум из ' + input.minLength + '-х символов');
      } else {
        target.setCustomValidity('');
      }
    });
  };

  typeElement.addEventListener('change', function (evt) {
    priceInputElement.min = getMinPrice(evt.target.value);
    priceInputElement.placeholder = priceInputElement.min;
  });

  timeInElement.addEventListener('change', function (evt) {
    timeOutElement.value = evt.target.value;
  });

  timeOutElement.addEventListener('change', function (evt) {
    timeInElement.value = evt.target.value;
  });

  roomsElement.addEventListener('change', function (evt) {
    setCapacityDependency(evt.target.value);
  });

  adFormSubmitElement.addEventListener('click', function (evt) {
    if (capacityElement.selectedOptions[0].disabled) {
      capacityElement.setCustomValidity('Выберите доступное значение!');
      evt.stopPropagation();
    } else {
      capacityElement.setCustomValidity('');
    }
  });

  var onSuccessSave = function () {
    adFormElement.reset();
    init();
    window.utils.onSuccess();
  };

  var onErrorForm = function (errorText) {
    window.utils.onError(errorText, save);
  };

  var save = function () {
    window.backend.save(new FormData(adFormElement), onSuccessSave, onErrorForm);
  };

  adFormElement.addEventListener('submit', function (evt) {
    save();
    evt.preventDefault();
  });

  adFormReset.addEventListener('click', function (evt) {
    adFormElement.reset();
    init();
    evt.preventDefault();
  });

  window.form = {
    activeState: false,
    activateState: activateState,
    setAddress: setAddress
  };

  init();

  setValidation(titleInputElement);
  setValidation(priceInputElement);

})();
