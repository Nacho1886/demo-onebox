import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bg-primary-300 text-black text-center py-4 shadow-[0_8px_8px_rgba(0,0,0,0.8)]'
  }
})
export class HeaderComponent { }
