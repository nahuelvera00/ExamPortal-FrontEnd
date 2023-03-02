import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      // alert('User Name es required');
      this._snackBar.open('User name is required', 'Ok', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    //Validate

    //AddUser: userService
    this.userService.addUser(this.user).subscribe(
      (data) => {
        //sucess
        console.log(data);
        //alert('Success!');
        Swal.fire('Success done !!', 'User is registered', 'success');
      },
      (error) => {
        //error
        console.log(error);
        //alert('Error!');
        this._snackBar.open('Something went wrong!!', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      }
    );
  }
}
