export interface Persecution {
    known: boolean,
    evidences: string[]
}

export interface Content {
    names: string[],
    sites: string[],
    locations: string[],
    persecution: Persecution,
    sources: string[],
    checked: boolean
}

export interface RequestInitWithParams extends RequestInit {
    params?: { [index: string]: string }
}

export interface Data{
    $schema: string,
    content: Content[]
}