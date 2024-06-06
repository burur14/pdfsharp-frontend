import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/features/authentication/models/user-model';
import { AuthService } from 'src/app/features/authentication/services/auth.service';
import { UserService } from 'src/app/features/user/services/user.service';
import { selectUser } from '../../store/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() authenticatedUser = new UserModel();

  constructor(
    private store: Store,
  ) { }

  ngOnInit() {

  }

}
