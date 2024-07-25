import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  TotalPrice:number|undefined
  cartdata:cart[]|undefined;
  OrderMessage:string|undefined
  constructor(private product:ProductService,private router:Router){}

    ngOnInit(): void {
      this.product.currentcart().subscribe((result) =>{
        console.warn(result)
        let price=0;
        this.cartdata=result
        result.forEach((item)=>{
          if(item.quantity){  
            
            price=price+ (+item.price* +item.quantity);
          }
        
        });
        this.TotalPrice = price+(price/10)+100-(price/10);
        console.warn(this.TotalPrice) 
      });
    }

    ordernow(data:{email:string,address:string,contact:string})
    {
          let user = localStorage.getItem('user')
          let userid = user && JSON.parse(user).id;

          if(this.TotalPrice)
          {
              let orderdata:order = {
                ...data,
                TotalPrice: this.TotalPrice,
                userid,
                id:undefined
              }

              this.cartdata?.forEach((item) =>{

                setTimeout(() => {
                   
                    item.id &&  this.product.deleteCartItems(item.id)
                }, 800  );
              })

              this.product.ordernow(orderdata).subscribe((result) =>{

                if(result)
                {
                  //alert('order placed');
                  this.OrderMessage ="Your order has been placed";
                 
                  setTimeout(() => {
                    this.router.navigate(['/my-order'])
                    this.OrderMessage=undefined;
                  }, 5000);

                }

              })
          }
        
    }
}
