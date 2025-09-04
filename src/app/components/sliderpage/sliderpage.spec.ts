import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sliderpage } from './sliderpage';

describe('Sliderpage', () => {
  let component: Sliderpage;
  let fixture: ComponentFixture<Sliderpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sliderpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sliderpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
