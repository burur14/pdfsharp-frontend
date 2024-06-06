import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-landing',
  templateUrl: './welcome-landing.component.html',
  styleUrls: ['./welcome-landing.component.scss']
})
export class WelcomeLandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  goToProjectMenu() {
    this.router.navigateByUrl('/explorer');
  }
}
