'use strict';

// ПЕРЕИСПОЛЬЗУЕМЫЕ ФУНКЦИИ
// маска на телефон на странице Заявка на помощь
(function () {
  var phones = document.querySelectorAll('.request__form input[type="tel"]');

  Array.prototype.forEach.call(phones, function (element) {
    window.iMaskJS(element, {mask: '+{7}(000)000-00-00'});
  });
})();

// маска на телефон в анкете волонтера
(function () {
  var phone = document.querySelector('.volunteering-form__form input[type="tel"]');
  if (phone) {
    window.iMaskJS(phone, {mask: '+{7}(000)000-00-00'});
  }
})();

// выбор даты(общая)
(function () {
  function populate(date) {
    var month = date.querySelector('select[name="b-month"]');
    var day = date.querySelector('select[name="b-day"]');
    var days = day.querySelectorAll('option');
    var year = date.querySelector('select[name="b-year"]');

    var dayTwentyNinth = day.querySelector('option[value="29"]');
    var dayThirtieth = day.querySelector('option[value="30"]');
    var dayThirtyFirst = day.querySelector('option[value="31"]');


    Array.prototype.forEach.call(days, function (element) {
      element.removeAttribute('style');
    });

    var leapYear = Number(year.value) % 4;

    if (month.value === 'Апрель' || month.value === 'Сентябрь' || month.value === 'Июнь' || month.value === 'Ноябрь') {
      dayThirtyFirst.style.display = 'none';
    }

    if (!(leapYear === 0) && month.value === 'Февраль') {
      dayThirtyFirst.style.display = 'none';
      dayThirtieth.style.display = 'none';
      dayTwentyNinth.style.display = 'none';
    }

    if (leapYear === 0 && month.value === 'Февраль') {
      dayThirtyFirst.style.display = 'none';
      dayThirtieth.style.display = 'none';
    }
  }

  window.populate = populate;
})();

// валидация (общая)
(function () {
  var MAX_LENGTH = 16;
  var MAX_DONATE_FORM_LENGTH = 11;

  function getPhoneError(phone, phoneLength) {
    if (phone.length < phoneLength) {
      return 'Укажите ваш телефон';
    }

    return '';
  }

  function getValidationEmail(currentForm) {
    var currentEmail = currentForm.querySelector('input[type="email"]');

    if (currentEmail) {
      if (!currentEmail.validity.valid) {
        currentEmail.style = 'box-shadow: inset 0 0 0 2px red';
        return 'Некорректный email';
      } else {
        return '';
      }
    }

    return '';
  }

  function getValidationInputs(currentForm) {
    var currentInputs = currentForm.querySelectorAll('input[type="text"]');
    var error;

    if (currentInputs) {
      Array.prototype.forEach.call(currentInputs, function (element) {
        if (!element.validity.valid) {
          element.style = 'box-shadow: inset 0 0 0 2px red';
          error = 'Заполните поле';
        }
      });
    }

    return error;
  }

  function getValidationTextarea(currentForm) {
    var currentTextarea = currentForm.querySelectorAll('textarea');
    var error = '';

    if (currentTextarea) {
      Array.prototype.forEach.call(currentTextarea, function (element) {
        if (!element.validity.valid) {
          element.style = 'box-shadow: inset 0 0 0 2px red';
          error = 'Заполните поле';
        }
      });
    }

    return error;
  }

  function getValidationPhone(currentForm) {
    var currentPhone = currentForm.querySelector('input[type="tel"]');

    if (currentPhone) {

      if(currentPhone.hasAttribute("name") || currentPhone.getAttribute("name") === "leyka_donor_phone") {
        var errorPhone = getPhoneError(currentPhone.value, MAX_DONATE_FORM_LENGTH);
      } else {
        var errorPhone = getPhoneError(currentPhone.value, MAX_LENGTH);
      }

      if (errorPhone) {
        currentPhone.style = 'box-shadow: inset 0 0 0 2px red';
        return 'Телефон некорректен';
      } else {
        return '';
      }
    }

    return '';
  }

  function getValidationRadio(currentForm) {
    var currentRadios = currentForm.querySelectorAll('input[type="radio"]');
    var error = '';

    if (currentRadios) {
      Array.prototype.forEach.call(currentRadios, function (element) {
        if (!element.validity.valid) {
          element.nextElementSibling.style = 'border: 1px solid red';
          error = 'Поставьте флажок';
        }
      });
    }

    return error;
  }

  function getValidationCheckbox(currentForm) {
    var currentCheckboxes = currentForm.querySelectorAll('input[type="checkbox"]');
    var error = '';
    if (currentCheckboxes) {
      Array.prototype.forEach.call(currentCheckboxes, function (element) {
        if (!element.validity.valid) {
          element.nextElementSibling.style = 'border: 1px solid red';
          error = 'Поставьте флажок';
        }
      });
    }

    return error;
  }

  function getValidationCheckboxGroups(currentForm) {
    var checkboxGroups = currentForm.querySelectorAll('.checkbox-group');
    var error = 0;

    if (checkboxGroups) {
      Array.prototype.forEach.call(checkboxGroups, function (element) {
        var checkboxes = element.querySelectorAll('input[type="checkbox"]');
        var localError = 0;
        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            localError = 0;
            break;
          } else {
            localError = 1;
          }
        }

        if (localError) {
          Array.prototype.forEach.call(checkboxes, function (el) {
            el.nextElementSibling.style = 'border: 1px solid red';
          });
        }

        error += localError;
      });
    }

    return error;
  }

  function getValidationNumber(currentForm) {
    var currentNumbers = currentForm.querySelectorAll('input[type="number"]');
    var error = '';
    if (currentNumbers) {
      Array.prototype.forEach.call(currentNumbers, function (element) {
        if (!element.validity.valid) {
          element.style = 'box-shadow: inset 0 0 0 2px red';
          error = 'Заполните поле';
        }
      });
    }

    return error;
  }

  function getValidationFiles(currentForm) {
    var currentFile = currentForm.querySelector('input[type="file"]');

    if (currentFile) {
      var customFile = currentForm.querySelector(('input[type="file"] ~ label'));
      if (!currentFile.validity.valid) {
        customFile.style = 'box-shadow: inset 0 0 0 2px red';
        return 'Не все поля заполнены';
      } else {
        return '';
      }
    }
    return '';
  }

  function getResultValidation(evt, currentForm) {
    evt.preventDefault();
    evt.stopPropagation();


    getValidationInputs(currentForm);
    getValidationRadio(currentForm);
    getValidationEmail(currentForm);
    getValidationPhone(currentForm);
    getValidationCheckbox(currentForm);
    getValidationCheckboxGroups(currentForm);
    getValidationNumber(currentForm);
    getValidationFiles(currentForm);
    getValidationTextarea(currentForm);


    if (getValidationInputs(currentForm) || getValidationRadio(currentForm) || getValidationEmail(currentForm) || getValidationPhone(currentForm) || getValidationCheckbox(currentForm) || getValidationCheckboxGroups(currentForm) || getValidationNumber(currentForm) || getValidationFiles(currentForm) || getValidationTextarea(currentForm)) {
      return 'Не все поля заполненны корректно';
    }

    return '';
  }

  window.getResultValidation = getResultValidation;
})();

// ресет формы(общая)
(function () {

  function resetForm(currentForm) {
    currentForm.reset();
    var currentEmails = currentForm.querySelectorAll('input[type="email"]');
    var currentInputs = currentForm.querySelectorAll('input[type="text"]');
    var currentTextarea = currentForm.querySelectorAll('textarea');
    var currentPhones = currentForm.querySelectorAll('input[type="tel"]');
    var currentRadios = currentForm.querySelectorAll('input[type="radio"]');
    var currentCheckboxes = currentForm.querySelectorAll('input[type="checkbox"]');
    var currentNumbers = currentForm.querySelectorAll('input[type="number"]');

    if (currentEmails) {
      Array.prototype.forEach.call(currentEmails, function (element) {
        element.removeAttribute('style');
      });
    }

    if (currentInputs) {
      Array.prototype.forEach.call(currentInputs, function (element) {
        element.removeAttribute('style');
      });
    }

    if (currentTextarea) {
      Array.prototype.forEach.call(currentTextarea, function (element) {
        element.removeAttribute('style');
      });
    }

    if (currentPhones) {
      Array.prototype.forEach.call(currentPhones, function (element) {
        element.removeAttribute('style');
      });
    }

    if (currentRadios) {
      Array.prototype.forEach.call(currentCheckboxes, function (element) {
        element.nextElementSibling.removeAttribute('style');
      });
    }

    if (currentCheckboxes) {
      Array.prototype.forEach.call(currentRadios, function (element) {
        element.nextElementSibling.removeAttribute('style');
      });
    }

    if (currentNumbers) {
      Array.prototype.forEach.call(currentNumbers, function (element) {
        element.removeAttribute('style');
      });
    }

    var currentFile = currentForm.querySelector('input[type="file"]');

    if (currentFile) {
      var customFile = currentForm.querySelector('input[type="file"] ~ label');
      customFile.removeAttribute('style');
    }
  }

  window.resetForm = resetForm;

})();

