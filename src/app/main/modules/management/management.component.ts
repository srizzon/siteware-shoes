import { Subscription } from 'rxjs';
import { ServicesSubject } from '@services/outros/services-subjects.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  private _subscription: Subscription;

  constructor( ) { }

  ngOnInit(): void { }
}
