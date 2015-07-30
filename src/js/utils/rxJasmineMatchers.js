import Rx from 'rx';

// RxJS Assertion
// https://github.com/Reactive-Extensions/RxJS/blob/master/examples/testing/jasmine/spec/SpecHelper.js

// WARNING: version rx@2.3.22 has a broken Rx.internals.isEqual
// https://github.com/Reactive-Extensions/RxJS/issues/457

var slice = Array.prototype.slice;

function areElementsEqual(actual, ...expected) {
    var result = { pass: true };

    if (expected.length !== actual.length) {
        result.pass = false;
    }

    for (var i=0; i < expected.length; i++) {
        if (!Rx.internals.isEqual(expected[i], actual[i])) {
            result.pass = false;
        }
    }

    if (!result.pass) {
        result.message = 'expected ' + actual + ' to equal ' + expected;
    }

    return result;
}

beforeEach(function() {
    jasmine.addMatchers({
        toHaveEqualElements: function() {
            return {
                compare: areElementsEqual
            };
        }
    });
});
