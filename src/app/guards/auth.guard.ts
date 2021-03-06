import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { SupabaseService } from '../services/supabase.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly supabase: SupabaseService, private readonly router: Router) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => setTimeout(() => {
      const isSignedIn = !!this.supabase.getSession()?.user

      if (!isSignedIn) {
        this.router.navigate(['/auth'])
        resolve(false);
      }

      resolve(true);
    }, 500));
  }
}
