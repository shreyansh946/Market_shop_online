import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartdata:cart[] |undefined;
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }
    constructor(private product:ProductService,private route:Router){}

    ngOnInit(): void {
        this.loadDetails();
    }


    loadDetails()
    {
      this.product.currentcart().subscribe((result) =>{
        console.warn(result)
        this.cartdata=result
        let price=0;
        result.forEach((item)=>{
          if(item.quantity){  
            
            price=price+ (+item.price* +item.quantity);
          }
        
        });
        this.priceSummary.price=price;
        this.priceSummary.discount =price/10;
        this.priceSummary.tax=price/10;
        this.priceSummary.delivery=100;
        this.priceSummary.total = price+(price/10)+100-(price/10);
        console.warn(this.priceSummary)

        if(!this.cartdata.length)
        {
          this.route.navigate(['/']);
        }

      });
    }

    checkout()
    {
      this.route.navigate(['/check-out'])
    }

    removeToCart(cartid:number|undefined)
    {
          this.cartdata && this.product.removetocart(cartid).subscribe(() =>{

              this.loadDetails();
          })
    }

}
