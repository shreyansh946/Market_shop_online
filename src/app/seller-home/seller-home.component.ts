import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  icon = faTrash; 
  edit = faEdit;
  
  productList:undefined|product[]

  productmessage:undefined|string;

  constructor(private product:ProductService){}

  ngOnInit(): void {  
    this.List()
  }


  deleteProduct(id:number)
  {
      console.warn("test id",id)

      this.product.deleteProduct(id).subscribe((result) =>{
      if(result)
      {
        this.productmessage = "product is deleted";
        this.List;
      }

      })

      setTimeout(() =>
      { this.productmessage=undefined},3000
      );
  }

  List()
  {
    this.product.productList().subscribe((results) =>
    { 

        console.warn(results)
        if(results)
        {
          this.productList = results;
        }
     
    })
  }


}

