import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmployeeAddEditComponent} from "./components/employee-add-edit/employee-add-edit.component";
import {EmployeeService} from "./services/employee.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'firstname',
    'surname',
    'email',
    'birthdate',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.getEmployeeList();
  }

  openAddEditEmployeeForm() {
    this._dialog.open(EmployeeAddEditComponent);
  }

  getEmployeeList() {
    this._employeeService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._employeeService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('Employee deleted');
        this.getEmployeeList();
      },
      error: console.error,
      });
  }

}
