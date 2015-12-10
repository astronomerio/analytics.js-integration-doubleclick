
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var foldl = require('foldl');
var each = require('each');
var pick = require('pick');
var keys = require('keys');

/**
 * Expose `DoubleClick` integration.
 */

var DoubleClick = module.exports = integration('DoubleClick')
  .readyOnInitialize()
  .option('advertiserId', '')
  .mapping('customVariables')
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
  var matches = this.events(track.event());
  console.log(matches);
};

DoubleClick.prototype.props = function(props){

  // var allowedProps = keys(this.)
  // var mappedProps = pick(
  //
  // var payload = foldl(function(acc, val, key) {
  //   if (key === 'revenue') {
  //     acc.value = revenue;
  //     return acc;
  //   }
  //
  //   // loop through prop keys
  //   // if if key exists in mappedVars.keys then
  //   // acc[mappedVar.value] = prop.value
  //
  //
  //   acc[key] = val;
  //   return acc;
  // }, {}, track.properties());
};

function track(/* cat, type, qty, cost, ord, */ props) {
  var flDiv=document.body.appendChild(document.createElement('div'));
  flDiv.setAttribute('id','DCLK_FLDiv1');
  flDiv.style.position='absolute';
  flDiv.style.top='0';
  flDiv.style.left='0';
  flDiv.style.width='1px';
  flDiv.style.height='1px';
  flDiv.style.display='none';
  flDiv.innerHTML='<iframe id="DCLK_FLIframe1" src="http://' + this.options.advertiserId + '.fls.doubleclick.net/activityi;src=' + this.options.advertiserId + ';type=' + this.options.type + ';cat=' + this.options.cat + '?" width="1" height="1" frameborder="0"><\/iframe>';
}
