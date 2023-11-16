import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {BaseComponent} from "../../base/base.component";
import {BasketComponent} from "../../ui/components/basket/basket.component";

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  //ViewContainerRef: Dinamik olarak yüklenecek componenti içerisinde barındıran container'dır.
  //  (Her dinamik yükleme sürecinde önceki view'leri clear etmemiz gerekmektedir.)
  //ComponentFactory: Component'lerin instance'larını oluşturmak için kullanılan nesnedir.
  //ComponentFactoryResolver: Belirli bir component için ComponentFactory'i resolve eden sınıftır.
  //  İçerisindeki resolveComponentFactory fonksiyonu aracılığıyla ilgili componente dair bir ComponentFactory nesnesi oluşturup, döner.


  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
    let _component: any = null;

    switch (component) {
      case ComponentType.BasketComponent:
        _component = (await import("../../ui/components/basket/basket.component")).BasketComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component);
  }
}

export enum ComponentType {
  BasketComponent
}
