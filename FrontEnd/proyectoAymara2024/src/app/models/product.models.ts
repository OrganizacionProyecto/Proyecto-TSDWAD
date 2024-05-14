export interface IProduct {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    Category;
    image:       string;
    rating:      Rating;
}

export enum Category {
    SuplementoDietario = "suplemento dietario",

}
export interface Rating {
    rate:  number;
    count: number;
}