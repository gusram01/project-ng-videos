import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../interfaces/response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  moviesListener: Movie[] = [];

  constructor(private movieService: MovieService) {
    // code
  }

  @HostListener('window: scroll', ['$event'])
  onScroll(): void {
    const isBottom =
      document.documentElement.getBoundingClientRect().bottom -
      document.documentElement.clientHeight -
      250;
    if (isBottom < 0) {
      this.movieService.getMovies().subscribe((movies) => {
        this.moviesListener = this.moviesListener.concat(movies);
      });
    }
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
      this.moviesListener = movies;
    });
  }

  ngOnDestroy(): void {
    this.movieService.resetpageParams();
  }
}
