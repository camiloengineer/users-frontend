import { AbstractControl } from '@angular/forms';


export function DNIValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value && control.value.length > 2) {
    const dni = control.value.replace('-', '').replace(/\./g, '');
    const cuerpo = dni.slice(0, -1);
    const originalDigit = dni.slice(-1).toUpperCase();

    let factor = 2;
    let addition = 0;
    let l = dni.length - 1;

    while (l--) {
      addition += +dni[l] * factor;
      factor = factor === 7 ? 2
        : ++factor;
    }
    let digitCalculated: any = 11 - (addition % 11);
    digitCalculated = digitCalculated === 11 ? 0
      : (digitCalculated === 10 ? 'K' : digitCalculated);

    if (digitCalculated.toString() !== originalDigit) { return { dni: true }; }
  }
  return null;
}