'use strict';

(function () {

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var NOT_FOR_GUESTS_ROOMS_VALUE = '100';
  var NOT_FOR_GUESTS_VALUE = '0';

  var VALIDATION_MIN_LIMIT = 'Число должно быть больше {limit}';
  var VALIDATION_MAX_LIMIT = 'Число должно быть меньше {limit}';
  var VALIDATION_MIN_LENGTH_LIMIT = 'Поле должно состоять минимум из {minlength}-х символов';
  var VALIDATION_REQUIRED_FIELD = 'Обязательное поле';

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
      capacityElement[i].disabled = roomsValue === NOT_FOR_GUESTS_ROOMS_VALUE ? capacityElement[i].value !== NOT_FOR_GUESTS_VALUE : !(roomsValue >= capacityElement[i].value && capacityElement[i].value !== NOT_FOR_GUESTS_VALUE);
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
      window.pin.removeAll();
      window.map.closePopup();
    }

    priceInputElement.min = getMinPrice(typeElement.value);
    priceInputElement.placeholder = priceInputElement.min;
    timeOutElement.value = timeInElement.value;
    setCapacityDependency(roomsElement.value);

    window.utils.setDisabled(adFormInputsElements, true);
    window.utils.setDisabled(adFormSelectsElements, true);
    adFormSubmitElement.disabled = true;
    adFormReset.disabled = true;
    descriptionInputElement.disabled = true;
    window.form.activeState = false;
    window.advertisementPhoto.removeAllImages();
    removeEventListeners();
  };

  var activateState = function () {
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    window.utils.setDisabled(adFormInputsElements, false);
    window.utils.setDisabled(adFormSelectsElements, false);
    adFormSubmitElement.disabled = false;
    adFormReset.disabled = false;
    descriptionInputElement.disabled = false;
    adressElement.readOnly = true;
    window.form.activeState = true;
    setEventListeners();
  };

  var onTypeChange = function (evt) {
    priceInputElement.min = getMinPrice(evt.target.value);
    priceInputElement.placeholder = priceInputElement.min;
    validateField(priceInputElement);
  };

  var onTimeInChange = function (evt) {
    timeOutElement.value = evt.target.value;
  };

  var onTimeOutChange = function (evt) {
    timeInElement.value = evt.target.value;
  };

  var onRoomsChange = function (evt) {
    setCapacityDependency(evt.target.value);
  };

  var onCapacityValidation = function (evt) {
    if (capacityElement.selectedOptions[0].disabled) {
      capacityElement.setCustomValidity('Выберите доступное значение!');
      evt.stopPropagation();
    } else {
      capacityElement.setCustomValidity('');
    }
  };

  var onFormSubmit = function (evt) {
    save();
    evt.preventDefault();
  };

  var onFormResetClick = function (evt) {
    adFormElement.reset();
    init();
    window.filtersForm.init();
    evt.preventDefault();
  };

  var validateField = function (element) {
    if (element.validity.tooShort) {
      element.setCustomValidity(VALIDATION_MIN_LENGTH_LIMIT.replace('{minlength}', element.minLength));
    } else if (element.validity.rangeUnderflow) {
      element.setCustomValidity(VALIDATION_MIN_LIMIT.replace('{limit}', element.min));
    } else if (element.validity.rangeOverflow) {
      element.setCustomValidity(VALIDATION_MAX_LIMIT.replace('{limit}', element.max));
    } else if (element.validity.valueMissing) {
      element.setCustomValidity(VALIDATION_REQUIRED_FIELD);
    } else {
      element.setCustomValidity('');
    }
  };

  var onFieldInvalid = function (evt) {
    validateField(evt.target);
  };

  var onFieldInput = function (evt) {
    var target = evt.target;
    if (!target.value.length) {
      target.setCustomValidity(VALIDATION_REQUIRED_FIELD);
    } else if (target.value.length < target.minLength) {
      target.setCustomValidity(VALIDATION_MIN_LENGTH_LIMIT.replace('{minlength}', target.minLength));
    } else {
      target.setCustomValidity('');
    }
  };

  var setEventListeners = function () {
    typeElement.addEventListener('change', onTypeChange);
    timeInElement.addEventListener('change', onTimeInChange);
    timeOutElement.addEventListener('change', onTimeOutChange);
    roomsElement.addEventListener('change', onRoomsChange);
    adFormSubmitElement.addEventListener('click', onCapacityValidation);
    adFormElement.addEventListener('submit', onFormSubmit);
    adFormReset.addEventListener('click', onFormResetClick);
    capacityElement.addEventListener('change', onCapacityValidation);

    titleInputElement.addEventListener('invalid', onFieldInvalid);
    titleInputElement.addEventListener('input', onFieldInput);
    priceInputElement.addEventListener('invalid', onFieldInvalid);
    priceInputElement.addEventListener('input', onFieldInput);
  };

  var removeEventListeners = function () {
    typeElement.removeEventListener('change', onTypeChange);
    timeInElement.removeEventListener('change', onTimeInChange);
    timeOutElement.removeEventListener('change', onTimeOutChange);
    roomsElement.removeEventListener('change', onRoomsChange);
    adFormSubmitElement.removeEventListener('click', onCapacityValidation);
    adFormElement.removeEventListener('submit', onFormSubmit);
    adFormReset.removeEventListener('click', onFormResetClick);
    capacityElement.removeEventListener('change', onCapacityValidation);

    titleInputElement.removeEventListener('invalid', onFieldInvalid);
    titleInputElement.removeEventListener('input', onFieldInput);
    priceInputElement.removeEventListener('invalid', onFieldInvalid);
    priceInputElement.removeEventListener('input', onFieldInput);
  };

  var onSuccessSave = function () {
    adFormElement.reset();
    init();
    window.filtersForm.init();
    window.utils.onSuccess();
  };

  var onErrorForm = function (errorText) {
    window.utils.onError(errorText, save);
  };

  var save = function () {
    window.backend.save(new FormData(adFormElement), onSuccessSave, onErrorForm);
  };

  window.form = {
    activeState: false,
    activateState: activateState,
    setAddress: setAddress
  };

  init();

})();
