import { Injectable } from '@angular/core';
import { CartRepository } from '@app/core/cart/domain/repositories/cart.repository';
import { Cart } from '@app/core/cart/domain/models/cart.model';
import { Observable, of } from 'rxjs';
import { CartMapper } from '../mappers/cart.mapper';

@Injectable()
export class CartDataRepository extends CartRepository {
  private readonly STORAGE_KEY = 'cart';

  private readonly cartMapper = new CartMapper();

  get(): Observable<Cart> {
    const rawData = localStorage.getItem(this.STORAGE_KEY);
    const cart = rawData
      ? this.cartMapper.mapToCart(JSON.parse(rawData))
      : null;

    return of(cart ?? { events: [] });
  }

  save(cart: Cart): Observable<void> {
    const mappedCartData = this.cartMapper.mapToPersistence(cart);
    return of(
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mappedCartData)),
    );
  }
}
