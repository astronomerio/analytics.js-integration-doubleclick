
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');

/**
 * Expose `DoubleClick` integration.
 */

var DoubleClick = module.exports = integration('DoubleClick')
  .readyOnInitialize()
  .option('advertiserId', '')
  .mapping('pages')
  .mapping('events')
  .mapping('customVariables');

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
  var matches = this.events(track.event());
  console.log(matches);
  // var flDiv=document.body.appendChild(document.createElement('div'));
  // flDiv.setAttribute('id','DCLK_FLDiv1');
  // flDiv.style.position='absolute';
  // flDiv.style.top='0';
  // flDiv.style.left='0';
  // flDiv.style.width='1px';
  // flDiv.style.height='1px';
  // flDiv.style.display='none';
  // flDiv.innerHTML='<iframe id="DCLK_FLIframe1" src="http://' + this.options.advertiserId + '.fls.doubleclick.net/activityi;src=' + this.options.advertiserId + ';type=' + this.options.type + ';cat=' + this.options.cat + '?" width="1" height="1" frameborder="0"><\/iframe>';
};