// открытия модального окна после заполнения формы (общая)
(function () {
  var ESC_CODE = 27;

  var body = document.querySelector('body');

  function onSubmitBtn(evt, currentForm, currentModal) {
    var closeBtn = currentModal.querySelector('button');

    var error = window.getResultValidation(evt, currentForm);

    if (!error) {
      evt.preventDefault();
      evt.stopPropagation();

      openModal();
      window.resetForm(currentForm);
    }

    function openModal() {
      body.style.overflow = 'hidden';
      currentModal.classList.remove('modal--hidden');

      currentModal.addEventListener('click', onOverlay);
      document.addEventListener('keydown', onModalEscPress);
      closeBtn.addEventListener('click', closeModal);
    }

    function onOverlay(e) {
      if (e.target === currentModal) {
        closeModal();
      }
    }

    function closeModal() {
      closeBtn.removeEventListener('click', onCloseButton);

      currentModal.classList.add('modal--hidden');
      body.removeAttribute('style');

      currentModal.removeEventListener('click', onOverlay);
      document.removeEventListener('keydown', onModalEscPress);
    }

    function onCloseButton(e) {
      e.preventDefault();
      e.stopPropagation();

      closeModal();
    }

    function onModalEscPress(e) {
      if (e.keyCode === ESC_CODE) {
        closeModal();
      }
    }
  }

  window.onSubmitBtn = onSubmitBtn;
})();

// модалка для форм wp
(function () {
  var ESC_CODE = 27;

  var body = document.querySelector('body');

  function submitForm(evt, currentModal) {
    var closeBtn = currentModal.querySelector('button');

    body.style.overflow = 'hidden';
    currentModal.classList.remove('modal--hidden');

    currentModal.addEventListener('click', onOverlay);
    document.addEventListener('keydown', onModalEscPress);
    closeBtn.addEventListener('click', onCloseButton);

    function onOverlay(e) {
      if (e.target === currentModal) {
        closeModal();
      }
    }

    function closeModal() {
      closeBtn.removeEventListener('click', onCloseButton);

      currentModal.classList.add('modal--hidden');
      body.removeAttribute('style');

      currentModal.removeEventListener('click', onOverlay);
      document.removeEventListener('keydown', onModalEscPress);
    }

    function onCloseButton(e) {
      e.preventDefault();
      e.stopPropagation();

      closeModal();
    }

    function onModalEscPress(e) {
      if (e.keyCode === ESC_CODE) {
        closeModal();
      }
    }
  }

  window.submitForm = submitForm;
})();

// открытие окна с формой (общая)
(function () {
  var ESC_CODE = 27;

  var body = document.querySelector('body');

  function onOpenModatBtn(evt, currentModal, currentModalSuccess) {
    var closeBtn = currentModal.querySelector('.close-btn');
    var formWrapper = currentModal.querySelector('.wpcf7');
    var form = currentModal.querySelector('form');

    evt.preventDefault();
    evt.stopPropagation();

    body.style.overflow = 'hidden';
    currentModal.classList.remove('modal--hidden');

    currentModal.addEventListener('click', onOverlay);
    document.addEventListener('keydown', onModalEscPress);
    closeBtn.addEventListener('click', onCloseButton);

    formWrapper.addEventListener('wpcf7mailsent', submitForm);

    function submitForm(e) {
      closeModal();
      window.submitForm(e, currentModalSuccess);
    }

    function onOverlay(e) {
      if (e.target === currentModal) {
        onCloseButton(e);
      }
    }

    function closeModal() {
      closeBtn.removeEventListener('click', onCloseButton);
      currentModal.removeEventListener('click', onOverlay);
      document.removeEventListener('keydown', onModalEscPress);

      currentModal.classList.add('modal--hidden');
      body.removeAttribute('style');

      formWrapper.removeEventListener('wpcf7mailsent', submitForm);
    }

    function onCloseButton(e) {
      e.preventDefault();
      e.stopPropagation();

      form.reset();
      var errors = document.querySelectorAll('.wpcf7-not-valid');
      if (errors) {
        Array.prototype.forEach.call(errors, function (element) {
          element.classList.remove('wpcf7-not-valid');
        });
      }

      var messageError = document.querySelector('.wpcf7-validation-errors');
      if (messageError) {
        messageError.removeAttribute('style');
      }
      closeModal();
    }

    function onModalEscPress(e) {
      if (e.keyCode === ESC_CODE) {
        onCloseButton(e);
      }
    }
  }

  window.onOpenModatBtn = onOpenModatBtn;
})();

// поведение полей при изменении ошибок (общая)
(function () {
  var inputs = document.querySelectorAll('input');
  var textareas = document.querySelectorAll('textarea');
  var radios = document.querySelectorAll('input[type="radio"]');
  var checkboxGroups = document.querySelectorAll('.checkbox-group');

  if (checkboxGroups) {
    Array.prototype.forEach.call(checkboxGroups, function (element) {
      var checkboxes = element.querySelectorAll('input[type="checkbox"]');

      Array.prototype.forEach.call(checkboxes, function (el) {
        el.onchange = function () {
          var checkboxesWrapper = el.closest('.wpcf7-not-valid');
          if (checkboxesWrapper) {
            checkboxesWrapper.classList.remove('wpcf7-not-valid');
          }
        };
      });
    });
  }

  if (inputs) {
    Array.prototype.forEach.call(inputs, function (element) {
      element.oninput = function () {
        element.removeAttribute('style');
        var checkbox = element.nextElementSibling;

        if (checkbox) {
          checkbox.removeAttribute('style');
        }

        if (element.classList.contains('wpcf7-not-valid')) {
          element.classList.remove('wpcf7-not-valid');
        }
      };
    });
  }

  if (textareas) {
    Array.prototype.forEach.call(textareas, function (element) {
      element.oninput = function () {
        element.removeAttribute('style');

        if (element.classList.contains('wpcf7-not-valid')) {
          element.classList.remove('wpcf7-not-valid');
        }
      };
    });
  }

  if (radios) {
    Array.prototype.forEach.call(radios, function (element) {
      element.oninput = function () {
        var radiosWrapper = element.closest('.wpcf7-not-valid');
        if (radiosWrapper) {
          radiosWrapper.classList.remove('wpcf7-not-valid');
        }
      };
    });
  }
})();

