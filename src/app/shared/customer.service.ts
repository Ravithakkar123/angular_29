import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
      readonly url: string = "https://localhost:44330/api";
      constructor(private http : HttpClient){
      }
       formData : Customer;
    
   GetCustomer() : Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url + '/customer');
    }
    
 postCustomer(formData : Customer)  : Observable<Customer>
  {
        console.log(formData);
     
      return this.http.post<Customer>(this.url+ '/customer' ,formData,   { headers :  new HttpHeaders({ 'Content-Type': 'application/json' })})
        .pipe(
              map(() =>formData),
              catchError(this.handleError) );     
  }
  
  handleError(error : HttpErrorResponse) {
      return throwError(console.error());
      }

   DeleteCustomer(id : number) : Observable<{}>
   {
     return this.http.delete(this.url +"/customer/"+ id);
   }
  

}