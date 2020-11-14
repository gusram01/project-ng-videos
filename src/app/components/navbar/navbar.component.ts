import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  search: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}
  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    this.router.navigate(['search', this.search.trim().toLowerCase()]);
  }
}
