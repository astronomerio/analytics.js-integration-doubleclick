var Analytics = require('@astronomerio/analytics.js-core').constructor;
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var DoubleClick = require('../lib');

describe('DoubleClick', function() {
  var analytics;
  var doubleClick;
  var options = {
    advertiserId: 1234567,
    cat: 'pixelCat',
    type: 'pixelType',
    customVariables: {
      name: 'u1',
      email: 'u2'
    },
    events: {
      'Completed Order': {
        cat: 'eventCat',
        type: 'eventType'
      }
    }
  };

  beforeEach(function() {
    analytics = new Analytics();
    doubleClick = new DoubleClick(options);
    analytics.use(DoubleClick);
    analytics.use(tester);
    analytics.add(doubleClick);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    doubleClick.reset();
    sandbox();
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.stub(doubleClick, 'fire');
      analytics.initialize().page();
    });

    describe('#initialize', function() {
      it('should have called fire on first page', function() {
        analytics.called(doubleClick.fire, { cat: 'pixelCat', type: 'pixelType' });
      });
    });

    describe('#track', function() {
      it('should not call fire for unmapped event', function() {
        analytics.stub(doubleClick, 'fire');
        analytics.track('Some other event');
        analytics.didNotCall(doubleClick.fire);
      });

      it('should call track once for mapped event', function() {
        analytics.stub(doubleClick, 'fire');
        analytics.track('Completed Order');
        analytics.called(doubleClick.fire, { cat: 'eventCat', type: 'eventType' });
      });
    });

    describe('#props', function() {
      it('should merge order information to props', function() {
        var props = doubleClick.props({ name: 'schnie', email: 'schnie@astronomer.io' }, 12345, 2, 5.00);
        analytics.deepEqual(props, {
          src: 1234567,
          ord: 12345,
          qty: 2,
          cost: 5,
          u1: 'schnie',
          u2: 'schnie@astronomer.io'
        });
      });

      it('should add an ord prop if none present', function() {
        var props = doubleClick.props();
        analytics.assert(props.ord);
      });

      it('should not merge unmapped props', function() {
        var props = doubleClick.props({ age: 99 });
        analytics.equal(props.age, undefined);
      });
    });

    describe('#params', function() {
      it('creates joined query string with semicolons', function() {
        var props = doubleClick.props({ name: 'schnie' }, 12345);
        var qs = doubleClick.params(props);
        analytics.equal(qs, 'src=1234567;ord=12345;u1=schnie');
      });
    });
  });
});
