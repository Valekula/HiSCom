(function (app) {
  'use strict';

  app.registerModule('uploader');
  app.registerModule('uploader.services');
  app.registerModule('uploader.routes', ['ui.router']);
})(ApplicationConfiguration);
