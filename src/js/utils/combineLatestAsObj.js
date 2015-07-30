import { Observable } from 'rx';
import mapValues from 'lodash/object/mapValues';

/*
    So if you have

        var a = observable where latest is 1
        var b = observable where latest is 2

    then combineLatestAsObject({a, b}) returns an observable with

        {a: 1, b: 2}
*/
export default function combineLatestAsObj(streamsObj) {
    var keys = Object.keys(streamsObj);
    var streams = keys.map(key => streamsObj[key]);

    return Observable.combineLatest(...streams, (...latestValues) => {
        return mapValues(streamsObj, (_, key) => {
            return latestValues[keys.indexOf(key)];
        });
    });
};
