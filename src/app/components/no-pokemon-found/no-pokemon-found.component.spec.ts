import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPokemonFoundComponent } from './no-pokemon-found.component';

describe('NoPokemonFoundComponent', () => {
  let component: NoPokemonFoundComponent;
  let fixture: ComponentFixture<NoPokemonFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPokemonFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPokemonFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
