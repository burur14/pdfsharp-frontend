import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/features/authentication/models/user-model';
import { AuthService } from 'src/app/features/authentication/services/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  get authenticatedUser() {
    return this.authService.getAuthenticatedUser() || new UserModel();
  }

  constructor(
    private authService: AuthService,
    private store: Store,
  ) { }

  ngOnInit() {
  }

}
