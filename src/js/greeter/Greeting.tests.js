import React from 'react';
import render from 'react-test-tree';
import Greeting from './Greeting';

describe('Greeting', function(){

    it('to render "Hello!" when passed no parameters', function(){
        expect(render(<Greeting/>).innerText).to.equal('Hello!');
    });

});