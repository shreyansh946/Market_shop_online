import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
 
  polularproduct:undefined |product[]
  Trendyproduct:undefined |product[]

  constructor(private product:ProductService){}


  ngOnInit(): void {
    this.product.popularProduct().subscribe((data) =>{

      console.warn(data);
      this.polularproduct=data;
    });

    this.product.TrendyProducts().subscribe((data) =>{

      this.Trendyproduct=data;
    })
  }

}
