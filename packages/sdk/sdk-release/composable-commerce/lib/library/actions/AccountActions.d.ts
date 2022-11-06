import { Account } from "@commercetools/domain-types/account/Account";
import { LoginAccountPayload, RegisterAccountPayload, ConfirmAccountPayload, RequestAccountConfirmationEmailPayload, ChangeAccountPasswordPayload, RequestAccountPasswordResetPayload, ResetAccountPasswordPayload, UpdateAccountPayload, AddAccountAddressPayload, UpdateAccountAddressPayload, RemoveAccountAddressPayload, SetDefaultAccountBillingAddressPayload, SetDefaultAccountShippingAddressPayload } from "../payloads/AccountPayloads";
declare type GetAccountAction = () => Promise<{
    loggedIn: boolean;
    account?: Account;
    error?: Error;
}>;
declare type LoginAccountAction = (payload: LoginAccountPayload) => Promise<Account>;
declare type LogoutAccountAction = () => Promise<void>;
declare type RegisterAccountAction = (payload: RegisterAccountPayload) => Promise<Account>;
declare type ConfirmAccountAction = (payload: ConfirmAccountPayload) => Promise<Account>;
declare type RequestAccountConfirmationEmailAction = (payload: RequestAccountConfirmationEmailPayload) => Promise<void>;
declare type ChangeAccountPasswordAction = (payload: ChangeAccountPasswordPayload) => Promise<Account>;
declare type RequestAccountPasswordResetAction = (payload: RequestAccountPasswordResetPayload) => Promise<void>;
declare type ResetAccountPasswordAction = (payload: ResetAccountPasswordPayload) => Promise<Account>;
declare type UpdateAccountAction = (payload: UpdateAccountPayload) => Promise<Account>;
declare type AddAccountAddressAction = (payload: AddAccountAddressPayload) => Promise<Account>;
declare type UpdateAccountAddressAction = (payload: UpdateAccountAddressPayload) => Promise<Account>;
declare type RemoveAccountAddressAction = (payload: RemoveAccountAddressPayload) => Promise<Account>;
declare type SetDefaultAccountBillingAddressAction = (payload: SetDefaultAccountBillingAddressPayload) => Promise<Account>;
declare type SetDefaultAccountShippingAddressAction = (payload: SetDefaultAccountShippingAddressPayload) => Promise<Account>;
export { GetAccountAction, LoginAccountAction, LogoutAccountAction, RegisterAccountAction, ConfirmAccountAction, RequestAccountConfirmationEmailAction, ChangeAccountPasswordAction, RequestAccountPasswordResetAction, ResetAccountPasswordAction, UpdateAccountAction, AddAccountAddressAction, UpdateAccountAddressAction, RemoveAccountAddressAction, SetDefaultAccountBillingAddressAction, SetDefaultAccountShippingAddressAction };
