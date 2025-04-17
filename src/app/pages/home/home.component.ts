import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentLang: string;
  isRtl: boolean;

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.getCurrentLang();
    this.isRtl = this.translationService.isRtl();
  }

  ngOnInit(): void {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.isRtl = this.translationService.isRtl();
    });
  }
}
