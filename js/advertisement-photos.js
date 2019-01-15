'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PREVIEW_SIZE = 70;

  var fileChooserElement = document.querySelector('.ad-form__input');
  var previewElement = document.querySelector('.ad-form__photo');

  var createPreviewImage = function (dataUrl) {
    var previewImage = document.createElement('img');
    previewImage.src = dataUrl;
    previewImage.width = PREVIEW_SIZE;
    previewImage.height = PREVIEW_SIZE;

    return previewImage;
  };

  var removeAllImages = function () {
    while (previewElement.firstChild) {
      previewElement.firstChild.remove();
    }
  };

  var initPreviewElement = function () {
    removeAllImages();
    previewElement.style.width = 'auto';
    previewElement.style.height = 'auto';
  };

  fileChooserElement.addEventListener('change', function () {
    var previewElementInitiated = false;
    var files = fileChooserElement.files;

    [].forEach.call(files, function (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        if (!previewElementInitiated) {
          initPreviewElement();
          previewElementInitiated = true;
        }

        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var previewImage = createPreviewImage(reader.result);
          previewElement.appendChild(previewImage);
        });

        reader.readAsDataURL(file);
      }
    });

  });

  window.advertisementPhoto = {
    removeAllImages: removeAllImages
  };

})();
