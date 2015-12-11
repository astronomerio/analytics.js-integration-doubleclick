'use strict';

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var foldl = require('foldl');
var each = require('each');
var keys = require('keys');
var extend = require('extend');
var includes = require('includes');
var map = require('map');

/**
 * Expose `DoubleClick` integration.
 */

var DoubleClick = module.exports = integration('DoubleClick')
  .assumesPageview()
  .readyOnInitialize()
  .option('advertiserId', '')
  .option('customVariables')
  .mapping('pages')
  .mapping('events');

/**
 * Initialize DoubleClick.
 *
 * @param {Facade} page
 */

DoubleClick.prototype.initialize = function(page) {
  console.log(page);
  this.ready();
};

/**
 * Has the DoubleClick library been loaded yet?
 *
 * @return {Boolean}
 */

DoubleClick.prototype.loaded = function() {
  return true;
};

/**
 * Track a page view.
 *
 * @param {Facade} page
 */

DoubleClick.prototype.page = function(page) {
  var self = this;
  var matches = this.pages(page.url());
  each(function(pixel) {
    self.fire(pixel);
  }, matches);
};

/**
 * Track an event.
 *
 * @param {Facade} track
 */

DoubleClick.prototype.track = function(track) {
  var self = this;
  var matches = this.events(track.event());
  each(function(pixel) {
    self.fire(pixel, self.props(track));
  }, matches);
};

/**
 * Completed order.
 */

DoubleClick.prototype.completedOrder = function(track) {
  var self = this;
  var matches = this.events(track.event());
  each(function(pixel) {
    self.fire(pixel, self.props(track,
        track.orderId(), track.quantity(), track.revenue()));
  }, matches);
};

/**
 * Create properties for tag.
 */

DoubleClick.prototype.props = function(track, ord, qty, cost) {
  // Defaults
  var payload = {};
  payload.src = this.options.advertiserId;

  // E-commerce
  if (ord) payload.ord = ord;
  if (qty) payload.qty = qty;
  if (cost) payload.cost = cost;

  // Cachebuster if needed
  if (!payload.ord) {
    var axel = Math.random() + '';
    var a = axel * 10000000000000000;
    payload.ord = a;
  }

  // Reduce to only allowed props with mapped uVars
  var customVars = this.options.customVariables;
  var customs = foldl(function(acc, val, key) {
    // If this key has a mapped customVariable.
    if (includes(key, keys(customVars))) {
      var uVar = customVars[key];
      acc[uVar] = val;
    }

    return acc;
  }, {}, track.properties());

  return extend(payload, customs);
};


/**
 * Stringify the props.
 */

DoubleClick.prototype.params = function(props) {
  return map(function(val, key) {
    return val ? key + '=' + val : key;
  }, props).join(';') + '?';
};

/**
 * Fire the pixel.
 */

DoubleClick.prototype.fire = function(pixel, props) {
  var advertiserId = this.options.advertiserId;
  var params = this.params(extend(pixel, props));
  var src = 'http://' + advertiserId + '.fls.doubleclick.net/activityi;' + params;

  var flDiv = document.body.appendChild(document.createElement('div'));
  flDiv.setAttribute('id', 'DCLK_FLDiv1');
  flDiv.style.position = 'absolute';
  flDiv.style.top = '0';
  flDiv.style.left = '0';
  flDiv.style.width = '1px';
  flDiv.style.height = '1px';
  flDiv.style.display = 'none';
  flDiv.innerHTML = '<iframe id="DCLK_FLIframe1" src="' + src + '" width="1" height="1" frameborder="0"><\/iframe>';
};
