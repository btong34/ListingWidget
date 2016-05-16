import jsdom from 'jsdom';
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'

jsdom.env({
  html: '<html><body></body></html>',
  done: function(errors, window) {
    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;
  }
});

chai.use(chaiEnzyme());