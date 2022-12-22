import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';

interface Props {
  phoneNumber?: string;
  workingHoursWeekdays?: string;
  workingHoursWeekends?: string;
  email?: string;
  addressLine?: string;
  cityAndPostalCode?: string;
  country?: string;
}

const ContactUs: React.FC<Props> = ({
  phoneNumber,
  workingHoursWeekdays,
  workingHoursWeekends,
  email,
  addressLine,
  cityAndPostalCode,
  country,
}) => {
  const { formatMessage: formatCustomerSupportMessage } = useFormat({ name: 'customer-support' });
  return (
    <>
      <div className="border-b border-neutral-400 pb-20 lg:border-b-0 lg:py-40">
        <Typography as="h4" fontSize={18} fontFamily="libre">
          {formatCustomerSupportMessage({ id: 'contact.us', defaultMessage: 'Contact us' })}
        </Typography>
      </div>

      <div className="hidden w-full border-b border-neutral-400 pb-20 lg:flex">
        <div className="flex w-[30%] ">
          <PhoneIcon className="w-20" />
          <Typography as="h5" fontSize={14} fontFamily="inter" medium className="py-1 pl-14 text-primary-black">
            {formatCustomerSupportMessage({ id: 'phone', defaultMessage: 'Phone' })}
          </Typography>
        </div>

        <div className="flex w-[30%]">
          <EnvelopeIcon className="w-20" />
          <Typography as="h5" fontSize={14} fontFamily="inter" medium className="py-1 pl-14 text-primary-black">
            {formatCustomerSupportMessage({ id: 'email', defaultMessage: 'Email' })}
          </Typography>
        </div>

        <div className="flex w-[30%]">
          <MapPinIcon className="w-20" />
          <Typography as="h5" fontSize={14} fontFamily="inter" medium className="py-1 pl-14 text-primary-black">
            {formatCustomerSupportMessage({ id: 'address', defaultMessage: 'Address' })}
          </Typography>
        </div>
      </div>

      <div className="flex w-full flex-col lg:flex-row lg:pt-20">
        <div className="flex w-[30%] py-20 lg:hidden">
          <PhoneIcon className="w-20" />
          <Typography as="h5" fontSize={14} fontFamily="inter" medium className="py-1 pl-14 text-primary-black">
            {formatCustomerSupportMessage({ id: 'phone', defaultMessage: 'Phone' })}
          </Typography>
        </div>

        <div className="flex flex-col border-b pb-20 pl-0 lg:w-[30%] lg:border-b-0 lg:pl-32">
          <Typography fontSize={14} fontFamily="inter" className="py-1 text-secondary-black">
            {phoneNumber}
          </Typography>
          <div className="pt-22">
            <Typography as="span" fontSize={14} fontFamily="inter" className="text-secondary-black">
              {formatCustomerSupportMessage({ id: 'weekdays', defaultMessage: 'Mon- Fri: ' })}
            </Typography>
            <Typography as="span" fontSize={14} fontFamily="inter" className="text-secondary-black">
              {workingHoursWeekdays}
            </Typography>
          </div>
          <div className="pt-5">
            <Typography as="span" fontSize={14} fontFamily="inter" className="text-secondary-black">
              {formatCustomerSupportMessage({ id: 'weekends', defaultMessage: 'Sat- Sun: ' })}
            </Typography>
            <Typography as="span" fontSize={14} fontFamily="inter" className="text-secondary-black">
              {workingHoursWeekends}
            </Typography>
          </div>
        </div>

        <div className="flex w-[30%] py-20 lg:hidden">
          <EnvelopeIcon className="w-20" />
          <Typography as="h5" fontSize={14} fontFamily="inter" medium className="py-1 pl-14 text-primary-black">
            {formatCustomerSupportMessage({ id: 'email', defaultMessage: 'Email' })}
          </Typography>
        </div>
        <div className="flex border-b pb-20 pl-0 lg:w-[30%] lg:border-b-0 lg:pl-32">
          <Typography fontSize={14} fontFamily="inter" className="py-1 text-secondary-black">
            {email}
          </Typography>
        </div>

        <div className="flex w-[30%] py-20 lg:hidden">
          <MapPinIcon className="w-20" />
          <Typography as="h5" fontSize={14} fontFamily="inter" medium className="py-1 pl-14 text-primary-black">
            {formatCustomerSupportMessage({ id: 'address', defaultMessage: 'Address' })}
          </Typography>
        </div>
        <div className="flex flex-col border-b pb-20 pl-0 lg:w-[30%] lg:border-b-0 lg:pl-32">
          <Typography as="span" fontSize={14} fontFamily="inter" className="pb-2 text-secondary-black">
            {addressLine}
          </Typography>
          <Typography as="span" fontSize={14} fontFamily="inter" className="pb-2 text-secondary-black">
            {cityAndPostalCode}
          </Typography>
          <Typography as="span" fontSize={14} fontFamily="inter" className="pb-2 text-secondary-black">
            {country}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
