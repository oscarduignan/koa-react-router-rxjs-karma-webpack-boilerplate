import Rx from 'rx';
import combineLatestAsObj from '../utils/combineLatestAsObj';
import model from './model';
import { actions as greeter } from './actions';

// Struggled to get this working! Lots of issues - seems to be bugs in current version so had
// to roll back my Rx version to 2.3.23 and override define for rx/dist/rx.testing.js
require('rx/dist/rx.time');
require('rx/dist/rx.virtualtime');
require('imports?define=>false!rx/dist/rx.testing');

var TestScheduler = Rx.TestScheduler,
    onNext = Rx.ReactiveTest.onNext;

require('../utils/rxJasmineMatchers');

describe('model', function(){

    it('when no actions, the latest should be an object with an undefined recipient', function(){
        var scheduler = new TestScheduler();

        var actions = scheduler.createColdObservable();

        var results = scheduler.startWithCreate(function() {
            return model(actions);
        });

        expect(results.messages).toHaveEqualElements(
            onNext(200, {recipient: undefined})
        );
    });

    it('when a changeRecipient action is present the latest should be the last recipient', function(){
        var scheduler = new TestScheduler();

        var actions = scheduler.createColdObservable(
            onNext(0, greeter.changeRecipient('oscar')),
            onNext(200, greeter.changeRecipient('oscar duignan'))
        );

        var results = scheduler.startWithCreate(function() {
            return model(actions);
        });

        expect(results.messages).toHaveEqualElements(
            onNext(200, {recipient: "oscar"}),
            onNext(300, {recipient: "oscar duignan"})
        );
    });

});