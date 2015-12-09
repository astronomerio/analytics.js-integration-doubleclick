
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');

/**
 * Expose `DoubleClick` integration.
 */

var DoubleClick = module.exports = integration('DoubleClick')
  .readyOnInitialize()
  .option('advertiserId', '');

/**
 * Initialize DoubleClick.
 *
 * @param {Facade} page
 */

DoubleClick.prototype.initialize = function(page){
  this.ready();
  console.log(page);
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
 * Track an event.
 *
 * @param {Facade} track
 */

DoubleClick.prototype.track = function(track){
    console.log(track);
};
