import React from 'react';
import { Route } from 'react-router';
import HelloWorld from './views/HelloWorld';

export default (
    <Route path="/" handler={HelloWorld}/>
);