// форма пожертвования онлай (общая)
(function () {
  function sentDonation(donationForm) {
    var form = document.querySelector('.donation-online form');
    var payForm = form.querySelector('.donation-online__pay');
    var btnSubmitStart = donationForm.querySelector('button[type="button"]');
    var radios = donationForm.querySelectorAll('.donation-online__sum input[type="radio"]');
    var customSum = donationForm.querySelector('.donation-online__sum input[type="number"]');
    var regularityWays = donationForm.querySelector('.donation-online__regularity');
    var regularityWaysItems = donationForm.querySelectorAll('.donation-online__regularity label');
    var anonimCheckbox = form.querySelector('.form-checkbox--anonim');


    var hiddenDonationAmount = form.querySelector('.leyka_donation_amount');
    var hiddenPaymentMethod = form.querySelector('input[name="leyka_payment_method"]');
    var select = form.querySelector('select');
    var selectOptions = select.querySelectorAll('option');

    var nameInput = form.querySelector('input[type="text"]');
    var emailInput = form.querySelector('input[type="email"]');
    var telInput = form.querySelector('.donation-online__tel-field input');
    var hiddenRecurringField = form.querySelector('.is-recurring-chosen');


    //проверяет какая регулярность выбрана
    var checkRegulatity = function () {
      var checkedRegularity;

      if (regularityWaysItems) {
        for (var i = 0; i < regularityWaysItems.length; i ++) {
          var input;
          input = regularityWaysItems[i].querySelector('input');
          if (input.checked) {
            checkedRegularity = input.value;
            break;
          }
        }
      }
      return checkedRegularity;
    }


    //убирает атрибут checked когда фокус в поле Другая сумма
    customSum.addEventListener('focus', function () {
      customSum.removeAttribute('style');
      Array.prototype.forEach.call(radios, function (element) {
        element.nextElementSibling.removeAttribute('style');
        element.removeAttribute('checked');
        element.checked = false;
      });
    });

    //убирает красную обводку при клике на радио и очищает value поля Другая сумма
    radios.forEach(function (element) {

      element.addEventListener('click', function () {
        Array.prototype.forEach.call(radios, function (element) {
          element.nextElementSibling.removeAttribute('style');
        });
        customSum.value = '';
        customSum.removeAttribute('style');
      });
    });

    btnSubmitStart.addEventListener('click', onSubmitBtn);

    var hideFields = function () {
      var checkbox = anonimCheckbox.querySelector('.form-checkbox--anonim input[type="checkbox"]');
      if (checkbox.checked) {
        nameInput.style.display = 'none';
        nameInput.value = 'Аноним';
        emailInput.style.display = 'none';
        //emailInput.value = 'anonymous@bf-pomosch.ru';
        emailInput.value = '';
        emailInput.removeAttribute('required');

      } else {
        nameInput.style.display = 'block';
        nameInput.value = '';
        emailInput.style.display = 'block';

        if (!emailInput.hasAttribute('required')) {
          emailInput.setAttribute('required', 'required');
        }
      }
    }


    var checkRecurringAttribute = function (options) {
      var regularity = checkRegulatity();

      if (regularity === "1") {
        select.value = "cp-card";
        anonimCheckbox.style.display = 'none';
        Array.prototype.forEach.call(options, function (option) {
          if (option.getAttribute('data-has-recurring') === "1") {
            option.style.display = 'block';
          } else if (option.getAttribute('data-has-recurring') === "0") {
            option.style.display = 'none';
          }
        });
      } else if (regularity === "0") {
        anonimCheckbox.style.display = 'flex';
        Array.prototype.forEach.call(options, function (option) {
          option.style.display = 'block';
        });
      }
    };

    window.checkRecurringAttribute = checkRecurringAttribute;

    var checkPaymentWay = function () {
      if (telInput) {

        if (select.value === 'mixplat-mobile') {
          telInput.type = "tel";
          window.iMaskJS(telInput, {mask: '{7}0000000000'});

        } else  {
          telInput.type = "hidden"
          telInput.value = '';
        }
      }
    }

    function onPaySubmitBtn(evt) {
      var error = window.getResultValidation(evt, payForm);

      if (!error) {
        hiddenPaymentMethod.value = select.value;

        form.classList.add('leyka-no-validation');
        window.jQuery('.leyka-pm-form').trigger('submit.leyka');
        evt.preventDefault();
        //evt.stopPropagation();
        //window.resetForm(form);
      }
    }

    window.onPaySubmitBtn = onPaySubmitBtn;

    function openPayForm() {
      window.checkRecurringAttribute(selectOptions);
      checkPaymentWay();

      var sum = getSum();

      if (hiddenDonationAmount) {
        hiddenDonationAmount.value = sum;
      }

      if (hiddenRecurringField) {
        hiddenRecurringField.value = checkRegulatity();
      }

      var donation = payForm.querySelector('p > span');
      var regularity = donationForm.querySelector('.donation-online__regularity input[type="radio"]:checked + span');
      var backBtn = payForm.querySelector('.donation-online__btn-back');
      var submitBtn = payForm.querySelector('button[type="submit"]');

      donation.textContent = sum + ' руб. ' + regularity.textContent.toLowerCase();
      donationForm.style.display = 'none';
      payForm.style.display = 'block';

      anonimCheckbox.addEventListener('change', function () {
        hideFields();
      });


      select.addEventListener('change', function () {
        checkPaymentWay();
      });


      backBtn.addEventListener('click', window.closePayForm);
      submitBtn.addEventListener('click', window.onPaySubmitBtn);
    }

    window.openPayForm = openPayForm;

    function closePayForm(evt) {
      var btnBack = evt.target;
      payForm.removeAttribute('style');
      donationForm.removeAttribute('style');
      window.resetForm(form);
      btnBack.removeEventListener('click', closePayForm);

      var telInput = payForm.querySelector('.donation-online__tel-field input');

      if (telInput) {
        telInput.type = "hidden";
      }

      if (nameInput) {
        nameInput.style.display = 'block';
        nameInput.value = '';
      }

      if (emailInput) {
        emailInput.style.display = 'block';
        emailInput.value = '';
      }
    }

    window.closePayForm = closePayForm;

    if (nameInput && emailInput) {
      if (nameInput.value && emailInput.value) {
        openPayForm();
      }
    }

    function onSubmitBtn(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      var validation = getValidationSum();

      if (!validation) {
        openPayForm();
      }
    }

    function getRadioSum() {
      var sum;

      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          sum = radios[i].value;
          break;
        } else {
          sum = '';
        }
      }
      return sum;
    }

    function getSum() {
      var sum;
      var radioSum = getRadioSum();

      if (customSum.value) {
        sum = customSum.value;
      } else {
        if (radioSum) {
          sum = radioSum;
        } else {
          sum = '';
        }
      }

      return sum;
    }

    function getValidationSum() {
      var sum = getSum();

      if (!sum) {
        Array.prototype.forEach.call(radios, function (element) {
          element.nextElementSibling.style = 'box-shadow: inset 0 0 0 2px red';
        });
        customSum.style = 'box-shadow: inset 0 0 0 2px red';

        return 'Выберите сумму';
      }

      return '';
    }


  }

  window.sentDonation = sentDonation;
})();


//валидация полей на Вкладке СМС в форме пожертвования

(function () {

  var donationSmsForm = document.querySelector('.donation-sms__form');

  if (donationSmsForm) {
    var submitBtn = donationSmsForm.querySelector('button[type="submit"]');
    var currentTelInput = donationSmsForm.querySelector('[type="tel"]');
    var currentSumInput = donationSmsForm.querySelector('input[type="number"]');

    if (currentTelInput) {
      window.iMaskJS(currentTelInput, {mask: '{7}0000000000'})
    }

    submitBtn.addEventListener('click', function (evt) {

      if (!(currentTelInput.validity.valid && currentSumInput.validity.valid)) {

        evt.preventDefault();

        if (!currentTelInput.validity.valid) {
          currentTelInput.style = 'box-shadow: inset 0 0 0 2px red';
        }

        if (!currentSumInput.validity.valid) {
          currentSumInput.style = 'box-shadow: inset 0 0 0 2px red';
        }
      }
    });
  }
})();


// загрузка процентов
(function () {
  function changePercent(element, percentNumbers, currentNumber) {

    element.textContent = currentNumber + '%';
    currentNumber++;
    if (percentNumbers.length > currentNumber) {
      setTimeout(function () {
        changePercent(element, percentNumbers, currentNumber);
      }, 15);
    }
  }

  window.changePercent = changePercent;
})();

// СЛАЙДЕРЫ
// слайдер на странице контакты
(function () {

  var fundContactsSlider = document.querySelector('.fund-contacts__slider-container');

  if (fundContactsSlider) {
    var mySwiper;
    var isActive;

    var initSlider = function () {
      mySwiper = new Swiper (fundContactsSlider, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        direction: 'horizontal',

        navigation: {
          nextEl: '.fund-contacts__slider-btn--next',
          prevEl: '.fund-contacts__slider-btn--prev',
        },

        breakpoints: {

          598: {
            slidesPerView: 2,
            spaceBetween: 20,
          }
        },

        scrollbar: {
          el: '.fund-contacts-scrollbar',
          draggable: true,
          snapOnRelease: false,
          dragSize: 46,
        }
      });
    };

    if (document.body.clientWidth < '768') {
      initSlider();
      isActive = true;
    }

    window.addEventListener('resize', function () {

      if (document.body.clientWidth >= '768') {
        if (isActive) {
          mySwiper.destroy(true, true);
          isActive = false;
        }
      }

      if (document.body.clientWidth < '768' && !isActive) {
        initSlider();
        isActive = true;
      }
    });
  }
})();

