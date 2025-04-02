import { Cart } from '@app/core/cart/domain/models/cart.model';
import { Observable } from 'rxjs';

export abstract class CartRepository {
  abstract get(): Observable<Cart>;
  abstract save(cart: Cart): Observable<void>;
}
