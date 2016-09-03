'use strict';
var $file = $('#file');
var $picture = $('#picture');
var $check = $('#check');

$file.on('change', function (e) {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $picture.attr('src', e.target.result);
    }
    reader.readAsDataURL(this.files[0]);
  }
});