// слайдер на странице Партнерство
(function () {

  var partnershipOptionSliderContainer = document.querySelector('.partnership__option-slider-container');

  if (partnershipOptionSliderContainer) {
    var mySwiper;
    var isActive;

    var initSlider = function () {
      mySwiper = new Swiper (partnershipOptionSliderContainer, {
        slidesPerView: 2,
        spaceBetween: 56,
        loop: true,
        direction: 'horizontal',

        navigation: {
          nextEl: '.partnership__option-slider-btn--next',
          prevEl: '.partnership__option-slider-btn--prev',
        },

        breakpoints: {
        // when window width is >= 1024px
          1024: {
            spaceBetween: 66,
          }
        }
      });
    };

    if (document.body.clientWidth > '767') {
      initSlider();
      isActive = true;
    }

    window.addEventListener('resize', function () {

      if (document.body.clientWidth < '768') {
        if (isActive) {
          mySwiper.destroy(true, true);
          isActive = false;
        }
      }

      if (document.body.clientWidth > '767' && !isActive) {
        initSlider();
        isActive = true;
      }
    });
  }
})();

// слайдер большой
(function () {

  var mainSliderContainer = document.querySelector('.slider-main__container');
  var mainPrevButton = document.querySelector('.slider-main__btn--next');
  var mainNextButton = document.querySelector('.slider-main__btn--prev');
  var mainScrollbar = document.querySelector('.swiper-scrollbar');

  var mainSlider = new Swiper (mainSliderContainer, {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: false,
    direction: 'horizontal',

    navigation: {
      nextEl: mainPrevButton,
      prevEl: mainNextButton,
    },

    scrollbar: {
      el: mainScrollbar,
      draggable: true,
      snapOnRelease: false,
      dragSize: 190,
    },

    breakpoints: {
      // when window width is >= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },

      768: {
        slidesPerView: 2,
        spaceBetween: 50,
      },

      320: {
        slidesPerView: 1,
        spaceBetween: 80,
      },
    }
  });
})();

// слайдер для блока новостей
(function () {

  var newsSliderContainer = document.querySelector('.news-main__container');
  var newsPrevButton = document.querySelector('.news-main__btn--next');
  var newsNextButton = document.querySelector('.news-main__btn--prev');

  if (newsSliderContainer) {
    var newsSlider;
    var isActive;

    var initSlider = function () {
      newsSlider = new Swiper (newsSliderContainer, {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        direction: 'horizontal',

        navigation: {
          nextEl: newsPrevButton,
          prevEl: newsNextButton,
        },

        breakpoints: {

          460: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          630: {
            slidesPerView: 3,
            spaceBetween: 20,
          }
        }
      });
    };

    if (document.body.clientWidth < '768') {
      initSlider();
      isActive = true;
    }

    window.addEventListener('resize', function () {

      if (document.body.clientWidth > '767' && isActive) {
        newsSlider.destroy(true, true);
        isActive = false;
      }

      if (document.body.clientWidth < '768' && !isActive) {
        initSlider();
        isActive = true;
      }
    });
  }
})();

// слайдер для блока документы
(function () {

  var documentsMainSlider = document.querySelector('.fund-documents__paper');

  if (documentsMainSlider) {
    var mySwiper;
    var isActive;

    var initSlider = function () {
      mySwiper = new Swiper (documentsMainSlider, {
        slidesPerView: 2,
        spaceBetween: 0,
        loop: false,
        direction: 'horizontal',

        navigation: {
          nextEl: '.fund-documents__btn--next',
          prevEl: '.fund-documents__btn--prev',
        },

        breakpoints: {

          500: {
            slidesPerView: 3,
            spaceBetween: 5,
          },

          600: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
        }

        // scrollbar: {
        //   el: '.fund-contacts-scrollbar',
        //   draggable: true,
        //   snapOnRelease: false,
        //   dragSize: 46,
        // }
      });
    };

    if (document.body.clientWidth < '768') {
      initSlider();
      isActive = true;
    }

    window.addEventListener('resize', function () {

      if (document.body.clientWidth >= '768') {
        if (isActive) {
          mySwiper.destroy(true, true);
          isActive = false;
        }
      }

      if (document.body.clientWidth < '768' && !isActive) {
        initSlider();
        isActive = true;
      }
    });
  }
})();

// слайдер "О фонде - команда фонда"
(function () {

  var teamSliderContainer = document.querySelector('.fund-team__container');
  var teamPrevButton = document.querySelector('.fund-team__btn--next');
  var teamNextButton = document.querySelector('.fund-team__btn--prev');
  var teamScrollbar = document.querySelector('.fund-team__scrollbar');

  if (teamSliderContainer) {

    var teamSlider = new Swiper (teamSliderContainer, {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: false,
      direction: 'horizontal',

      navigation: {
        nextEl: teamPrevButton,
        prevEl: teamNextButton,
      },

      scrollbar: {
        el: teamScrollbar,
        draggable: true,
      },

      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 25,
        },

        680: {
          slidesPerView: 3,
          spaceBetween: 20,
        },

        500: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
      }
    });
  }
})();

// слайдер партнеров
(function () {

  var partnersSliderContainer = document.querySelector('.fund-partners__slider-container');
  var partnersPrevButton = document.querySelector('.fund-partners__slider-btn--prev');
  var partnersNextButton = document.querySelector('.fund-partners__slider-btn--next');

  var partnersSlider = new Swiper (partnersSliderContainer, {
    slidesPerView: 1,
    spaceBetween: 0,
    direction: 'horizontal',
    loop: true,

    navigation: {
      nextEl: partnersNextButton,
      prevEl: partnersPrevButton,
    },

    breakpoints: {

      400: {
        slidesPerView: 2,
        spaceBetween: 20,
      },

      550: {
        slidesPerView: 3,
      },

      900: {
        slidesPerView: 4,
      }
    }
  });
})();

// слайдер проектов
(function () {

  var projectsSliderContainer = document.querySelector('.fund-projects__slider-container');
  var projectsPrevButton = document.querySelector('.fund-projects__slider-btn--prev');
  var projectsNextButton = document.querySelector('.fund-projects__slider-btn--next');

  if (projectsSliderContainer) {
    var mySwiper;
    var isActive;

    var initSlider = function () {
      mySwiper = new Swiper (projectsSliderContainer, {
        slidesPerView: 1,
        spaceBetween: 35,
        direction: 'horizontal',

        navigation: {
          nextEl: projectsNextButton,
          prevEl: projectsPrevButton,
        },

        breakpoints: {

          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          }
        }
      });
    };

    if (document.body.clientWidth < '1024') {
      initSlider();
      isActive = true;
    }

    window.addEventListener('resize', function () {

      if (document.body.clientWidth >= '1024') {
        if (isActive) {
          mySwiper.destroy(true, true);
          isActive = false;
        }
      }

      if (document.body.clientWidth < '1024' && !isActive) {
        initSlider();
        isActive = true;
      }
    });
  }


})();

// слайдер видов партнерства
(function () {

  var cooperationOptionSliderContainer = document.querySelector('.cooperation-option__slider-container');
  var cooperationOptionPrevButton = document.querySelector('.cooperation-option__slider-btn--prev');
  var cooperationOptionNextButton = document.querySelector('.cooperation-option__slider-btn--next');
  var cooperationOptionPagination = document.querySelector('.cooperation-option__slider-toggles');

  if (cooperationOptionSliderContainer) {
    var cooperationOptionSlider;
    var isActive;

    var initSlider = function () {
      cooperationOptionSlider = new Swiper (cooperationOptionSliderContainer, {

        direction: 'horizontal',
        loop: true,

        navigation: {
          nextEl: cooperationOptionNextButton,
          prevEl: cooperationOptionPrevButton,
        },

        pagination: {
          el: cooperationOptionPagination,
          clickable: true,
        },

        breakpoints: {

          500: {
            slidesPerView: 2,
            spaceBetween: 15,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 26,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 75,
          }
        },
      });
    };

    if (document.body.clientWidth >= '500') {
      initSlider();
      isActive = true;
    }

    window.addEventListener('resize', function () {

      if (document.body.clientWidth < '500') {
        if (isActive) {
          cooperationOptionSlider.destroy(true, true);
          isActive = false;
        }
      }

      if (document.body.clientWidth >= '500' && !isActive) {
        initSlider();
        isActive = true;
      }
    });
  }
})();

