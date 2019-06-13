import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewportService {

  constructor() {
  }

  /**
   * Method that emits only when all images on the page were loaded.
   * @param images
   */
  public imagesLoaded(images: NodeListOf<Element>): Observable<void> {
    const total = images.length;
    let count = 0;

    return Observable.create(observer => {
      images.forEach((img: HTMLImageElement) => {
        if (!img.complete) {
          img.addEventListener('load', () => {
            count++;

            if (count === total) {
              observer.next(images);
              observer.complete();
            }
          });
        } else {
          count++;

          if (count === total) {
            observer.next(images);
            observer.complete();
          }
        }
      });
    });
  }
}
