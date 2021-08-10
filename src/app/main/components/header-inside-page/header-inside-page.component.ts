import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface HeaderPageInterface {
  title: string;
  text: string;
}
@Component({
  selector: 'app-header-inside-page',
  templateUrl: './header-inside-page.component.html',
  styleUrls: ['./header-inside-page.component.scss']
})
export class HeaderInsidePageComponent implements OnInit, OnChanges {

  /**
   * @description Parametro para desabilitar o texto do header
  */
  @Input() enableHeader: boolean = true;
  @Input() headerCustom: HeaderPageInterface = null;

  header: HeaderPageInterface;


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.setHeaderValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.headerCustom && changes.headerCustom.currentValue) {
      this.header = this.headerCustom;
    }
  }

  setHeaderValues(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.header = this.route.snapshot.data['header'];
      }
    });

    this.route.data.subscribe((data) => {
      this.header = data['header'];
    });
  }
}
