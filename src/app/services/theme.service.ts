import { Injectable, RendererFactory2, Inject, Renderer, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  renderer: Renderer2;

  constructor(private renderFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document,
              private sotrage: StorageService) {
    this.renderer = this.renderFactory.createRenderer(null , null);
   }

  enableDark(): void {
    this.renderer.addClass(this.document.body, 'dark-theme');
  }
  setDarkStorage() {
    this.sotrage.set('theme', 'dark');
  }
  setLightStorage() {
    this.sotrage.set('theme', 'light');
  }
  enableLight(): void {
    this.renderer.removeClass(this.document.body, 'dark-theme');
  }
  initTheme(): void {
    if (this.isDarkMode()) {
      this.enableDark();
    } else {
      this.enableLight();
    }
  }
  isDarkMode(): boolean {
    if (this.sotrage.get('theme') === 'dark') {
      return true;
    } else {
      return false;
    }
  }
 
}
