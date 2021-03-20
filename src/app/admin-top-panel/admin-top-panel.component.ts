import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-top-panel',
  templateUrl: './admin-top-panel.component.html',
  styleUrls: ['./admin-top-panel.component.scss']
})
export class AdminTopPanelComponent implements OnInit {

  @Input() backgroundColor: string = "#000000b3";
  public isPanelDisplayed: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.setPanelDispalyed();
  }


  private getPanelStatus() :boolean{
      if(localStorage.getItem("showAdminPanel") === null)
        localStorage.setItem("showAdminPanel", "true"); 
      return !!localStorage.getItem("showAdminPanel");
  }

  public hidePanel(){
    localStorage.setItem("showAdminPanel", "");
    this.setPanelDispalyed();
  }

  public showPanel(){
    localStorage.setItem("showAdminPanel", "true");
    this.setPanelDispalyed();
  }

  
  private setPanelDispalyed() {
    this.isPanelDisplayed = this.getPanelStatus();
  
  }
  
}
