/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, AfterViewInit, AfterContentInit, Inject } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbLayoutDirection, NbLayoutDirectionService, NbThemeService } from '@nebular/theme';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'ngx-app',
  template: `
 
  <router-outlet ></router-outlet>` ,
})
export class AppComponent implements OnInit  {
 
  isloadedPage=false;
  constructor(private analytics: AnalyticsService,
    private directionService: NbLayoutDirectionService,
    private themeService: NbThemeService,
    @Inject(LOCAL_STORAGE) private localStorage:WebStorageService) {



    let themeName= localStorage.get('themeName');
    if(themeName!=null && themeName!=undefined)
       this.themeService.changeTheme(themeName);

    this.directionService.setDirection(NbLayoutDirection.RTL);
    
  }

  
  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
 
}
