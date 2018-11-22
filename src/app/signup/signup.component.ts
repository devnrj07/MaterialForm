import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  validation_messages = {
    'fullname': [
      { type : 'pattern', message : 'No special characters are allowed'},
      { type: 'required', message: 'Full name is required' },
    ],

    'empid':[
      {type : 'pattern', message : 'No Special characters allowed'},
      {type : 'required', message : 'Employee Id is required'},
      {type : 'maxlength', message : 'Employee ID cannot be more than 10 characters'}
    ]
    };

    account_validation_messages = { 
      'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Enter a valid email' }
      ],
      'confirm_password': [
        { type: 'invalid', message: 'Password mismatch' }
      ],
      'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'minlength', message: 'Password must be at least 5 characters long' },
        { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
      ],
      'terms': [
        { type: 'pattern', message: 'You must accept terms and conditions' }
      ]
    };


  constructor(private FB: FormBuilder) { }

  userDetailsForm = this.FB.group({
    fullname: ['', [Validators.required, Validators.pattern('^([a-z]|[A-Z]){4,8}$')]],
    email: ['', [  Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
    confirm_password: ['', this.Validpass],
    empid : ['', [Validators.required, Validators.pattern('^([a-z]|[A-Z]){4,8}$'),], Validators.maxLength(10)],
    terms: new FormControl(false, Validators.pattern('true'))
  });

  ngOnInit() {
  }

  Validpass(abstract: AbstractControl) {
    if (abstract && (abstract.value !== null || abstract.value !== undefined)) {
    const cnfpass = abstract.value;

    const pass = abstract.root.get('password'); // -> root->value
    if (pass) {
        const passValue = pass.value;
        if (passValue !== cnfpass || passValue === '') {
            return {
                isError: true
            };
        }
    }
}

return null;
}

}
