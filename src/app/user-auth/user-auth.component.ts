import { Component, OnInit } from '@angular/core';
import { SignUp, cart, login, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{

  showlogin:boolean=true;
  authError:string ="";

  constructor(private  user:UserService, private product:ProductService ){}

  ngOnInit(): void {
    this.user.userAuthreload(); 
      
  }


  signUp(data:SignUp)
  {
      this.user.userSingup(data)
  }

  login(data:login)
  {
    this.user.userlogin(data)
    this.user.InvalidUserAuth.subscribe((result) =>{

      console.warn("apple",result)
      if(result)
      {
          this.authError ="User not found";
      }
      else
      {
        this.localCartTORemoteCart()
      }
    })


  }

  opensignUp(){
      this.showlogin = false;
  }

  openlogin(){
    this.showlogin= true;

  }


  localCartTORemoteCart()
  {
        let data = localStorage.getItem('locaLCart');
        let user = localStorage.getItem('user');
        let userid = user && JSON.parse(user).id;
        if(data)
        {
        let cartdatalist:product[] = JSON.parse(data);
     
           
          cartdatalist.forEach((product:product,index) => {

            let cartdata :cart ={
                ...product,
              productid:product.id,
              userid
            };

            delete cartdata.id;
           setTimeout(() => {
            this.product.addToCart(cartdata).subscribe((result)=>{

              if(result)
              {
                  console.warn("item stored in DB");
              }

            } )


            if(cartdatalist.length === index+1 )
            {
              localStorage.removeItem('localCart')
            }
           }, 500);

          });

      }

       setTimeout(() => {
        this.product.getcartList(userid)
       },2000);

  }


}