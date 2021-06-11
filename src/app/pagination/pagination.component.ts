import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  public pages: number[];
  @Input() totalPages: number;
  @Output() findDataOnPage: EventEmitter<number> = new EventEmitter();
  public currentPage: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.pages = Array.from(new Array(this.totalPages), (x, i) => i+1);
  }

  public findOnPage(page: number){
    this.findDataOnPage.emit(page);
    this.currentPage = page;
  }

}
