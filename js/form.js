'use strict';

(function () {

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;

  var MAP = document.querySelector('.map');
  var AD_FORM = document.querySelector('.ad-form');
  var AD_FORM_INPUTS = AD_FORM.querySelectorAll('input');
  var AD_FORM_SELECTS = AD_FORM.querySelectorAll('select');
  var AD_FORM_SUBMIT = AD_FORM.querySelector('.ad-form__submit');

  var MAP_FILTERS = MAP.querySelector('.map__filters');
  var MAP_FILTERS_INPUTS = MAP_FILTERS.querySelectorAll('input');
  var MAP_FILTERS_SELECTS = MAP_FILTERS.querySelectorAll('select');

  var MAP_PINS = MAP.querySelector('.map__pins');
  var MAP_PIN_MAIN = MAP_PINS.querySelector('.map__pin--main');

  var ADDRESS = AD_FORM.querySelector('input[name="address"]');
  var PRICE_INPUT = AD_FORM.querySelector('input[name = price]');
  var TITLE_INPUT = AD_FORM.querySelector('input[name = title]');

  var TYPE = AD_FORM.querySelector('select[name="type"]');
  var TIMEIN = AD_FORM.querySelector('select[name="timein"]');
  var TIMEOUT = AD_FORM.querySelector('select[name="timeout"]');
  var ROOMS = AD_FORM.querySelector('select[name="rooms"]');
  var CAPACITY = AD_FORM.querySelector('select[name="capacity"]');

  var setAddress = function () {
    ADDRESS.value = (MAP_PIN_MAIN.offsetLeft + MAIN_PIN_WIDTH / 2) + ', '
    + (MAP_PIN_MAIN.offsetTop + MAIN_PIN_HEIGHT);
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
    if (roomsValue === '100') {
      for (var i = 0; i < CAPACITY.length; i++) {
        CAPACITY[i].disabled = CAPACITY[i].value !== '0';
      }
    } else {
      for (i = 0; i < CAPACITY.length; i++) {
        CAPACITY[i].disabled = !(roomsValue >= CAPACITY[i].value && CAPACITY[i].value !== '0');
      }
    }
  };

  var init = function () {
    ADDRESS.value = (MAP_PIN_MAIN.offsetLeft + MAIN_PIN_WIDTH / 2) + ', '
    + (MAP_PIN_MAIN.offsetTop + MAIN_PIN_WIDTH / 2);
    PRICE_INPUT.min = getMinPrice(TYPE.value);
    PRICE_INPUT.placeholder = PRICE_INPUT.min;
    TIMEOUT.value = TIMEIN.value;
    setCapacityDependency(ROOMS.value);

    setDisabled(AD_FORM_INPUTS, true);
    setDisabled(AD_FORM_SELECTS, true);
    setDisabled(MAP_FILTERS_INPUTS, true);
    setDisabled(MAP_FILTERS_SELECTS, true);
  };

  var activateState = function () {
    MAP.classList.remove('map--faded');
    AD_FORM.classList.remove('ad-form--disabled');
    setDisabled(AD_FORM_INPUTS, false);
    setDisabled(AD_FORM_SELECTS, false);
    setDisabled(MAP_FILTERS_INPUTS, false);
    setDisabled(MAP_FILTERS_SELECTS, false);
    ADDRESS.disabled = true;
    activeState = true;
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

  var activeState = false;
  init();

  setValidation(TITLE_INPUT);
  setValidation(PRICE_INPUT);

  TYPE.addEventListener('change', function (evt) {
    PRICE_INPUT.min = getMinPrice(evt.target.value);
    PRICE_INPUT.placeholder = PRICE_INPUT.min;
  });

  TIMEIN.addEventListener('change', function (evt) {
    TIMEOUT.value = evt.target.value;
  });

  TIMEOUT.addEventListener('change', function (evt) {
    TIMEIN.value = evt.target.value;
  });

  ROOMS.addEventListener('change', function (evt) {
    setCapacityDependency(evt.target.value);
  });

  AD_FORM_SUBMIT.addEventListener('click', function (evt) {
    if (CAPACITY.selectedOptions[0].disabled) {
      CAPACITY.setCustomValidity('Выберите доступное значение!');
      evt.stopPropagation();
    } else {
      CAPACITY.setCustomValidity('');
    }
  });

  window.form = {
    activeState: activeState,
    activateState: activateState,
    setAddress: setAddress
  };

})();
