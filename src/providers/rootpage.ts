import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import {RootPage} from "../../interfaces/RootPage";

@Injectable()
export class RootPageProvider {
  public rootPageStream: any;
  public rootPageObserver: any;

  constructor() {
    this.rootPageStream = Rx.Observable.create( (observer) => {
      this.rootPageObserver = observer;
    });

  }

  getRootPageStream(){
    return this.rootPageStream;
  }

  setRootPage(pta: any){
    this.rootPageObserver.next(pta);
  }
}
