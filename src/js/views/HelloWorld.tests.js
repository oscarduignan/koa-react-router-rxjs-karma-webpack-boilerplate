import React from 'react';
import render from 'react-test-tree';
import HelloWorld from './HelloWorld';

describe('HelloWorld', function(){

    it('to render "Hello world!"', function(){
        expect(render(<HelloWorld/>).innerText).to.equal('Hello world!');
    });

});