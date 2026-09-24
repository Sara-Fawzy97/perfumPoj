import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  getItem<T>(key: string): T | null {
    if (!this.isBrowser) {
      return null;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota exceeded or storage disabled errors
    }
  }

  removeItem(key: string): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore storage errors
    }
  }

  clear(): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      window.localStorage.clear();
    } catch {
      // Ignore storage errors
    }
  }
}
