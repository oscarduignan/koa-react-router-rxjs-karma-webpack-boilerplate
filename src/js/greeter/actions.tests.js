import { actions, filters } from './actions';

describe('changeRecipient', function(){

    it('action should create an array with a symbol and the new recipient', function(){
        var action = actions.changeRecipient("oscar");
        expect(typeof action[0] === 'symbol').toBeTruthy();
        expect(action[1]).toEqual("oscar");
    });

    it('action should match the filter', function(){
        expect(filters.changeRecipient(actions.changeRecipient("oscar"))).toBeTruthy();
    });

    it('action should not throw an error when no recipient is supplied', function() {
        var action = actions.changeRecipient();
        expect(typeof action[0] === 'symbol').toBeTruthy();
        expect(action[1]).toEqual(undefined);
    });

    it('filter should not match incorrect actions', function(){
        expect(filters.changeRecipient([])).toBeFalsy();
    });

});