import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { NgForm, ValidatorFn, AbstractControl, FormArray, Form } from '@angular/forms';
import { Customer } from 'src/app/shared/customer.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { zip } from 'rxjs';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('customerEmail');
  const confirmControl = c.get('confirmEmail');
  if (emailControl.value == confirmControl.value) {
    return null;
  }
  return { 'match': true };
}

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

@Component({
  templateUrl: './Addcustomer.component.html'
})

export class AddCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer = new Customer();
  condition = false;
  isButtonVisible = true;
  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }
  constructor(private customerservice: CustomerService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.customerForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      customerNum: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')] ],     
      customerEmail: ['', [Validators.required, Validators.email]],
      Gender: '',
      ratting: [null, ratingRange(1, 5)],
      addresses: this.fb.array([this.buildAddress()])
    });
  }

  resetAddress(i) {
    this.addresses.removeAt(i);
  }

  onclick() {
    
    this.customerservice.postCustomer(this.customerForm.value).subscribe();;
        this.customerForm.reset();
      }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }


  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: ['', [Validators.required]],
      street1: ['', [Validators.required]],
      street2: [''],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
      PinCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]+')]]
    });
  }
}
