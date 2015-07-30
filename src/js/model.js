import Rx from 'rx';
import combineLatestAsObj from './utils/combineLatestAsObj';
import greeterModel from './greeter/model';

export default function(actions) {
    return combineLatestAsObj({
        greeter: greeterModel(actions)
    });
};