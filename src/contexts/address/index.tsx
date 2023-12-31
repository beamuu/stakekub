import { stakingPlatform } from "@/lib/graphql/staking";
import { FC, createContext, useContext, useEffect, useState } from "react";

type AddressContext = {
  validators: ValidatorInfo[];
  getValidator: (signer: string) => ValidatorInfo | null;
};

const defaultAddressContextValue: AddressContext = {
  validators: [],
  getValidator: () => null,
};

export const addressContext = createContext<AddressContext>(
  defaultAddressContextValue
);

type AddressProviderProps = {
  children: any;
};

export const AddressProvider: FC<AddressProviderProps> = ({ children }) => {
  const [validators, setValidators] = useState<ValidatorInfo[]>([]);

  async function fetchValidatorsInfo() {
    const validators = await stakingPlatform.getAllValidatorsInfo();
    setValidators(validators);
  }

  function getValidator(signer: string) {
    for (const each of validators) {
      if (each.blockSigner.toLowerCase() === signer.toLowerCase()) {
        return each;
      }
    }
    return null;
  }

  useEffect(() => {
    fetchValidatorsInfo();
  }, []);
  return (
    <addressContext.Provider
      value={{
        validators,
        getValidator,
      }}
    >
      {children}
    </addressContext.Provider>
  );
};

export const useAddress = () => useContext(addressContext);