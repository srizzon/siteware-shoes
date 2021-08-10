import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-header',
  templateUrl: './module-header.component.html',
  styleUrls: ['./module-header.component.scss']
})
export class ModuleHeaderComponent implements OnInit {

  @Input() moduleName: string;
  @Input() moduleIcon: string;
  @Input() title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.setHeaderValues()
  }

  setHeaderValues(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.moduleName = this.route.snapshot.data['name'];
        this.moduleIcon = this.route.snapshot.data['icon'];
        this.title = this.route.children[this.route.children.length - 1].snapshot.data['title'];
      }
    });

    this.route.data.subscribe((data) => {
      this.moduleName = data['name'];
      this.moduleIcon = data['icon'];
    });

    this.route.children[this.route.children.length - 1].data.subscribe(data => {
      this.title = data['title'];
    });
  }

  goHome() {
    this.router.navigate(['home']);
  }
}
