import {cryptoData, cryptoAssets} from './data';

export function fakeFetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoData);
        }, 500)
    })
}

export function fakeFetchAssets() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets);
        }, 500)
    })
}