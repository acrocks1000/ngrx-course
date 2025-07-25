import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CourseEntityService } from "./course-entity.service";
import { filter, first, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
    constructor( private coursesService: CourseEntityService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.coursesService.loaded$.pipe(
            tap((loaded => {
                if (!loaded) {
                    this.coursesService.getAll();
                }
            })),
            filter(loaded => !!loaded),
            first()
        )
        // return this.coursesService.getAll().pipe(
        //     map(courses => !!courses)
        // )
    }
}