import { Address } from './address.model';

export class Customer {
    
    CustomerId : number
    CustomerName : string;
    CustomerNum : number;
    CustomerEmail : string;
    Gender : string;
    Ratting : number;
    Addresses : Array<Address>;
    }