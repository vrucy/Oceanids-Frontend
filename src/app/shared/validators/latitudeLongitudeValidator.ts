import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function latitudeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value === null || value === undefined || value === '') {
            return null;
        }
        const lat = parseFloat(value);
        return !isNaN(lat) && lat >= -90 && lat <= 90 ? null : { invalidLatitude: true };
    };
}

export function longitudeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value === null || value === undefined || value === '') {
            return null;
        }
        const lng = parseFloat(value);
        return !isNaN(lng) && lng >= -180 && lng <= 180 ? null : { invalidLongitude: true };
    };
}