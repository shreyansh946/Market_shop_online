import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {


  productdata: undefined|product
  productmessage:undefined|string;

  constructor(private route:ActivatedRoute,private product:ProductService){}

  ngOnInit(): void {

      let productid = this.route.snapshot.paramMap.get('id') 
      console.warn(productid)
      productid &&  this.product.GetProduct(productid).subscribe((data) =>
      {
        console.warn(data)
        this.productdata=data
      })
  }

  submit(data:any){

   
    if(this.productdata)
    {
      data.id = this.productdata.id;
    }
    this.product.updateProduct(data).subscribe((result) =>{
      if(result)
      {
            this.productmessage ="Product has updated"
      }
    })

    setTimeout(()=> {
      this.productmessage = undefined
    },3000)
    console.warn(data)
  } 

  

}
