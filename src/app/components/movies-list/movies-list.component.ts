import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  @Input() moviesList: Movie[];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goDetails(id: string): void {
    this.router.navigate(['movie', id]);
  }
}
