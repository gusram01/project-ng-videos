import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieDetailResponse, Cast } from '../../interfaces/response';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movieDetail: MovieDetailResponse;
  movieCast: Cast[] = [];
  error = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.movieService.getMovieDetail(id),
      this.movieService.getMovieCredits(id),
    ]).subscribe(([movie, cast]) => {
      if (!movie || cast.length < 1) {
        this.error = true;
        this.router.navigate(['home']);
        return;
      }
      this.error = false;
      this.movieDetail = movie;
      this.movieCast = cast.filter((actor) => actor.profile_path);
    });

    // subscribe(
    //   (resp) => {
    //     if (!resp) {
    //       this.router.navigate(['home']);
    //       return;
    //     }
    //     this.error = false;
    //     this.movieDetail = resp;
    //   },
    //   (err) => (this.error = true)
    // );
    // .subscribe(
    //   (resp) => {
    //     if (resp.length < 1) {
    //       this.router.navigate(['home']);
    //       return;
    //     }
    //     this.movieCast = resp.filter((actor) => actor.profile_path);
    //     this.error = false;
    //   },
    //   (err) => (this.error = true)
    // );
  }
  back(): void {
    this.location.back();
  }
}
