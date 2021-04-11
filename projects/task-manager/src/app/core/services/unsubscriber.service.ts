import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class UnsubscriberService {

    /**
     * Unsubscribing all observables
     * @param observer: Subscription[]
     */
    unsubscribeObservable(observer: Subscription[]): void {
        if ( (observer instanceof Array) && (observer.length)) {
            observer.forEach(subscription => {
                if ( (subscription instanceof Subscription) && (subscription !== null) ) {
                    subscription.unsubscribe();
                }
            });
        }
    }
}
