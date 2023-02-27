import React from 'react';
import { useRouter } from 'next/router';
import Button from 'components/commercetools-ui/atoms/button';
import Input from 'components/commercetools-ui/atoms/input';
import Select from 'components/commercetools-ui/atoms/select';
import Typography from 'components/commercetools-ui/atoms/typography';
import useResolveCCImage from 'components/commercetools-ui/organisms/checkout/hooks/useResolveCCImage';
import { useFormat } from 'helpers/hooks/useFormat';
import { payments } from '.';
import usePaymentMethods from './helper-hooks/usePaymentMethods';

const PaymentAdd = () => {
  const router = useRouter();
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'payment' });
  const resolveCCImage = useResolveCCImage();

  const {
    expiryDateOptions,
    cardHolder,
    cardNumber,
    cardExpDate,
    cardCVC,
    handleCardHolderChange,
    handleExpiryDateChange,
    handleCardNumberChange,
    handleCVCChange,
  } = usePaymentMethods();

  const handleSaveClick = () => {
    payments.push({
      id: payments.length.toString(),
      cardHolder: cardHolder,
      cardNumber: cardNumber,
      cardExpiry: cardExpDate ?? { name: '', value: '' },
      cardCVC: cardCVC,
    });

    router.push('/account#payment');
  };

  return (
    <div>
      <div className="mt-24 px-16 md:mt-0 md:px-24 lg:px-0">
        <Typography as="h2" fontFamily="libre" fontSize={16} className="text-primary-black md:text-22 lg:text-24">
          {formatPaymentMessage({
            id: 'add.payment',
            defaultMessage: 'Add new payment method',
          })}
        </Typography>
      </div>

      <div className="mt-0 w-full px-16 py-0 md:px-24 lg:mt-36 lg:w-[60%] lg:rounded-md lg:border lg:py-32 lg:px-24">
        <div className="mt-24 md:max-w-[436px] lg:mt-0">
          <Typography as="label" medium fontSize={12} className="text-secondary-black">
            {formatPaymentMessage({ id: 'card.holder', defaultMessage: 'Card holder *' })}
          </Typography>
          <Input name="holderName" className="mt-8 sm:px-8" labelPosition="inline" onChange={handleCardHolderChange} />

          <div className="relative mt-16 lg:mt-12">
            <Typography as="label" medium fontSize={12} className="text-secondary-black">
              {formatPaymentMessage({ id: 'card.number', defaultMessage: 'Card number *' })}
            </Typography>
            <Input className="mt-8 sm:px-8" labelPosition="inline" type="number" onChange={handleCardNumberChange} />
            {resolveCCImage(cardNumber) && (
              // eslint-disable-next-line
              <img className="absolute top-52 right-8 w-[32px] -translate-y-1/2" src={resolveCCImage(cardNumber)} />
            )}
          </div>

          <div className="mt-16 w-full flex-col gap-8 md:max-w-[436px] lg:mt-12 lg:flex lg:flex-row">
            <div className="w-full lg:w-[60%]">
              <Typography as="label" fontSize={12} medium className="text-secondary-black">
                {formatPaymentMessage({ id: 'expiration.date', defaultMessage: 'Expiration date *' })}
              </Typography>
              <div className="mt-8 grow md:flex-1">
                <Select options={expiryDateOptions} onChange={handleExpiryDateChange} />
              </div>
            </div>

            <div className="relative mt-16 grow md:flex-1 lg:mt-0">
              <Typography as="label" medium fontSize={12} className="text-secondary-black">
                {formatPaymentMessage({ id: 'card.securityNumber', defaultMessage: 'Security number *' })}
              </Typography>
              <Input className="mt-8 sm:px-8" labelPosition="inline" type="number" onChange={handleCVCChange} />
              {/* eslint-disable-next-line */}
              <img className="absolute top-1/2 right-8 w-[32px] -translate-y-1/2" src="/images/cvc.png" />
            </div>
          </div>
        </div>

        <div className="mt-32 flex">
          <Button variant="secondary" className="w-[112px]" onClick={() => router.push('/account#payment')}>
            <Typography as="h2" align="center" fontSize={14} className="text-primary-black">
              {formatPaymentMessage({
                id: 'cancel',
                defaultMessage: 'Cancel',
              })}
            </Typography>
          </Button>

          <Button variant="primary" className="ml-12 w-[112px]" onClick={handleSaveClick}>
            <Typography as="h2" align="center" fontSize={14}>
              {formatPaymentMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentAdd;
