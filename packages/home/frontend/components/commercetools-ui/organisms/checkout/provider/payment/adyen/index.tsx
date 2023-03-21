import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import type { PaymentAction } from '@adyen/adyen-web/dist/types/types';
import creditCardType from 'credit-card-type';
import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';
import Overlay from 'components/commercetools-ui/atoms/overlay';
import { getLocalizationInfo } from 'project.config';
import {
  PaymentMethod,
  PaymentMethodType,
  KlarnaPaymentRequestPayload,
  PaymentRequestPayload,
  SchemePaymentRequestPayload,
} from 'types/payment';
import { useAdyen } from 'frontastic';
import { KlarnaData, PaymentData, PaymentProvider, SchemeData, ThreeDS2AuthCallback } from '../types';

export const AdyenContext = React.createContext<PaymentProvider>({} as PaymentProvider);

const AdyenPaymentProvider: React.FC = ({ children }) => {
  const adyen = useAdyen();

  const router = useRouter();

  const [isOverlayActive, setIsOverlayActive] = useState(false);

  const [processing, setProcessing] = useState(false);

  const handleOnAdditionalDetails = useCallback(
    async (state: { data: Record<string, string> }) => {
      setIsOverlayActive(false);
      const response = await adyen.paymentDetails(state.data);
      return response;
    },
    //eslint-disable-next-line
    [adyen.paymentDetails],
  );

  const initAdyenCheckout = useCallback(
    async ({ onAdditionalDetails }: { onAdditionalDetails?: ThreeDS2AuthCallback } = {}) => {
      return import('@adyen/adyen-web').then((module) => {
        const AdyenCheckout = module.default;

        return AdyenCheckout({
          locale: getLocalizationInfo(router.locale).locale,
          environment: 'test',
          clientKey: process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY,
          onAdditionalDetails: (state: { data: Record<string, string> }) => {
            handleOnAdditionalDetails(state).then((response) => {
              onAdditionalDetails?.(response);
            });
          },
        });
      });
    },
    [router.locale, handleOnAdditionalDetails],
  );

  const [paymentData, setPaymentData] = useState<PaymentData>({ type: 'scheme' } as PaymentData);

  const paymentDataIsValid = useMemo(() => {
    if (!paymentData?.type) return false;

    let validationSchema = {} as yup.ObjectSchema<ObjectShape>;

    if (paymentData.type === 'scheme') {
      validationSchema = yup.object().shape({
        holderName: yup.string().required(),
        cvc: yup.string().required().min(3).max(5),
        number: yup.string().required().min(12).max(19),
        expiryMonth: yup.string().required().notOneOf(['MM']),
        expiryYear: yup.string().required().notOneOf(['YY']),
      });
    }

    if (paymentData.type === 'klarna_paynow') {
      validationSchema = yup.object().shape({
        shopperEmail: yup.string().email().required(),
        shopperFirstName: yup.string().required(),
        shopperLastName: yup.string().optional(),
      });
    }

    try {
      validationSchema.validateSync(paymentData);
      return true;
    } catch (err) {
      return false;
    }
  }, [paymentData]);

  const getPaymentMethods = useCallback(async () => {
    const supportedTypes = {
      scheme: { name: 'Credit or Debit Card', image: { src: '/images/credit-debit-card.png' } },
      klarna_paynow: { name: 'Klarna', image: { src: '/images/klarna.png' } },
    } as Record<PaymentMethodType, Partial<PaymentMethod>>;

    const paymentMethods = await adyen.getPaymentMethods();

    return paymentMethods
      .filter((paymentMethod) => paymentMethod.type in supportedTypes)
      .map((paymentMethod) => ({
        ...paymentMethod,
        ...supportedTypes[paymentMethod.type],
      }));
  }, [adyen.getPaymentMethods]); //eslint-disable-line

  const handleThreeDS2Action = useCallback(
    async (action: PaymentAction, cb: ThreeDS2AuthCallback) => {
      const checkout = await initAdyenCheckout({ onAdditionalDetails: cb });

      setIsOverlayActive(true);

      checkout.createFromAction(action, { challengeWindowSize: '02' }).mount('#threeDS2-container');
    },
    [initAdyenCheckout],
  );

  const makePayment = useCallback(
    async (data: Omit<PaymentRequestPayload, 'paymentMethod'>) => {
      const response = await adyen.makePayment({
        ...data,
        paymentMethod: {
          ...paymentData,
          brand: creditCardType((paymentData as SchemeData).number)[0]?.type,
        } as SchemeData,
      } as SchemePaymentRequestPayload);
      return response;
    },
    [adyen.makePayment, paymentData], //eslint-disable-line
  );

  const makeKlarnaPayment = useCallback(
    async (data: Omit<KlarnaPaymentRequestPayload, 'paymentMethod' | 'shopperEmail' | 'shopperName'>) => {
      const pData = paymentData as KlarnaData;

      const response = await adyen.makePayment({
        ...data,
        shopperEmail: pData.shopperEmail,
        shopperName: { firstName: pData.shopperFirstName, lastName: pData.shopperLastName },
        paymentMethod: { type: 'klarna_paynow' },
      } as KlarnaPaymentRequestPayload);

      return response;
    },
    [adyen.makePayment, paymentData], //eslint-disable-line
  );

  return (
    <AdyenContext.Provider
      value={{
        processing,
        setProcessing,
        paymentData,
        makeKlarnaPayment,
        makePayment,
        paymentDataIsValid,
        setPaymentData,
        getPaymentMethods,
        handleThreeDS2Action,
      }}
    >
      {isOverlayActive && <Overlay />}
      <div
        id="threeDS2-container"
        className="fixed top-1/2 left-1/2 z-[999] -translate-x-1/2 -translate-y-1/2 bg-white"
      />
      {children}
    </AdyenContext.Provider>
  );
};

export default AdyenPaymentProvider;
