import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionSnackbarComponent } from './description-snackbar.component';

describe('DescriptionSnackbarComponent', () => {
  let component: DescriptionSnackbarComponent;
  let fixture: ComponentFixture<DescriptionSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptionSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
