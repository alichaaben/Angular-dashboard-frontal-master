import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFactureArchiveComponent } from './list-facture-archive.component';

describe('ListFactureArchiveComponent', () => {
  let component: ListFactureArchiveComponent;
  let fixture: ComponentFixture<ListFactureArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFactureArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFactureArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
