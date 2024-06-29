import {RequestInitWithParams} from "@/logic/data";

export function getResponseSync(url: string): string {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
}

export function reconstructUrl(input: URL | RequestInfo, callback: (URL) => URL | void): RequestInfo | URL {
    let u = new URL((input instanceof Request) ? input.url : input);
    const result = callback(u)
    if (result) u = result
    if (input instanceof Request) return { url: u, ...input }
    return u
}

export function fetchWithParams(input: URL | RequestInfo, init?: RequestInitWithParams): Promise<Response> {
    return fetch(reconstructUrl(input, u => {
        u.search = new URLSearchParams(init?.params ?? {}).toString()
    }), init)
}

export function gShuffle(array: Array<any>): any[] {
    let currentIndex = array.length
    const arr = array.slice()

    while (currentIndex > 0) {
        const randomIndex = Math.floor(gaussian() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}

export function gaussian(): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return gaussian() // resample between 0 and 1
    return num
}