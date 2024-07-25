import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

    productData: undefined|product
    quantity:number=1;
    productquantity:number=1;
    removeCart = false
    cartdata:product|undefined

  constructor(private activeRoute:ActivatedRoute, private product:ProductService){}

  ngOnInit(): void {
        let productid= this.activeRoute.snapshot.paramMap.get('productid');
        console.warn(productid) 

        productid && this.product.GetProduct(productid).subscribe((result) =>{

          console.warn(result)
          this.productData= result;

          let cartData = localStorage.getItem('localCart');
          if(productid && cartData)
          {
            let items = JSON.parse(cartData)
            items = items.filter((item:product) => productid == item.id.toString())

            if(items.length !==0)
            {
              this.removeCart = true
            }
            else
            {
              this.removeCart = false
            }
          }

            let user = localStorage.getItem('user');

            if(user)
            {
              let userid = user && JSON.parse(user).id;
              this.product.getcartList(userid);
              this.product.cartData.subscribe((result) =>{

                 let items =  result.filter((item:product) =>productid?.toString() == item.productid?.toString)

                 if(items.length)
                 {  
                  this.cartdata =items[0];
                  this.removeCart = true;
                 }

              })
            }
        

        })
  }


  handleQuantity(val:string){

      if(this.productquantity<20 && val==='plus')
      {
            this.productquantity = this.productquantity+1;
      }else if(this.productquantity>1 && val==='min'){
        this.productquantity = this.productquantity-1;
      }
  }


  AddToCart()
  {
    if(this.productData)
    {
      this.productData.quantity = this.productquantity;
      if(!localStorage.getItem('user'))
      {
        console.warn(this.productData);
        this.product.localAddToCart(this.productData)
        this.removeCart = true
      }else
      {
        console.warn("user is login");
        let user=localStorage.getItem('user');
        let userid = user && JSON.parse(user).id;
        console.warn(userid)
        let cartData:cart= {

          ...this.productData,
          userid,
          productid:this.productData.id,
        }

        delete cartData.id;

        console.warn(cartData)

        this.product.addToCart(cartData).subscribe((result) =>{
          
          if(result)
          {
                this.product.getcartList(userid);
                this.removeCart=true
          }

        })



      }
      
    }
  }


  RemoveToCart(productid:number){

    if(!localStorage.getItem('user')){
      
      this.product.removeitemfromcart(productid)
  
    }
    else{
      let user=localStorage.getItem('user');
      let userid = user && JSON.parse(user).id;
        this.cartdata &&  this.product.removetocart(this.cartdata.id).subscribe((result) =>{

              if(result)
              {
                this.product.getcartList(userid)
              }
        })
        this.removeCart = false
    }
      
  }
}
