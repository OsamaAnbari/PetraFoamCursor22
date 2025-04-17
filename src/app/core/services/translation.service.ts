import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  public currentLang$: Observable<string> = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage(): void {
    const savedLang = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang('en');
    this.changeLang(savedLang);
  }

  public changeLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    
    // Handle RTL for Arabic
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
      document.body.classList.remove('rtl');
    }
    
    this.currentLangSubject.next(lang);
  }

  public getCurrentLang(): string {
    return this.currentLangSubject.value;
  }

  public isRtl(): boolean {
    return this.currentLangSubject.value === 'ar';
  }
}
