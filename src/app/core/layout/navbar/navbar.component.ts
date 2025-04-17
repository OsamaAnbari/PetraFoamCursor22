import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  mobileMenuOpen = false;
  currentLang: string;

  constructor(
    private translationService: TranslationService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translationService.getCurrentLang();
  }

  ngOnInit(): void {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  switchLanguage(lang: string): void {
    this.translationService.changeLang(lang);
  }
}
