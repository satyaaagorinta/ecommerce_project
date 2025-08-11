export interface Product{
    id?: string;
    title:string;
    category:string;
    price:number;
    image:string;
    description:string;
    quantity?:number
}

export interface AddRemoveCartEvent{
    productId:string;
    quantity:number;
    eventState: CartEventState;
}

export enum CartEventState{
    Add = 'add',
    Remove = 'remove'
}
export enum  ProductOperation{
    Select = 'select',
    AddNew = 'addNew',
    Update = 'update',
}

export enum DisplayProductForm{
    None = 'none',
    True = 'true',
    False = 'false'
}
