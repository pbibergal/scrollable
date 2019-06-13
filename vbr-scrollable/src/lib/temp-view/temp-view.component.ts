import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'vbr-temp-view',
  templateUrl: './temp-view.component.html',
  styleUrls: ['./temp-view.component.css'],
})
export class TempViewComponent implements OnInit, AfterContentInit {

  @Input() items$: BehaviorSubject<any>;
  @ViewChild('A', {read: ViewContainerRef}) viewContainerRef;
  @Input() elements$: BehaviorSubject<any[]>;

  constructor() {
  }

  ngOnInit() {
    this.items$
      .pipe(
        filter(items => !!items),
      )
      .subscribe(items => {
        this.viewContainerRef.clear();

        items[0]._vbrScrollItemsOf.forEach(el => {
          this.viewContainerRef.createEmbeddedView(items[0].template, {
            $implicit: el,
          });
        });

        setTimeout(() => {
          const elements = [];
          this.viewContainerRef._embeddedViews.forEach(view => {
            elements.push({
              node: view.nodes[0].renderElement,
              bounding: {
                top: view.nodes[0].renderElement.offsetTop,
                height: view.nodes[0].renderElement.offsetHeight,
              },
            });
          });


          this.elements$.next(elements);
        }, 10);
      });
  }

  ngAfterContentInit(): void {

  }
}
