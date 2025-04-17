import { Component, OnInit } from '@angular/core';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'petra-foam22';
  
  constructor(private translationService: TranslationService) {}
  
  ngOnInit(): void {
    // Translation service is already initialized in its constructor
  }
}
