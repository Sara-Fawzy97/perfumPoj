import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Only prefix if url is relative and not targeting local static assets
  if (!req.url.startsWith('http://') && !req.url.startsWith('https://') && !req.url.startsWith('./') && !req.url.startsWith('assets/')) {
    const cleanBaseUrl = environment.apiUrl.replace(/\/$/, '');
    const cleanUrl = req.url.startsWith('/') ? req.url : `/${req.url}`;
    const apiReq = req.clone({
      url: `${cleanBaseUrl}${cleanUrl}`,
      setHeaders: {
        'Accept': 'application/json'
      }
    });
    return next(apiReq);
  }

  return next(req);
};
