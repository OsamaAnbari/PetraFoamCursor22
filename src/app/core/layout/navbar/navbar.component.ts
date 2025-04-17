import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  mobileMenuOpen = false;
  currentLang: string;
  isRtl: boolean;
  private langSubscription: Subscription;

  constructor(
    private translationService: TranslationService,
    private translate: TranslateService
  ) {
    this.currentLang = this.translationService.getCurrentLang();
    this.isRtl = this.translationService.isRtl();
  }

  ngOnInit(): void {
    this.langSubscription = this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.isRtl = this.translationService.isRtl();
    });
  }
  
  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  switchLanguage(lang: string): void {
    this.translationService.changeLang(lang);
  }
}
