import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent {

  employeeForm!: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Postgraduate',
  ];

  constructor(private _fb: FormBuilder) {
    this.employeeForm = this._fb.group({
      firstname:'',
      surname: '',
      email:'',
      birthdate:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:''
    });
  }

  onFormSubmit() {
    if(this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }
  }

}
