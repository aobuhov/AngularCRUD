import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {

  employeeForm!: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Postgraduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _dialogRef: MatDialogRef<EmployeeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService: CoreService
  ) {

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
ngOnInit() {
    this.employeeForm.patchValue(this.data);
}

  onFormSubmit() {
    if(this.employeeForm.valid) {
      if(this.data) {
        this._employeeService.updateEmployee(this.data.id, this.employeeForm.value).subscribe({
          next: (value:any) => {
            this._coreService.openSnackBar('Employee updated');
            this._dialogRef.close(true);
          },
          error: err => console.log(err)
        });
      } else {
        this._employeeService.addEmployee(this.employeeForm.value).subscribe({
          next: (value:any) => {
            this._coreService.openSnackBar('mployee added');
            this._dialogRef.close(true);
          },
          error: err => console.log(err)
        });
      }

    }
  }

}
