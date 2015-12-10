
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var foldl = require('foldl');
var each = require('each');
var pick = require('pick');
var keys = require('keys');
var extend = require('extend');
var includes = require('includes');

/**
 * Expose `DoubleClick` integration.
 */

var DoubleClick = module.exports = integration('DoubleClick')
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

DoubleClick.prototype.initialize = function(page){
  this.ready();
};

/**
 * Has the DoubleClick library been loaded yet?
 *
 * @return {Boolean}
 */

DoubleClick.prototype.loaded = function(){
  return true;
};

/**
 * Track a page view.
 *
 * @param {Facade} page
 */

DoubleClick.prototype.page = function(page){
  console.log(page);
};

/**
 * Track an event.
 *
 * @param {Facade} track
 */

DoubleClick.prototype.track = function(track){
  var self = this;
  var matches = this.events(track.event());
  each(function(match) {
    console.log('firing', match);
    self.fire(match, track.properties());
  }, matches);
};

/* cat, type, qty, cost, ord, */
DoubleClick.prototype.props = function(match, props){
  var customVars = self.options.customVariables;

  return foldl(function(acc, val, key) {
    // If this key has a mapped customVariable.
    if (includes(key, keys(customVars))) {
      var uVar = customVars[key];
      acc[uVar] = val
    }

    return acc;
  }, {}, props);
};

DoubleClick.prototype.fire = function(match, props) {
  var params = extend(match, this.props(props));
  return console.log(params);

  var flDiv = document.body.appendChild(document.createElement('div'));
  flDiv.setAttribute('id','DCLK_FLDiv1');
  flDiv.style.position = 'absolute';
  flDiv.style.top = '0';
  flDiv.style.left = '0';
  flDiv.style.width = '1px';
  flDiv.style.height = '1px';
  flDiv.style.display = 'none';
  flDiv.innerHTML = '<iframe id="DCLK_FLIframe1" src="http://' + this.options.advertiserId + '.fls.doubleclick.net/activityi;src=' + this.options.advertiserId + ';type=' + this.options.type + ';cat=' + this.options.cat + '?" width="1" height="1" frameborder="0"><\/iframe>';
}
