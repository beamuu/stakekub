type ValidatorsQuery = {
  validators: ValidatorInfo[]
}

type ValidatorInfo = {
  profile: ValidatorProfile | null;
  blockSigner: string;
  validatorId: string;
}

type ValidatorProfile = {
  id: string;
  image: string;
  name: string;
}