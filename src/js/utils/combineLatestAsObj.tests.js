import Rx from 'rx';
import combineLatestAsObj from './combineLatestAsObj';

// Struggled to get this working! Lots of issues - seems to be bugs in current version so had
// to roll back my Rx version to 2.3.23 and override define for rx/dist/rx.testing.js
require('rx/dist/rx.time');
require('rx/dist/rx.virtualtime');
require('imports?define=>false!rx/dist/rx.testing');

var TestScheduler = Rx.TestScheduler,
    onNext = Rx.ReactiveTest.onNext;

require('./rxJasmineMatchers');

describe('combineLatestAsObj', function(){

    it('should combine the latest from each stream as an object', function(){
        var scheduler = new TestScheduler();

        var a = scheduler.createColdObservable(
            onNext(100, 1),
            onNext(200, 3),
            onNext(300, 5)
        );

        var b = scheduler.createColdObservable(
            onNext(50,  2),
            onNext(250, 4)
        );

        var results = scheduler.startWithCreate(function() {
            return combineLatestAsObj({a, b});
        });

        // subscribe happens at 200
        expect(results.messages).toHaveEqualElements(
            onNext(300, {a:1, b:2}),
            onNext(400, {a:3, b:2}),
            onNext(450, {a:3, b:4}),
            onNext(500, {a:5, b:4})
        );
    });

});