// слайдер фото волонтерства
(function () {

  var volunteeringOptionSliderContainer = document.querySelector('.volunteering__option-slider-container');
  var volunteeringBtnNext = document.querySelector('.volunteering__option-slider-btn--next');
  var volunteeringBtnPrev = document.querySelector('.volunteering__option-slider-btn--prev');

  if (volunteeringOptionSliderContainer) {

    var volunteeringSlider = new Swiper (volunteeringOptionSliderContainer, {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: false,
      direction: 'horizontal',

      navigation: {
        nextEl: volunteeringBtnNext,
        prevEl: volunteeringBtnPrev,
      },

      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 22,
        },

        540: {
          slidesPerView: 3,
          spaceBetween: 15,
        },

        410: {
          slidesPerView: 2,
          spaceBetween: 15,
        },

      },

      scrollbar: {
        el: '.volunteering__option-scrollbar',
        draggable: true,
      }
    });
  }
})();

// слайдер для выбора заявки на помощь
(function () {


  var projectSlider = document.querySelector('.request__slider .slider__container');
  var projectsNextBtn = document.querySelector('.request__slider .slider__btn--next');
  var projectsPrevBtn = document.querySelector('.request__slider .slider__btn--prev');
  var projectPagination = document.querySelector('.request__slider .request__dots');

  var projectsList = document.querySelectorAll('.request__project');

  var initSlider = function () {
    mySwiper = new Swiper (projectSlider, {
      loop: false,
      direction: 'horizontal',
      setWrapperSize: true,
      observer: true,

      navigation: {
        nextEl: projectsNextBtn,
        prevEl: projectsPrevBtn,
      },

      pagination: {
        el: projectPagination,
        clickable: true,
      },

      breakpoints: {

        1024: {
          slidesPerView: 3,
          spaceBetween: 60,
        },

        768: {
          slidesPerView: 2,
          spaceBetween: 26,
        },

        320: {
          slidesPerView: 1,
          spaceBetween: 50,
        },
      },
    });
  };

  if (projectSlider) {

    var mySwiper;
    var isActive;

    if (projectsList.length > 3) {
      projectPagination.style.display = 'flex';
      initSlider();

    } else if (projectsList.length <= 3) {

      if (document.body.clientWidth < '1024') {
        initSlider();
        isActive = true;
      }

      window.addEventListener('resize', function () {

        if (document.body.clientWidth >= '1024') {
          if (isActive) {
            mySwiper.destroy(true, true);
            isActive = false;
          }
        }

        if (document.body.clientWidth < '1024' && !isActive) {
          initSlider();
          isActive = true;
        }
      });
    }
  }
})();

//слайдер галереи в истории ребенка
(function () {

  var photoSlider = document.querySelector('.child-gallery__wrapper.swiper-container');
  var photoNextBtn = document.querySelector('.child-gallery__pagination--next');
  var photoPrevBtn = document.querySelector('.child-gallery__pagination--prev');


  var initSlider = function () {
    mySwiper = new Swiper (photoSlider, {
      loop: false,
      direction: 'horizontal',
      setWrapperSize: true,
      observer: true,

      navigation: {
        nextEl: photoNextBtn,
        prevEl: photoPrevBtn,
      },

      breakpoints: {

        1024: {
          slidesPerView: 1,
          spaceBetween: 60,
        },

        768: {
          slidesPerView: 1,
          spaceBetween: 26,
        },
      },
    });
  };


  if (photoSlider) {

    var photoList = photoSlider.querySelectorAll('img');
    console.log(photoList);

    var mySwiper;
    var isActive;


    if (photoList.length >= 2) {

      if (document.body.clientWidth < '1024') {
        photoNextBtn.style.display = 'inline-block';
        photoPrevBtn.style.display = 'inline-block';
        initSlider();
        isActive = true;
      }

      window.addEventListener('resize', function () {

        if (document.body.clientWidth >= '1024') {
          if (isActive) {
            photoNextBtn.removeAttribute('style');
            photoPrevBtn.removeAttribute('style');
            mySwiper.destroy(true, true);
            isActive = false;
          }
        }

        if (document.body.clientWidth < '1024' && !isActive) {
          photoNextBtn.style.display = 'inline-block';
          photoPrevBtn.style.display = 'inline-block';
          initSlider();
          isActive = true;
        }
      });
    }
  }
})();

// БЛОКИ
// меню
(function () {
  var navBtn = document.querySelector('.page-header__open');
  var nav = document.querySelector('.page-header__nav');

  if (navBtn && nav) {
    navBtn.addEventListener('click', openNav);
  }

  function openNav(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (navBtn.classList.contains('page-header__close')) {
      navBtn.classList.remove('page-header__close');
      nav.style.display = '';
    } else {
      navBtn.classList.add('page-header__close');
      nav.style.display = 'block';
    }
  }
})();

// поиск
(function () {
  var searchForm = document.querySelector('.page-header__search');
  var search = document.querySelector('.page-header__search label');
  var searchInput = document.querySelector('.page-header__search input[type="search"]');
  var searchSVG = document.querySelector('.page-header__search svg');
  var headerLinks = document.querySelector('.page-header__links');

  if (search && searchInput) {
    searchSVG.addEventListener('click', openSearch);
  }

  function openSearch(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (searchInput.classList.contains('visually-hidden')) {
      searchInput.classList.remove('visually-hidden');
      headerLinks.classList.add('visually-hidden');
    } else {
      searchForm.reset();
      searchInput.classList.add('visually-hidden');
      headerLinks.classList.remove('visually-hidden');
    }
  }
})();


// api yandex map
(function () {
  var isMapSupport = true;

  try {
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
        center: [59.969340, 30.364602],
        zoom: 14
      }, {
        searchControlProvider: 'yandex#search'
      }),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Благотворительный фонд "Помощь"'
      }, {
        iconLayout: 'default#image',
        iconImageHref: '/wp-content/themes/cfhelp/img/contacts/mark.png',
        iconImageSize: [53, 65],
        iconImageOffset: [-26, -75]
      });


      myMap.geoObjects
      .add(myPlacemark);

      var mapAreas = [
        {
          top: 0,
          left: 0,
          width: '120px',
          height: '100%'
        },

        {
          top: 10,
          right: 10,
          width: '100%',
          height: '100px'
        }
      ];

      mapAreas.forEach(function (area) {
        myMap.margin.addArea(area);
      });

      myMap.panTo([59.969340, 30.364602], {useMapMargin: true});

    });

  } catch (err) {
    isMapSupport = false;
  }
})();

// копирование в буфер обмена
(function () {

  var url = window.location.toString();

  var copyBlock = document.querySelector('.copy-block');
  var copyBlockNoSetValue = document.querySelector('.copy-block-no-set-value');

  if (copyBlock) {

    var currentInput = copyBlock.querySelector('input[type="text"]');
    currentInput.value = url;
    var currentButton = copyBlock.querySelector('button[type="button"]');

    currentButton.addEventListener('click', onCopyButtonClick);
  }

  if (copyBlockNoSetValue) {
    var currentInput = copyBlockNoSetValue.querySelector('input[type="text"]');
    var currentButton = copyBlockNoSetValue.querySelector('button[type="button"]');

    currentButton.addEventListener('click', onCopyButtonClick);
  }

  function onCopyButtonClick() {
    currentInput.select();
    document.execCommand('copy');
  }
})();

// Ищет и убирает атрибут open
(function () {
  if (document.body.clientWidth < '1024') {
    var fundElemDetails = document.querySelectorAll('.fund-faq__block');
    for (var i = 0; i < fundElemDetails.length; i++) {
      var elem = fundElemDetails[i];
      if (elem.hasAttribute('open')) {
        elem.removeAttribute('open');
      }
    }
  }
})();

