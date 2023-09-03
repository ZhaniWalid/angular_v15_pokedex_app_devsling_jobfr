import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-pokemon-found',
  templateUrl: './no-pokemon-found.component.html',
  styleUrls: ['./no-pokemon-found.component.css']
})
export class NoPokemonFoundComponent implements OnInit {

  ngOnInit(): void {
    console.log('404 error - No Pokemon Found @ ngOnInit()');
  }

}