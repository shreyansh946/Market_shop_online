import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order, product } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderdata:order[]|undefined

  constructor(private product:ProductService){}

  ngOnInit(): void {

      this.getOrder();
    
  }

  Cancelorder(orderid:number|undefined){

      orderid && this.product.Cancelorder(orderid).subscribe((result) =>{

          this.getOrder();
      })
  }

  getOrder()
  {
    this.product.orderlist().subscribe((result) =>{

      this.orderdata=result
  })

} 

}

