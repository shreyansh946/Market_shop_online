import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>();

  constructor(private http:HttpClient) { }


  addProduct(data:product)
  {
    console.warn("Service called")
    return this.http.post('http://localhost:3000/products',data);
  }

  productList()
  {
      return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id:number)
  {
   return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  GetProduct(id:string)
  {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product:product)
  {
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product)
  }

  popularProduct()
  {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3')
  }


  TrendyProducts()
  {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=5')
  }


  searchProducts(query: string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

localAddToCart(data:product)
{
    let cartData:any = [];
    let localCart = localStorage.getItem('localCart')
    if(!localCart)
    {
      localStorage.setItem('localCart',JSON.stringify([data]))
      this.cartData.emit([data])
    }
    else
    {
      cartData = JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData) );
      this.cartData.emit(cartData);
    }


}


removeitemfromcart(productid:number)
{
  let cartData = localStorage.getItem('localCart');

  if(cartData)
  {
    let items:product[]= JSON.parse(cartData);
    items = items.filter((item:product)=>productid != item.id)
    localStorage.setItem('localCart',JSON.stringify(items) );
    this.cartData.emit(items);
  }

}
  
  addToCart(cartData:cart)
  {
    return this.http.post('http://localhost:3000/cart',cartData);
  }


    getcartList(userid:cart)
    {
      return this.http.get<product[]>('http://localhost:3000/cart?userid='+userid,  {observe:'response'})
      .subscribe((result) => {

          console.warn(result)

          if(result && result.body)
          {
              this.cartData.emit(result.body)
          }

          
      })
    }


    removetocart(cartid:number|undefined)
    {
      return this.http.delete('http://localhost:3000/cart/'+cartid);
    }


    currentcart(){

          let userstore = localStorage.getItem('user');
          let userdata = userstore && JSON.parse(userstore);

          return this.http.get<cart[]>('http://localhost:3000/cart?userid='+userdata.id)
    }


    ordernow(data:order)
    {
      return this.http.post('http://localhost:3000/order',data);
    }


    orderlist()
    { 
      let userstore = localStorage.getItem('user');
      let userdata = userstore && JSON.parse(userstore);
      return this.http.get<order[]>('http://localhost:3000/order?userid='+userdata.id);
    }

    deleteCartItems(cartid:number)
    {
        return this.http.delete('http://localhost:3000/cart/' + cartid,{observe:'response'}).subscribe((result) =>{

          if(result)
          {
            this.cartData.emit([]);
          }

        })
    }

    Cancelorder(orderid:number)
    {
        return this.http.delete('http://localhost:3000/order/'+orderid);
    }
} 
