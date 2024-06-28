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