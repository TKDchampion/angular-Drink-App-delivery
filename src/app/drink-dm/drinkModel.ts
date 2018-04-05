export interface dataInfo {
    name: string;
    price: number;
    img: string;
}

export interface data1Info {
    name: string;
    price: number;
    addCheck?: boolean;
}

export enum Quantity {
    add = 0,
    less = 1
}