import Rx from 'rx';
import { filters } from './actions';
import combineLatestAsObj from '../utils/combineLatestAsObj';

export default function(actions) {
    var recipient = new Rx.BehaviorSubject();

    actions.
        filter(filters.changeRecipient).
        subscribe(([action, value]) => {
            recipient.onNext(value);
        });

    return combineLatestAsObj({
        recipient
    });
};