(function (global) {
  System.config({
    map: {
      app: 'app',
      '@angular/core': 'dist/@angular/core/bundles/core.umd.js',
      '@angular/common': 'dist/@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'dist/@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'dist/@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'dist/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'dist/@angular/http/bundles/http.umd.js',
      '@angular/router': 'dist/@angular/router/bundles/router.umd.js',
      '@angular/forms': 'dist/@angular/forms/bundles/forms.umd.js',
      'rxjs': 'dist/rxjs',
    },
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js',
      },
      rxjs: {
        defaultExtension: 'js',
      },
    },
  });
})(this);
