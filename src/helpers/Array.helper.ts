'use strict';

export function arrayUnique<T extends {}>(array: T[]): T[] {
    let j: { [key: string]: T } = {};
    array.forEach(function (v) {
        j[v.toString() + '::' + typeof v] = v;
    });
    return Object.keys(j).map(function (v) {
        return j[v];
    });
}
