import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateproduitComponent } from './updateproduit.component';

describe('UpdateproduitComponent', () => {
  let component: UpdateproduitComponent;
  let fixture: ComponentFixture<UpdateproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateproduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
