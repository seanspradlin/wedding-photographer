'use strict';

const ImagePreview = Vue.extend({
  template: '#image-preview',
});

Vue.component('image-preview', ImagePreview);

new Vue({
  el: '#app',
});

$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function() {
    FB.init({
      appId: '157732058002990',
      version: 'v2.7',
    });
    FB.getLoginStatus(function(response) {
      $.post('api/auth/facebook', response.authResponse, 'json')
        .then(profile => {
          console.log(profile);
        })
        .fail(error => {
          console.error(error);
        });
    });
  });
});

function onSignIn(googleUser) {
  const token = googleUser.getAuthResponse().id_token;
  $.post('api/auth/google', { accessToken: token }, 'json')
    .then(profile => {
      console.log(profile);
    })
    .fail(error => {
      console.error(error);
    });
}
