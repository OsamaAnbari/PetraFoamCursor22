import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isRtl = false;

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    // Subscribe to language changes to update RTL status
    this.translationService.currentLang$.subscribe(lang => {
      this.isRtl = this.translationService.isRtl();
    });
  }
}
