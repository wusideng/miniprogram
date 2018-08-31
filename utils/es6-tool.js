//////////////////////
// https://github.com/es-shims/es6-shim

'./implementation'
'use strict';

var ES = require('es-abstract/es7');
var has = require('has');
var bind = require('function-bind');
var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);

module.exports = function values(O) {
  var obj = ES.RequireObjectCoercible(O);
  var vals = [];
  for (var key in obj) {
    if (has(obj, key) && isEnumerable(obj, key)) {
      vals.push(obj[key]);
    }
  }
  return vals;
};
//////////////////////
'polyfill'
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
  return typeof Object.values === 'function' ? Object.values : implementation;
};

//////////////////////
'shim'
'use strict';

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimValues() {
  var polyfill = getPolyfill();
  define(Object, { values: polyfill }, {
    values: function testValues() {
      return Object.values !== polyfill;
    }
  });
  return polyfill;
};
//////////////////////


'use strict';

var define = function values(O) {
  var obj = ES.RequireObjectCoercible(O);
  var vals = [];
  for (var key in obj) {
    if (has(obj, key) && bind.call(Function.call, Object.prototype.propertyIsEnumerable)(obj, key)) {
      vals.push(obj[key]);
    }
  }
  return vals;
};

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var polyfill = getPolyfill();

define(polyfill, {
  getPolyfill: getPolyfill,
  implementation: implementation,
  shim: shim
});

module.exports = polyfill;