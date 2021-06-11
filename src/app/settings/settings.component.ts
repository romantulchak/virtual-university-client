import { Component, OnInit } from '@angular/core';
import { Link } from '../model/link.model';
import { Settings } from '../model/settings.model';
import { SettingsService } from '../service/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public links: Link[] = [
    {
      name: 'Home',
      route: '',
      children: []
    },
  ];

  public settings: Settings;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.getSettings();
  }

  private getSettings(){
    this.settings = this.settingsService.getSettings();

    
  }

  public saveSettings(){
    this.settingsService.setSettings(this.settings);
  }
  
}