// шкала пожертвований
(function () {

  var donationRange = document.querySelector('.regular-help__range');

  if (donationRange) {
    var donationSum = document.querySelector('.regular-help input[type="number"]');
    var donationRanges = donationRange.querySelectorAll('.regular-help__donation');
    var donationPin = donationRange.querySelector('.regular-help__pin');
    var currentDroppable = null;

    var rangesCoords = [];

    for (var i = 0; i < donationRanges.length; i++) {
      rangesCoords.push(donationRanges[i].getBoundingClientRect().left);
    }

    donationSum.addEventListener('change', function () {
      changeRange();
      changePin();
    });

    Array.prototype.forEach.call(donationRanges, function (element) {
      element.addEventListener('click', onRange);
    });

    donationPin.addEventListener('mousedown', movePin);
    donationPin.ondragstart = function () {
      return false;
    };
  }

  function movePin(evt) {
    evt.preventDefault();

    var shiftX = evt.clientX - donationPin.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(ev) {
      var newLeft = ev.clientX - shiftX - donationRange.getBoundingClientRect().left;

      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = donationRange.offsetWidth - donationPin.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      donationPin.style.left = newLeft + 'px';

      var pinCoords = {
        x: donationPin.getBoundingClientRect().left,
        y: donationPin.getBoundingClientRect().bottom - 17
      };

      donationPin.style.display = 'none';
      var elemBelow = document.elementFromPoint(pinCoords.x, pinCoords.y);
      donationPin.style.display = 'block';

      if (!elemBelow) {
        return;
      }

      var droppableBelow = elemBelow.closest('.regular-help__donation');
      if (currentDroppable !== droppableBelow) {
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          enterDroppable(currentDroppable);
        }
      }
    }

    function onMouseUp() {
      var coords = {
        x: donationPin.getBoundingClientRect().left,
        y: donationPin.getBoundingClientRect().bottom - 17
      };

      donationPin.style.display = 'none';

      var currentRange = document.elementFromPoint(coords.x, coords.y);
      var firstCoords = donationRanges[0].getBoundingClientRect().left;
      var newCoords = currentRange.getBoundingClientRect().left;
      var distantion = newCoords - firstCoords;

      if (distantion === 0) {
        distantion = 13;
      }

      var newLeft = distantion + 'px';

      donationPin.style.display = 'block';
      donationSum.value = currentRange.id;

      changeRange();
      donationPin.style.left = newLeft;

      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  }

  function enterDroppable(elem) {
    donationSum.value = elem.id;
    changeRange();
  }

  function onRange(evt) {
    var range = evt.target;

    donationSum.value = range.id;

    changeRange();
    changePin();
  }

  function changeRange() {

    var range = getRange();

    if (range) {
      Array.prototype.forEach.call(donationRanges, function (element) {
        if (Number(element.id) <= range.id) {
          element.style.background = '#52bba4';
        } else {
          element.removeAttribute('style');
        }
      });
    }
  }

  function changePin() {

    var newLeft = getRange().getBoundingClientRect().left;
    var firstCoords = donationRanges[0].getBoundingClientRect().left;

    var distantion = newLeft - firstCoords;

    if (distantion === 0) {
      distantion = 13;
    }

    donationPin.style.left = distantion + 'px';
  }

  function getRange() {
    var sum = Math.round(Number(donationSum.value) / 100) * 100;
    if (sum < 100) {
      sum = 100;
    }

    if (sum > 1500) {
      sum = 1500;
    }

    var range = document.getElementById(sum);
    return range;
  }

  window.onload = function () {
    if (donationSum && donationRanges) {
      changeRange();
      changePin();
    }
  };
})();


// Блок вопрос-ответ на странице О фонде.
(function () {
  var fundfuqBlocks = document.querySelectorAll('.fund-faq__block');

  var fundfuqOpenMore = document.querySelector('.fund-faq__block-open button');

  if (fundfuqBlocks) {
    fundfuqBlocks.forEach(function (block) {
      var currrentAnswer = block.querySelector('.fund-faq__block-question');
      currrentAnswer.addEventListener('click', function () {
        block.classList.toggle('fund-faq__block--opened');
      });
    });
  }

  if (fundfuqOpenMore) {
    fundfuqOpenMore.addEventListener('click', function () {
      fundfuqBlocks.forEach(function (block) {
        block.style.display = 'block';
      });
      fundfuqOpenMore.style.display = 'none';
    });
  }
})();

// Прогресс-бар на карточках детей
(function () {

  var children = document.querySelectorAll('.need-help__item');

  if (children) {
    Array.prototype.forEach.call(children, function (element) {
      if (!element.classList.contains('need-help__item--details') && !element.classList.contains('need-help__item--scroll')) {
        getPercent(element);
      }
    });

    window.addEventListener('scroll', function () {
      Array.prototype.forEach.call(children, function (element) {
        if (!element.classList.contains('need-help__item--details') && !element.classList.contains('need-help__item--scroll')) {
          getPercent(element);
        }
      });
    });
  }

  function getPercent(element) {
    var percentBar = element.querySelector('.need-help__bar');
    var collectedAmount = element.querySelector('.need-help__sum');
    var neededAmount = element.querySelector('.need-help__all-sum');

    var percentAmount = element.querySelector('.need-help__number');

    var percent = Math.floor(collectedAmount.dataset.sum * 100 / neededAmount.dataset.sumAll);


    var percentNumbers = [];

    var currentNumber = 0;
    for (var j = 0; j <= percent; j++) {
      percentNumbers.push(j);
    }


    var barPosition = {
      top: window.pageYOffset + percentBar.getBoundingClientRect().top,
      left: window.pageXOffset + percentBar.getBoundingClientRect().left,
      right: window.pageXOffset + percentBar.getBoundingClientRect().right,
      bottom: window.pageYOffset + percentBar.getBoundingClientRect().bottom
    };

    var windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };

    if (barPosition.bottom > windowPosition.top &&
      barPosition.top < windowPosition.bottom &&
      barPosition.right > windowPosition.left &&
      barPosition.left < windowPosition.right) {
      window.changePercent(percentAmount, percentNumbers, currentNumber);

      percentBar.style.width = percent + '%';
      element.classList.add('need-help__item--scroll');
    }
  }
})();

// прогресс-бар на странице история ребенка
(function () {
  var percentBar = document.querySelector('.child-gallery__bar');

  if (percentBar) {
    var percentAmount = percentBar.querySelector('.child-gallery__number');

    var percent = Number(percentAmount.textContent.replace('%', ''));

    var percentNumbers = [];
    var currentNumber = 0;
    for (var j = 0; j <= percent; j++) {
      percentNumbers.push(j);
    }

    window.changePercent(percentAmount, percentNumbers, currentNumber);

    percentBar.style.width = percent + '%';
  }
})();

// переключение года отчетности
(function () {
  var years = document.querySelector('.reports-finance__years select');

  if (years) {
    years.addEventListener('change', function () {
      var year = years.value;
      if (year !== 'Год отчетности') {
        var report = document.querySelector('.reports-finance__docs--' + year);
      } else {
        report = document.querySelector('.reports-finance__docs');
      }
      var currentReport = document.querySelector('.reports-finance__docs--current');

      currentReport.classList.remove('reports-finance__docs--current');
      report.classList.add('reports-finance__docs--current');
    });
  }
})();

// фильтр новостей
(function () {
  var newsFilter = document.querySelector('.fund-all-news__filter form');

  if (newsFilter) {


    var year = newsFilter.querySelector('select[name="year-sorting"]');
    var month = newsFilter.querySelector('select[name="month-sorting"]');

    year.addEventListener('change', getFilter);
    month.addEventListener('change', getFilter);
  }

  function getFilter() {
    if (month.value === 'Месяц публикации') {
      month.setAttribute('disabled', 'true');
    }
    if (year.value === 'Год публикации') {
      year.setAttribute('disabled', 'true');
    }
    localStorage.setItem('year', year.value);
    localStorage.setItem('month', month.value);
    newsFilter.submit();
    month.removeAttribute('disabled', 'true');
    year.removeAttribute('disabled', 'true');
  }
})();
// фильтр новостей
(function () {
  var newsFilter = document.querySelector('.fund-all-news__filter form');

  if (newsFilter) {
    var year = newsFilter.querySelector('select[name="year-sorting"]');
    var month = newsFilter.querySelector('select[name="month-sorting"]');

    if (localStorage.getItem('year')) {
      year.value = localStorage.getItem('year');
      localStorage.removeItem('year');
    }
    if (localStorage.getItem('month')) {

      month.value = localStorage.getItem('month');
      localStorage.removeItem('month');
    }

  }
})();

