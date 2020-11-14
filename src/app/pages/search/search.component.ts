import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Movie } from '../../interfaces/response';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  moviesSearch: Movie[] = [];
  title = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  @HostListener('window: scroll', ['$event'])
  onScroll(): void {
    const isBottom =
      document.documentElement.getBoundingClientRect().bottom -
      document.documentElement.clientHeight -
      250;
    if (isBottom < 0) {
      this.movieService.getMovies().subscribe((movies) => {
        this.moviesSearch = this.moviesSearch.concat(movies);
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.title = data.title;
      this.movieService.searchMovie(data.title).subscribe((resp) => {
        this.moviesSearch = resp;
      });
    });
  }

  ngOnDestroy(): void {
    this.movieService.resetpageParams();
  }
}
