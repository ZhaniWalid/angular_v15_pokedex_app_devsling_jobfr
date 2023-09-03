import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCmpCommonPageComponent } from './footer-cmp-common-page.component';
import { By } from '@angular/platform-browser';

describe('FooterCmpCommonPageComponent', () => {
  let component: FooterCmpCommonPageComponent;
  let fixture: ComponentFixture<FooterCmpCommonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterCmpCommonPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterCmpCommonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have the name of the author << Walid Zhani >> in the footer of the application', () => {
    const footer = fixture.debugElement.query(By.css('.footer')).nativeElement;;
    expect(footer.innerHTML).toContain('Walid Zhani');
  });
});
