import React, { FC } from 'react';
import Link from 'components/commercetools-ui/atoms/link';
import { Market } from 'components/commercetools-ui/organisms/header/types';
import { Reference } from 'types/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';

export interface Props {
  market: Market;
  logo: NextFrontasticImage;
  logoLink: Reference;
}

const HeaderLogo: FC<Props> = ({ logoLink, logo, market }) => {
  return (
    <div className="relative px-10 md:mt-0">
      <Link
        className="flex h-95 w-125 justify-center text-center text-16 font-bold md:h-76 md:w-214 md:text-28"
        link={logoLink}
      >
        <Image media={logo.media} layout="fill" objectFit="contain" alt={logo.title[market?.locale]} />
      </Link>
    </div>
  );
};

export default HeaderLogo;
