import React, { useState } from 'react';
import Drawer from 'components/commercetools-ui/atoms/drawer';
import Slideout, { State as MenuState } from 'components/commercetools-ui/atoms/slide-out';
import CartIcon from 'components/icons/cart';
import WishlistIcon from 'components/icons/wishlist';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart, useWishlist } from 'frontastic/provider';
import AccountButton from './account-button';
import { Link } from 'components/commercetools-ui/organisms/header/types';
import { NextFrontasticImage } from 'frontastic/lib/image';

interface Props {
  emptyCartImage?: NextFrontasticImage;
  emptyCartCategories: Link[];
}

const UtilitySection: React.FC<Props> = ({ emptyCartImage, emptyCartCategories }) => {
  const { totalItems: totalCartItems } = useCart();
  const { totalItems: totalWishlistItems } = useWishlist();
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatWishlistMessage } = useFormat({ name: 'wishlist' });

  const [menuState, setMenuState] = useState<MenuState>();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const onWishlistClicked = () => {
    setIsDrawerOpen(true);
    setMenuState('wishlist');
  };

  const onCartClicked = () => {
    setIsDrawerOpen(true);
    setMenuState('cart');
  };

  return (
    <div className="flex h-30 w-109 items-center justify-between lg:mr-12 lg:w-200 xl:w-300">
      <div className="flex w-full justify-center lg:w-210">
        <AccountButton />

        <div
          title={formatWishlistMessage({ id: 'wishlist', defaultMessage: 'Wishlist' })}
          className="relative mx-5 h-30  cursor-pointer lg:mx-10"
          onClick={onWishlistClicked}
        >
          <WishlistIcon totalWishlistItems={totalWishlistItems} className="w-25 text-secondary-black" />
        </div>

        <div
          title={formatCartMessage({ id: 'myCart', defaultMessage: 'My Cart' })}
          className="relative mx-5 cursor-pointer lg:mx-10"
          onClick={onCartClicked}
        >
          <CartIcon className="w-23 text-secondary-black" totalCartItems={totalCartItems} />
        </div>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        direction="right"
        className="w-[90%] max-w-[380px]"
        onClose={() => setIsDrawerOpen(false)}
      >
        <Slideout
          state={menuState}
          onClose={() => setIsDrawerOpen(false)}
          changeState={(newState) => setMenuState(newState)}
          emptyCartImage={emptyCartImage}
          emptyCartCategories={emptyCartCategories}
        />
      </Drawer>
    </div>
  );
};

export default UtilitySection;
