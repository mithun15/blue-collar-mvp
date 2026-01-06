import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarWidget } from './top-bar-widget';

describe('TopBarWidget', () => {
  let component: TopBarWidget;
  let fixture: ComponentFixture<TopBarWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
