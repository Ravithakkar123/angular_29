export interface ICustomer{
    CustomerId : number;
    CustomerName : string;
    CustomerNum : number;
    CustomerEmail : string;
    Rating : number;
    AddressType : string;
    Street1 : string;
    Street2 : string;
    City : string;
    District : string;
    PinCode : number;
}

export class Customer {
      constructor(public CustomerName : string,
        public CustomerId : number,
       public CustomerNum : number,
       public CustomerEmail : string,
       public Ratting :number,
       public AddressType : string,
       public Street1 : string,
       public Street2 : string,
       public City : string,
       public District : string,
       public PinCode : string,
       
       
       
       
       ){

        }
}