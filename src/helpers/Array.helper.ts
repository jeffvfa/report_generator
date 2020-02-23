'use strict';
export function arrayUnique<T extends {}>(array: T[], comparison: (arg0: T, arg1: T) => boolean): T[] {
    let unique = [];
    for (let i = 0; i < array.length; i++) {
        let exists = false;
        for (let j = 0; j < unique.length; j++) {
            if (comparison(array[i], unique[j])) {
                exists = true;
                break;
            }
        }
        if (!exists) unique.push(array[i]);
    }
    return unique;
}

export function arrayRemoveItem<T extends {}>(array: T[], item: any): boolean {
    let index = (<Array<any>>array).indexOf(item);
    if (index >= 0) {
        (<Array<any>>array).splice(index, 1);
        return true;
    }
    return false;
}