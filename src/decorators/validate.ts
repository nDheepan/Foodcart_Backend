// validators.ts
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'validateMobileNumber', async: false })
export class ValidateMobileNumber implements ValidatorConstraintInterface {
  validate(mobileNumber: number, args: ValidationArguments) {
    
    const isValid = /^\d{10}$/.test(String(mobileNumber)); 
    return isValid;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Mobile number must be a 10-digit number'; }
}
