import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Skeleton from 'react-loading-skeleton';
import { parameters } from '.storybook/preview';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { lineItems } from 'helpers/mocks/mockCommonData';
import { variant } from 'helpers/mocks/mockData';
import Image from 'frontastic/lib/image';
import Typography from '../../typography';
import Accordion from '../index';

const AccordionContentCustom = () => {
  return (
    <div className="ml-44">
      <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
        Custom Accordion Components
      </Typography>
      <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
        Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
        usage and look at something cool we have made, here you will see the components and it&apos;s variants in order
        to show how much is the client capable to customize
      </Typography>

      <div className="mt-20">
        <Accordion
          className="hidden lg:block lg:pt-0"
          buttonClassName="py-16 border-y border-neutral-400"
          panelClassName="w-[24%] border-0"
          customClosedButton={
            <div className="hidden gap-20 lg:flex">
              <div className="grid max-h-[104px] grid-cols-3 gap-16 overflow-hidden">
                {lineItems?.map((lineItem) => (
                  <div key={lineItem.lineItemId} className="relative h-[104px] w-[88px] shrink-0">
                    {lineItem?.variant?.images?.[0] ? (
                      <Image layout="fill" src={variant?.images?.[0]} objectFit="contain" />
                    ) : (
                      <Skeleton className="h-full w-full" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex cursor-pointer items-center">
                <span className="text-14 text-secondary-black">+{2}</span>
                <ChevronDownIcon strokeWidth={1} className="w-24" />
              </div>
            </div>
          }
        >
          <div className="max-h-316 divide-y divide-neutral-400 overflow-scroll">
            {lineItems?.map((lineItem, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-start gap-16 py-16 md:gap-32">
                  <div className="relative h-[104px] w-[89px] shrink-0">
                    {lineItem?.variant?.images?.[0] ? (
                      <Image layout="fill" src={variant?.images?.[0]} objectFit="contain" />
                    ) : (
                      <Skeleton className="h-full w-full" />
                    )}
                  </div>
                  <div className="mt-10 grow overflow-hidden">
                    <Typography
                      asSkeleton={!lineItem.name}
                      fontSize={12}
                      className="block max-w-[100%] truncate capitalize md:text-14"
                    >
                      {lineItem.name ?? 'product name'}
                    </Typography>
                    <Typography
                      asSkeleton={!lineItem.name}
                      fontSize={12}
                      medium
                      className="mt-8 block md:hidden lg:block lg:text-14"
                    >
                      {CurrencyHelpers.formatForCurrency(lineItem.price ?? 111, parameters.nextRouter.locale)}
                    </Typography>
                    <Typography asSkeleton={!lineItem.name} fontSize={14} className="mt-12 text-secondary-black">
                      {'x ' + lineItem.count ?? '2'}
                    </Typography>
                  </div>
                </div>
                <Typography asSkeleton={!lineItem.name} fontSize={16} medium className="mt-8 hidden md:block lg:hidden">
                  {CurrencyHelpers.formatForCurrency(lineItem.price ?? 111, parameters.nextRouter.locale)}
                </Typography>
              </div>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default AccordionContentCustom;
