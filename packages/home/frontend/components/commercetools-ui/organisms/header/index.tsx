import React from 'react';
import CommercetoolsSearch from 'components/commercetools-ui/atoms/search';
import AlgoliaSearch from 'components/commercetools-ui/atoms/search-algolia';
import HeaderLogo from 'components/commercetools-ui/organisms/header/header-logo';
import HeaderNavigationDesktop from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-desktop';
import HeaderNavigationMobile from 'components/commercetools-ui/organisms/header/header-navigation/header-navigation-mobile';
import { HeaderProps } from 'components/commercetools-ui/organisms/header/types';
import UtilitySection from 'components/commercetools-ui/organisms/header/utility-section';

const Header: React.FC<HeaderProps> = ({
  navLinks,
  categories,
  logo,
  logoMobile,
  logoLink,
  logoLinkMobile,
  tiles,
  emptyCartTitle,
  emptyCartSubtitle,
  emptyCartImage,
  emptyCartCategories,
  emptyWishlistTitle,
  emptyWishlistSubtitle,
  emptyWishlistImage,
  emptyWishlistCategories,
  enableAlgoliaSearch = false,
}) => {
  const Search = enableAlgoliaSearch ? AlgoliaSearch : CommercetoolsSearch;

  return (
    <header className="relative h-fit w-full border-b-[1.5px] border-neutral-400 bg-white">
      <div aria-label="Top" className="flex w-full items-center justify-between px-16 md:px-24 lg:px-20 xl:px-48">
        <HeaderNavigationMobile logo={logoMobile} links={navLinks} logoLink={logoLinkMobile} />

        <div className="ml-0 flex w-full justify-start lg:ml-20 xl:ml-0 xl:w-fit">
          <HeaderLogo
            logo={logo}
            logoLink={logoLink}
            imageClassName="flex h-44 w-200 justify-center text-center text-16 font-bold md:h-76 md:w-214 md:text-28"
          />
        </div>

        <div className="relative hidden w-full px-16 py-12 md:px-32 lg:px-20 xl:block xl:px-60">
          <Search categories={categories} />
        </div>

        <UtilitySection
          emptyCartTitle={emptyCartTitle}
          emptyCartSubtitle={emptyCartSubtitle}
          emptyCartImage={emptyCartImage}
          emptyCartCategories={emptyCartCategories}
          emptyWishlistTitle={emptyWishlistTitle}
          emptyWishlistSubtitle={emptyWishlistSubtitle}
          emptyWishlistImage={emptyWishlistImage}
          emptyWishlistCategories={emptyWishlistCategories}
        />
      </div>

      <div className="relative block w-full border-t border-neutral-400 px-15 py-8 md:px-28 lg:px-20 xl:hidden xl:px-60">
        <Search categories={categories} />
      </div>

      <HeaderNavigationDesktop links={navLinks} tiles={tiles ?? []} />
    </header>
  );
};
export default Header;
