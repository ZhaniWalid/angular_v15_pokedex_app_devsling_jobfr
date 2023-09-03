import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeDexSearchPageComponent } from './poke-dex-search-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokeDexSearchPageComponent', () => {
  let component: PokeDexSearchPageComponent;
  let fixture: ComponentFixture<PokeDexSearchPageComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ PokeDexSearchPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeDexSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
