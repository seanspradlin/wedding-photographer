'use strict';

const ImagePreview = Vue.extend({
  template: '#image-preview',
});

Vue.component('image-preview', ImagePreview);

new Vue({
  el: '#app',
});

