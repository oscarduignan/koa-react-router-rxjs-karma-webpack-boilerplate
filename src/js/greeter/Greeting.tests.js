import React from 'react';
import render from 'react-test-tree';
import Greeting from './Greeting';

describe('Greeting', function(){

    it('to render "Hello!" when passed no parameters', function(){
        expect(render(<Greeting/>).innerText).toEqual('Hello!');
    });

    it('to render "Hello, Oscar!" when called with a recipient of "Oscar"', function(){
        expect(render(<Greeting recipient="Oscar"/>).innerText).toEqual('Hello, Oscar!');
    });

});