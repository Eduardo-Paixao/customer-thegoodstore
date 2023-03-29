import { useCallback } from 'react';
import useI18n from 'helpers/hooks/useI18n';
import { Address as AccountAddress } from 'types/account';
import { useAccount } from 'frontastic';
import { Address } from '../types';

const useMappers = () => {
  const { account } = useAccount();
  const { country } = useI18n();

  const accountAddressToAddress = useCallback(
    (address: AccountAddress) => {
      return {
        addressId: address.addressId,
        firstName: address.firstName,
        lastName: address.lastName,
        email: account?.email ?? '',
        phone: address.phone,
        line1: address.streetName ?? '',
        line2: address.additionalAddressInfo,
        postalCode: address.postalCode ?? '',
        city: address.city ?? '',
      } as Address;
    },
    [account],
  );

  const addressToAccountAddress = useCallback(
    (address: Address) => {
      return {
        firstName: address.firstName,
        lastName: address.lastName,
        phone: address.phone,
        streetName: address.line1,
        additionalAddressInfo: address.line2,
        postalCode: address.postalCode,
        city: address.city,
        country,
      } as AccountAddress;
    },
    [country],
  );

  return { addressToAccountAddress, accountAddressToAddress };
};

export default useMappers;
