

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    
  
    ReactiveFormsModule
  ],
})
export class AppModule { }





@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
 
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [''],
      gender: [''],
      height: [''],
      weight: [''],
      objective: [''],
      nutritionalCounseling: ['']
    });
  }

  onSubmit(): void {
    console.log(this.contactForm.value);
  }
}

    
    
 
    

 
  
  


