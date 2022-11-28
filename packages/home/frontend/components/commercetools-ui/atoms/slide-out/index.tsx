import React, { useMemo } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import CartIcon from 'components/icons/cart';
import CloseIcon from 'components/icons/close';
import DiscountForm from '../../organisms/discount-form';
import Button from 'components/commercetools-ui/atoms/button';
import { Link } from 'components/commercetools-ui/organisms/header/types';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart, useWishlist } from 'frontastic';
import CartItem from './cart-item';
import EmptyCart from './empty-cart';
import { NextFrontasticImage } from 'frontastic/lib/image';

export type State = 'wishlist' | 'cart';

export interface Props {
  state?: State;
  changeState?: (newState?: State) => void;
  onClose?: () => void;
  emptyCartImage: NextFrontasticImage;
  emptyCartCategories: Link[];
}

const Slideout: React.FC<Props> = ({ state, changeState, onClose, emptyCartImage, emptyCartCategories }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });

  const { data: cartData, totalItems: totalCartItems } = useCart();

  const { data: wishlistData } = useWishlist();

  const wishlistItems = useMemo(() => wishlistData?.lineItems, [wishlistData]);

  const title = useMemo(() => {
    switch (state) {
      case 'cart':
        return formatCartMessage({ id: 'myCart', defaultMessage: 'My Cart' });
      case 'wishlist':
        return formatWishlistMessage({ id: 'myWishlist', defaultMessage: 'My Wishlist' });
    }
  }, [formatCartMessage, formatWishlistMessage, state]);

  const iconClassName = 'absolute -bottom-1 left-[-4px] h-2 w-34 transition duration-200';

  const wishlistClassName = useClassNames([
    iconClassName,
    state === 'wishlist' ? 'bg-secondary-grey ease-out' : 'bg-transparent ease-in',
  ]);

  const cartClassName = useClassNames([
    iconClassName,
    state === 'cart' ? 'bg-secondary-grey ease-out' : 'bg-transparent ease-in',
  ]);

  const transaction = useMemo(() => {
    if (!cartData?.lineItems)
      return {
        subtotal: { centAmount: 0 },
        discount: { centAmount: 0 },
        tax: { centAmount: 0 },
        shipping: { centAmount: 0 },
        total: { centAmount: 0 },
      };
    const currencyCode = cartData.sum.currencyCode;
    const fractionDigits = cartData.sum.fractionDigits;

    return {
      subtotal: {
        centAmount: cartData.lineItems.reduce((acc, curr) => acc + (curr.price?.centAmount || 0) * curr.count, 0),
        currencyCode,
        fractionDigits,
      },
      discount: {
        centAmount: cartData.lineItems.reduce(
          (acc, curr) => acc + ((curr.price?.centAmount || 0) * curr.count - (curr.totalPrice?.centAmount || 0)),
          0,
        ),
        currencyCode,
        fractionDigits,
      },
      shipping: cartData.shippingInfo?.price ?? {},
      tax: {
        centAmount: cartData.taxed?.taxPortions?.reduce((acc, curr) => acc + curr.amount?.centAmount, 0) ?? 0,
        currencyCode,
        fractionDigits,
      },
      total: cartData.sum,
    };
  }, [cartData]);

  const ActiveSection = useMemo(() => {
    if (state === 'cart') {
      return (
        <>
          <div className="flex grow flex-col items-center overflow-auto border-b border-neutral-400 px-12 md:px-22">
            {cartData.lineItems.length ? (
              cartData.lineItems?.map((lineItem) => <CartItem key={lineItem.lineItemId} item={lineItem} />)
            ) : (
              <EmptyCart emptyCartCategories={emptyCartCategories} emptyCartImage={emptyCartImage} />
            )}
          </div>

          {!!cartData.lineItems.length && (
            <div className="border-t border-neutral-400 px-12 pt-16 pb-24 md:px-22">
              <DiscountForm />
            </div>
          )}

          <div className="border-t border-neutral-400 bg-white px-12 pt-16 pb-18 md:px-22">
            {!!cartData.lineItems.length && (
              <div className="flex items-center justify-between">
                <span>{formatCartMessage({ id: 'subtotal', defaultMessage: 'Subtotal' })}: </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.subtotal)}</span>
              </div>
            )}

            {transaction.discount.centAmount > 0 && (
              <div className="flex items-center justify-between text-14">
                <span>{formatCartMessage({ id: 'discount', defaultMessage: 'Discount' })} </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.discount)}</span>
              </div>
            )}

            {transaction.tax.centAmount > 0 && (
              <div className="flex items-center justify-between">
                <span>{formatCartMessage({ id: 'tax', defaultMessage: 'Tax' })}: </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.tax)}</span>
              </div>
            )}

            {transaction.shipping.centAmount > 0 && (
              <div className="flex items-center justify-between text-14">
                <span>{formatCartMessage({ id: 'shipping.estimate', defaultMessage: 'Est. Shipping' })} </span>
                <span>{CurrencyHelpers.formatForCurrency(transaction.shipping)}</span>
              </div>
            )}

            <div className="mt-26 flex items-center justify-between text-18 font-semibold">
              <span>{formatCartMessage({ id: 'total', defaultMessage: 'Total' })}: </span>
              <span>{CurrencyHelpers.formatForCurrency(transaction.total)}</span>
            </div>
            <div className="mt-16">
              <Button
                variant="primary"
                className="w-full rounded-md bg-primary-black py-12 text-16 font-medium text-white"
                disabled={!cartData.lineItems.length}
              >
                {formatCartMessage({ id: 'checkout.go', defaultMessage: 'Go to checkout' })}
              </Button>
            </div>
          </div>
        </>
      );
    }
  }, [state, cartData, transaction, formatCartMessage]);

  return (
    <>
      <div className="flex items-center justify-between border-b border-neutral-400 px-12 pt-24 md:px-22 md:pt-32">
        <h3 className="pb-22 text-18 font-bold leading-normal md:text-20">{title}</h3>
        <div className="flex h-full items-center">
          <div
            className="relative mr-12 h-full cursor-pointer hover:opacity-80 md:mr-24"
            onClick={() => changeState?.('wishlist')}
          >
            <div className={wishlistClassName} />
            {wishlistItems?.length > 0 && (
              <span className="absolute top-[-5px] right-[-5px] h-8 w-8 rounded-full bg-green-500" />
            )}
            <HeartIcon className="w-25" />
          </div>
          <div
            className="relative mr-8 h-full cursor-pointer hover:opacity-80 md:mr-16"
            onClick={() => changeState?.('cart')}
          >
            <>
              <div className={cartClassName} />
              <CartIcon className="w-25" totalCartItems={totalCartItems} />
            </>
          </div>
          <div onClick={onClose} className="cursor-pointer pb-22">
            <CloseIcon className="ml-12 h-14 w-14 sm:h-16 sm:w-16" />
          </div>
        </div>
      </div>
      {ActiveSection}
    </>
  );
};

export default Slideout;
