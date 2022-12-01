import React, { useEffect } from 'react';
import { useFormat } from 'helpers/hooks/useFormat';
import useHash from 'helpers/hooks/useHash';
import Redirect from 'helpers/redirect';
import { Reference } from 'types/reference';
import { useAccount, useCart } from 'frontastic';
import { AddressesSection, GeneralSection, SecuritySection, OrdersHistorySection } from './sections/exporter';
import useI18n from 'helpers/hooks/useI18n';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export interface AccountDetailsProps {
  loginLink?: Reference;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ loginLink }) => {
  //account data
  const { account, loggedIn } = useAccount();

  //Cart
  const { updateCart } = useCart();

  //i18n messages
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });

  //current window hash
  const hash = useHash();

  //I18n info
  const { country } = useI18n();

  //update associated cart data using account data
  useEffect(() => {
    if (!account) return;

    const email = account.email;
    const addresses = account.addresses.filter((address) => address.country === country);

    const shippingAddress = addresses?.find((address) => address.isDefaultShippingAddress) || addresses?.[0];
    const billingAddress = addresses?.find((address) => address.isDefaultBillingAddress) || addresses?.[0];

    updateCart({
      account: { email },
      shipping: shippingAddress,
      billing: billingAddress,
    });
  }, [account, country]);

  //user not logged in
  if (!loggedIn) return <Redirect target={loginLink} />;

  //tabs
  const tabs = [
    { name: formatAccountMessage({ id: 'general', defaultMessage: 'General' }), href: '#' },
    { name: formatAccountMessage({ id: 'addresses', defaultMessage: 'Addresses' }), href: '#addresses' },
    { name: formatAccountMessage({ id: 'orders', defaultMessage: 'Orders' }), href: '#orders' },
    { name: formatAccountMessage({ id: 'security', defaultMessage: 'Security' }), href: '#security' },
  ];

  //tabs change (mobile only)
  const handleTabChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    window.location.hash = e.target.value;
  };

  //tabs-content mapping
  const mapping = {
    '#': GeneralSection,
    '#addresses': AddressesSection,
    '#security': SecuritySection,
    '#orders': OrdersHistorySection,
  };

  //current rendered content
  const Content = mapping[hash];

  return (
    <>
      <div>
        {/* Content area */}
        <div>
          <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
            <main className="flex-1">
              <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                  <div className="w-full">
                    <h1 className="text-center text-3xl font-extrabold text-gray-900 sm:text-left">
                      {formatAccountMessage({ id: 'settings', defaultMessage: 'Settings' })}
                    </h1>
                  </div>
                  <div className="w-full">
                    <div className="py-6">
                      {/* Tabs */}
                      <div className="lg:hidden">
                        <label htmlFor="selected-tab" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="selected-tab"
                          name="selected-tab"
                          className="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:outline-none sm:text-sm"
                          defaultValue={tabs.find((tab) => tab.href === hash).name}
                          onChange={handleTabChange}
                        >
                          {tabs.map((tab) => (
                            <option key={tab.name} value={tab.href}>
                              {tab.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="hidden lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                              <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                  tab.href === hash
                                    ? 'border-accent-400 text-accent-400'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>
                      {Content && <Content />}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
