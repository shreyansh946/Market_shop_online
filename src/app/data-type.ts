export interface SignUp
{
    name: String,
    password: String,
    email: String
}


export interface login
{
    email:String,
    password: String
}

export interface product
{
    name:string,
    price:number,
    Category:string,
    color:string,
    description:string,
    image:string,
    id:number
    quantity:undefined | number
    productid:undefined|number
}


export interface cart{


    name:string,
    price:number,
    Category:string,
    color:string,
    description:string,
    image:string,
    id:number|undefined
    quantity:undefined | number
    userid:number,
    productid:number
}


export interface priceSummary{

        price:number,
        discount:number,
        tax:number,
        delivery:number,
        total:number
}


export interface order{

    email:string,
    address:string,
    contact:string,
    TotalPrice:number,
    userid:number
    id:number|undefined
}