// ФОРМЫ
// дата в Анкете
(function () {
  var birthdays = document.querySelectorAll('.volunteering-form__modal form');

  if (birthdays) {
    Array.prototype.forEach.call(birthdays, function (element) {
      var currentMonth = element.querySelector('select[name="b-month"]');
      var currentYear = element.querySelector('select[name="b-year"]');

      if (currentYear && currentMonth) {
        currentMonth.addEventListener('change', function () {
          window.populate(element);
        });

        currentYear.addEventListener('change', function () {
          window.populate(element);
        });
      }
    });
  }
})();

// дата в формах заявки на помощь
(function () {
  var birthdays = document.querySelectorAll('.request form');

  if (birthdays) {
    Array.prototype.forEach.call(birthdays, function (element) {
      var currentMonth = element.querySelector('select[name="b-month"]');
      var currentYear = element.querySelector('select[name="b-year"]');

      if (currentYear && currentMonth) {
        currentMonth.addEventListener('change', function () {
          window.populate(element);
        });

        currentYear.addEventListener('change', function () {
          window.populate(element);
        });
      }
    });
  }
})();

// работа формы пожертвований онлайн (на странице хочу помочь)
(function () {
  var donationForm = document.querySelector('.donation--general .donation-online__start');

  if (donationForm) {

    window.sentDonation(donationForm);
  }
})();

// работа формы пожертвований онлайн (на странице история ребенка)
(function () {
  var donationForm = document.querySelector('.donation--child .donation-online__start');

  if (donationForm) {

    window.sentDonation(donationForm);
  }
})();

// переход с адрессной помощи на страницу благодарности
(function () {
  var addressThanks = document.querySelector('.thanks-for-help__recipient');

  if (addressThanks && localStorage.getItem('childName')) {
    addressThanks.textContent = localStorage.getItem('childName');
    localStorage.removeItem('childName');
  }
})();

// маска на поле ввода суммы
// (function () {
//   var amounts = document.querySelectorAll('input[type="number"]');
//
//   if (amounts) {
//     amounts.forEach(function (amount) {
//       window.iMaskJS(amount, {mask: '00000000'});
//     });
//   }
// })();


// карточка регулярной помощи в блоке  им нужна помощь
(function () {
  var helpCards = document.querySelectorAll('.need-help__info-card');

  if (helpCards) {
    Array.prototype.forEach.call(helpCards, function (element) {
      var submitBtn = element.querySelector('button[type="submit"]');
      var currentForm = element.querySelector('form');
      var currentNumberInput = element.querySelector('[type="number"]');
      var currentNameInput = element.querySelector('input[type="text"]');
      var currentEmailInput = element.querySelector('input[type="email"]');


      submitBtn.addEventListener('click', function (evt) {

        if (!(currentNameInput.value && currentEmailInput.value && currentNumberInput.value)) {

          evt.preventDefault();

          if (!currentNameInput.value) {
            currentNameInput.style = 'border-bottom: 1px solid red';
          }

          if (!currentEmailInput.value) {
            currentEmailInput.style = 'border-bottom: 1px solid red';
          }

          if (!currentNumberInput.value) {
            currentNumberInput.style = 'border-bottom: 1px solid red';
          }
        }
      });
    });
  }

})();


//валидация блока Регулярная помощь

(function () {
  var regularHelpForm = document.querySelector('.regular-help form');

  if (regularHelpForm) {
    var submitBtn = regularHelpForm.querySelector('button[type="submit"]');
    var currentNumberInput = regularHelpForm.querySelector('[type="number"]');
    var currentNameInput = regularHelpForm.querySelector('input[type="text"]');
    var currentEmailInput = regularHelpForm.querySelector('input[type="email"]');
    var currentConsent = regularHelpForm.querySelector('input[type="checkbox"]');


    submitBtn.addEventListener('click', function (evt) {



      if (!(currentNameInput.value && currentEmailInput.value && currentNumberInput.value) && !currentConsent.checked) {

        evt.preventDefault();

        if (!currentNameInput.value) {
          currentNameInput.style = 'border-bottom: 1px solid red';
        }

        if (!currentEmailInput.value) {
          currentEmailInput.style = 'border-bottom: 1px solid red';
        }


        if (!currentNumberInput) {
          currentNumberInput.style = 'border: 2px solid red';
        }

        if (!currentConsent.checked) {
          currentConsent.nextElementSibling.style = 'border: 1px solid red';
        }
      }
    });
  }

})();

// МОДАЛКИ
// модалка на странице Спасибо за пожертвование
(function () {

  var thanksForDonationModal = document.querySelector('.thanks-for-donation__modal');
  var thanksForDonationClose = document.querySelector('.thanks-for-donation__modal-close');
  var thanksForDonationSubmit = document.querySelector('.thanks-for-donation__form button[type="submit"]');
  var thanksForDonationForm = document.querySelector('.thanks-for-donation__form');
  var thanksForDonationModalThanks = document.querySelector('.thanks-for-donation__thanks-modal');

  function closeModal() {
    thanksForDonationModal.classList.add('thanks-for-donation__modal--hidden');
  }

  if (thanksForDonationClose) {
    thanksForDonationClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      closeModal();
    });
  }

  function onSubmitBtn(e) {
    e.preventDefault();
    e.stopPropagation();
    var error = window.getResultValidation(e, thanksForDonationForm);
    window.onSubmitBtn(e, thanksForDonationForm, thanksForDonationModalThanks);

    if (!error) {
      closeModal();
    }
  }

  if (thanksForDonationSubmit) {
    thanksForDonationSubmit.addEventListener('click', function (e) {
      onSubmitBtn(e);
    });
  }

  if (thanksForDonationClose) {
    thanksForDonationClose.addEventListener('click', function (e) {
      e.preventDefault();
      closeModal();
    });
  }
})();

// открытие-закрытие модалки по кнопке Оставить контакты
(function () {

  var leaveContactsButton = document.querySelector('.cooperation-option__leave-contacts');
  var currentModal = document.querySelector('.cooperation__modal--leave-contacts');
  var currentModalSuccess = document.querySelector('.cooperation__modal-thanks');

  if (leaveContactsButton) {
    leaveContactsButton.addEventListener('click', function (evt) {
      window.onOpenModatBtn(evt, currentModal, currentModalSuccess);
    });
  }
})();

// открытие-закрытие модалки по кнопке Стать партнером
(function () {

  var becomePartnerButton = document.querySelector('a[href="#become-partner"]');
  var currentModal = document.querySelector('.cooperation__modal--become-partner');
  var currentModalSuccess = document.querySelector('.cooperation__modal-thanks');

  if (becomePartnerButton) {
    becomePartnerButton.addEventListener('click', function (evt) {
      window.onOpenModatBtn(evt, currentModal, currentModalSuccess);
    });
  }
})();

// открытие-закрытие модалки Анкета
(function () {
  var voluneeringFormLink = document.querySelector('.volunteering__intro-text a');
  var voluneeringFormButton = document.querySelector('.volunteering__option-link');
  var fundFuqLink = document.querySelector('a[href="#volunteer-link"]');

  var currentModal = document.querySelector('.volunteering-form__modal');
  var currentModalSuccess = document.querySelector('.volunteering-form__modal-thanks');


  if (voluneeringFormLink) {
    voluneeringFormLink.addEventListener('click', function (evt) {
      window.onOpenModatBtn(evt, currentModal, currentModalSuccess);
    });

  }

  if (voluneeringFormButton) {
    voluneeringFormButton.addEventListener('click', function (evt) {
      window.onOpenModatBtn(evt, currentModal, currentModalSuccess);
    });
  }

  if (fundFuqLink) {
    fundFuqLink.addEventListener('click', function (evt) {
      window.onOpenModatBtn(evt, currentModal, currentModalSuccess);
    });
  }
})();

// валидация и модалка на странице контакты
(function () {
  var contactsForm = document.querySelector('.contacts__form .wpcf7');

  if (contactsForm) {
    var currentModal = document.querySelector('.contacts__modal-thanks');

    contactsForm.addEventListener('wpcf7mailsent', function (evt) {
      window.submitForm(evt, currentModal);
    });
  }
})();

