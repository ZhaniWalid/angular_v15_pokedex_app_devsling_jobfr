import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-cmp-common-page',
  templateUrl: './footer-cmp-common-page.component.html',
  styleUrls: ['./footer-cmp-common-page.component.css']
})
export class FooterCmpCommonPageComponent implements OnInit {
  // Get the "Current (Actual) Year" from the "Date()" Object
  currentYear: number = new Date().getFullYear();
  myLinkedInUrl: string = 'https://www.linkedin.com/in/walid-zhani-54705612a/';

  ngOnInit(): void {
    console.log('currentYear @ Footer-Component @ ngOnInit(): '+ this.currentYear);
    console.log('myLinkedInUrl @ Footer-Component @ ngOnInit(): '+ this.myLinkedInUrl);
  }

}