import { DefaultDataService, HttpOptions, HttpUrlGenerator } from "@ngrx/data";
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Update } from "@ngrx/entity";

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(
    private httpClient: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super("Course", httpClient, httpUrlGenerator);
  }

  getAll(options?: HttpOptions): Observable<Course[]> {
    return this.httpClient
      .get("/api/courses")
      .pipe(map((response) => response["payload"]));
  }

  update(update: Update<Course>, options?: HttpOptions): Observable<Course> {
    return this.httpClient
      .put<Course>(`/api/course/${update.id}`, update.changes)
      .pipe(map((res) => res));
  }
}
