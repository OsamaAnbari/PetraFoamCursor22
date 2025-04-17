import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  public currentLang$ = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    // Get the language from localStorage if available, otherwise default to 'en'
    const savedLang = localStorage.getItem('language') || 'en';
    this.initLanguage(savedLang);
  }

  initLanguage(lang: string): void {
    // Set the default language
    this.translate.setDefaultLang('en');
    
    // Use the selected language
    this.changeLang(lang);
  }

  changeLang(lang: string): void {
    // Save to localStorage
    localStorage.setItem('language', lang);
    
    // Use the language
    this.translate.use(lang);
    
    // Update document direction for RTL support
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.body.classList.remove('rtl');
    }
    
    // Update the subject
    this.currentLangSubject.next(lang);
  }

  getCurrentLang(): string {
    return this.currentLangSubject.value;
  }

  isRtl(): boolean {
    return this.currentLangSubject.value === 'ar';
  }
}
