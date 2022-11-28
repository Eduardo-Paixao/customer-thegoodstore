import React from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import Typography from 'components/commercetools-ui/atoms/typography';
import Image from 'frontastic/lib/image';
import { Link } from 'components/commercetools-ui/organisms/header/types';
import { NextFrontasticImage } from 'frontastic/lib/image';

export type State = 'wishlist' | 'cart';

export interface Props {
  emptyCartImage: NextFrontasticImage;
  emptyCartCategories: Link[];
}

const EmptyCart: React.FC<Props> = ({ emptyCartImage, emptyCartCategories }) => {
  return (
    <div className="my-36 bg-neutral-200">
      <Typography as="h6" fontSize={16} align="center">
        Your cart is empty
      </Typography>
      <div className="relative h-92 w-197 px-10 text-center md:mt-55 md:mb-120">
        <Image media={emptyCartImage.media} layout="fill" objectFit="contain" alt={emptyCartImage.title} />
      </div>
      <ul className="mt-55 flex flex-col items-center gap-y-20">
        <Typography as="h6" fontSize={16} align="center">
          Continue shopping?
        </Typography>
        {emptyCartCategories.map((category) => (
          <li key={category.name}>
            <Button
              className="w-200 rounded-[4px] border border-primary-black text-16 text-secondary-black"
              variant="ghost"
            >
              {category.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmptyCart;