// модальное окно рассылки
(function () {
  var mailingForm = document.querySelector('.mailing__form');
  var mailingBtn = document.querySelector('.mailing button[type="submit"]');
  var mailingModal = document.querySelector('.mailing__modal');

  if (mailingBtn) {
    mailingBtn.addEventListener('click', function (evt) {
      window.onSubmitBtn(evt, mailingForm, mailingModal);
    });
  }
})();

// модальное окно заветного желания
(function () {

  var requestList = document.querySelector('.request__list');

  if (requestList) {
    var wishBtns = document.querySelectorAll('.request__project button');
    var currentModalSuccess = document.querySelector('.request__success');

    Array.prototype.forEach.call(wishBtns, function (element) {
      element.addEventListener('click', function (evt) {
        var modifier = element.value;
        var currentModal = document.querySelector('.request__wish-modal--' + modifier);
        window.onOpenModatBtn(evt, currentModal, currentModalSuccess);
      });
    });
  }
})();

// модальное окно заветного желания (успешно отправленное сообщение)

// валидация и модальное окно заявки на помощь
(function () {
  var projectForm = document.querySelector('.request__forms');
  var currentModal = document.querySelector('.request__success');

  if (projectForm) {
    var forms = projectForm.querySelectorAll('.wpcf7');


    Array.prototype.forEach.call(forms, function (element) {
      element.addEventListener('wpcf7mailsent', function (evt) {
        window.submitForm(evt, currentModal);
      });
    });
  }
})();

// модалка с необходимыми документами для загрузки
(function () {
  var ESC_CODE = 27;

  var body = document.querySelector('body');
  var documentBtns = document.querySelectorAll('.request__documents .download');
  var documentModal = document.querySelector('.documents');

  var fuqDocumentLink = document.querySelector('a[href="#documents-link"]');

  function openModal() {
    documentModal.classList.remove('modal--hidden');
    body.style.overflow = 'hidden';

    documentModal.addEventListener('click', onOverlay);
    document.addEventListener('keydown', onModalEscPress);
    closeBtn.addEventListener('click', closeModal);
  }

  function onOverlay(evt) {
    if (evt.target === documentModal) {
      closeModal();
    }
  }

  function closeModal() {
    closeBtn.removeEventListener('click', onCloseButton);

    documentModal.classList.add('modal--hidden');
    body.removeAttribute('style');

    documentModal.removeEventListener('click', onOverlay);
    document.removeEventListener('keydown', onModalEscPress);
  }

  function onCloseButton(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    closeModal();
  }

  function onModalEscPress(e) {
    if (e.keyCode === ESC_CODE) {
      closeModal();
    }
  }

  if (documentBtns && documentModal) {
    var closeBtn = documentModal.querySelector('button');

    Array.prototype.forEach.call(documentBtns, function (element) {
      element.addEventListener('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        openModal();
      });
    });
  }

  if (fuqDocumentLink && documentModal) {
    closeBtn = documentModal.querySelector('button');
    fuqDocumentLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      openModal();
    });
  }
})();

// плавный скролл
(function () {
  var links = document.querySelectorAll('.smooth-scroll-link');

  if (links) {
    var v = 0.3;
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (event) {
        event.preventDefault();
        var w = window.pageYOffset;
        var hash = this.href.replace(/[^#]*(.*)/, '$1');
        var t = document.querySelector(hash).getBoundingClientRect().top;
        var start = null;
        requestAnimationFrame(step);
        function step(time) {
          if (start === null) {
            start = time;
          }
          var progress = time - start;
          var r;
          r = (t < 0 ? Math.max(w - progress / v, w + t) : Math.min(w + progress / v, w + t));
          window.scrollTo(0, r);
          if (r != w + t) {
            requestAnimationFrame(step);
          } else {
            location.hash = hash;
          }
        }
      }, false);
    }
  }
})();


//табы на странице История ребенка
(function () {

  var tabs = function(options) {

    var el = options.el;
    var tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
    var tabContentContainers = el.querySelectorAll(options.tabContentContainers);
    var activeIndex = 0;
    var initCalled = false;

    var init = function() {
      if (!initCalled) {
        initCalled = true;

        for (var i = 0; i < tabNavigationLinks.length; i++) {
          var link = tabNavigationLinks[i];
          handleClick(link, i);
        }
      }
    };

    var handleClick = function(link, index) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        goToTab(index);
      });
    };


    var goToTab = function(index) {
      if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
        tabNavigationLinks[activeIndex].classList.remove('child-story__tab--active');
        tabNavigationLinks[index].classList.add('child-story__tab--active');
        tabContentContainers[activeIndex].classList.remove('child-story__tab-content--active');
        tabContentContainers[index].classList.add('child-story__tab-content--active');
        activeIndex = index;
      }
    };

    return {
      init: init,
      goToTab: goToTab
    };
  };

  var tabsWrapper = document.querySelector('.child-story');

  if (tabsWrapper) {
    var myTabs = tabs({
      el: tabsWrapper,
      tabNavigationLinks: '.child-story__tab',
      tabContentContainers: '.child-story__tab-content'
      });
      myTabs.init();
  }

})();

//Форма Помочь сейчас (зеленая)
(function () {
  var helpNowForm = document.querySelector('.help-now');

  if (helpNowForm) {

    var form = helpNowForm.querySelector('form');
    var submitLink = helpNowForm.querySelector('.help-now__btn-wrapper--desk a');
    var mobileSubmitLink = helpNowForm.querySelector('.help-now__btn-wrapper--mobile a');
    var buttons = helpNowForm.querySelectorAll('input[type="radio"]');
    var otherSum = helpNowForm.querySelector('input[type="number"]');
    var currentValue;

    var getCurrentValue = function () {

      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].checked) {
          currentValue = buttons[i].value;
        }
      }

      if (otherSum.value != 0) {
        currentValue = otherSum.value;
      }
    }

    getCurrentValue();

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        otherSum.value = '';
        otherSum.removeAttribute('style');
        getCurrentValue();
      });
    });

    otherSum.addEventListener('focus', function () {
      buttons.forEach(function (button) {
        button.checked = false;
      });
      currentValue = '';
    })

    otherSum.addEventListener('change', function () {
      getCurrentValue();
    });


    if (submitLink) {
      submitLink.addEventListener('click', function (evt) {

        if (currentValue) {
          var currentAttr = submitLink.href;
          submitLink.href = currentAttr + '?amount=' + currentValue + '&recurring=1';
          form.reset();
        }
        else {
          evt.preventDefault();
          otherSum.style = 'box-shadow: inset 0 0 0 2px red';
        }

        localStorage.setItem('sum', currentValue);
      });
    }

    if (mobileSubmitLink) {
      mobileSubmitLink.addEventListener('click', function (evt) {

        if (currentValue) {
          var currentAttr = mobileSubmitLink.href;
          mobileSubmitLink.href = currentAttr + '?amount=' + currentValue + '&recurring=1';
          form.reset();
        }
        else {
          evt.preventDefault();
          otherSum.style = 'box-shadow: inset 0 0 0 2px red';
        }

        localStorage.setItem('sum', currentValue);
      });
    }
  }
})();

// переход с формы Помочь сейчас на Cтраницу пожертвования
(function () {
  var donationFormSum = document.querySelector('.donation-online__sum');

  if (localStorage.getItem('sum') && donationFormSum) {
    var donationFormRadios = donationFormSum.querySelectorAll('input[type="radio"]');
    var donationFormOtherSum = donationFormSum.querySelector('input[type="number"]');

    for (var i = 0; i < donationFormRadios.length; i++) {

      if (donationFormRadios[i].value === localStorage.getItem('sum')) {
        donationFormRadios[i].checked = true;
        donationFormOtherSum.value = '';
        break;
      } else {
        donationFormRadios[i].checked = false;
        donationFormOtherSum.value = localStorage.getItem('sum');
      }
    }
    localStorage.removeItem('sum');
  }
})();

// Смена изображений на странице история ребенка
(function () {
  let images = document.querySelectorAll('.child-gallery__link img');
  let imageBig = document.querySelector('.child-gallery__wrapper img');

  for (let image of images) {
    image.onclick = function () {

      let newSrc = image.getAttribute('src');
      imageBig.setAttribute('src', newSrc);
    }
  }
})();
