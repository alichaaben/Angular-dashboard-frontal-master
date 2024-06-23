import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SexeType } from "../../../@core/data/SexeType";
import { UserDto } from "../../../@core/data/User";
import { UserService } from "../../../@core/mock/user.service";

@Component({
  selector: "ngx-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.scss"],
})
export class CreateAccountComponent implements OnInit {
  user: UserDto;
  sexeType = SexeType;
  Keys(): Array<string> {
    var Keys = Object.keys(this.sexeType);
    return Keys;
  }

  msg = "";
  form: any = {};

  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit(): void {}

  addUser() {
    this.user = new UserDto(
      this.form.username,
      this.form.lastName,
      this.form.cinUser,
      this.form.password,
      this.form.confirmPasswordUser,
      this.form.phoneNumberUser,
      this.form.adressUser,
      this.form.birthDateUser,
      this.form.emailUser,
      this.form.sexeUser,
      this.form.role
    );
    this.userservice.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        console.log(this.user);
        this.msg = "User Added Succefully !";
        this.form = " ";
        this.router.navigate(["/authenticate"]);
      },
      (error) => {
        console.log("exception occured");
        this.msg = "Email or Username Alredy Exist !";
      }
    );
  }
}
