import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {DialogRef} from "@angular/cdk/dialog";

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

  constructor(private _fb: FormBuilder, private _employeeService: EmployeeService, private _dialogRef: DialogRef) {
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
      this._employeeService.addEmployee(this.employeeForm.value).subscribe({
        next: (value:any) => {
          alert('Employee added');
          this._dialogRef.close();
        },
        error: err => console.log(err)
      });
    }
  }

}
