import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{

  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions'];

  //coursesServive: CoursesService;

  constructor(
    public dialog: MatDialog,
    private coursesServive: CoursesService,
    private router: Router,
    private route: ActivatedRoute) {

    this.courses$ = this.coursesServive.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.')
        return of ([]);
      })
    );
    //this.courses = [];
    //this.coursesServive = new CoursesService;
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

  onAdd() {
   this.router.navigate(['new'], {relativeTo: this.route});
  }
}
