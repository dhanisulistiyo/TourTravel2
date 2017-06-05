import { Component } from '@angular/core';
import { FixedPackagePage } from '../fixed-package/fixed-package';
import { PromoPackagePage } from '../promo-package/promo-package';
import { CustomePackagePage } from '../custome-package/custome-package';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  tab1Root: any = CustomePackagePage;
  tab2Root: any = FixedPackagePage;
  tab3Root: any = PromoPackagePage;
  constructor() {

  }
}
