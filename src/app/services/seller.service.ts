import { EventEmitter, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SignUp, login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService{

   isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isloginError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }
  
  userSignUp(data:SignUp)
  {
      this.http.post('http://localhost:3000/seller', data ,{observe:'response'})
      .subscribe((result)=> {

        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);

        console.warn('result',result)

      });
    }

    reloadseller()
    {
      if(localStorage.getItem('seller')){
        this.isSellerLoggedIn.next(true);
        this.router.navigate([ 'seller-home']);
      }
    }


    userLogin(data:login)
    {   
        console.warn(data)
        this.http.get(`http://localhost:3000/seller?Email=tony@gmail.com&password=12345`,
        {observe:'response'}).subscribe((result: any) => {
            console.warn(result)
            if(result && result.body && result.body.length){
             console.warn("login succeesfully");
             localStorage.setItem('seller',JSON.stringify(result.body));
             this.router.navigate(['seller-home']);
     
              // console.warn(result);
              // console.warn("login succes");
            }else{
              console.warn("login failed");
              this.isloginError.emit(true)
            }
      

        })
      
    }

}
