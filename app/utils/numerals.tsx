import Numeral from 'numeral';

import { Format } from '#/types/Format';
import 'numeral/locales/pt-br';

export class Numerals {
  static formatPercentage(number: number, round = false) {
    const mask = round ? '0%' : '0.00%';
    return Numeral(number / 100).format(mask);
  }

  static formatPercentageWithSign(number: number) {
    return Numeral(number / 100).format('+0.00%');
  }

  static formatCurrency(number: number) {
    return Numeral(number).format('$0.0,00');
  }

  static formatWithUnit(number: number, unit?: string) {
    return `${this.formatNumber(number)}${unit}`;
  }

  static formatNumber(number: number) {
    return Numeral(number).format('0,0[.]0');
  }

  static format(number: number, format: Format, unit?: string) {
    Numeral.locale('pt-br');

    switch (format) {
      case Format.percentage:
        return this.formatPercentage(number);
      case Format.percentageWithSign:
        return this.formatPercentageWithSign(number);
      case Format.currency:
        return this.formatCurrency(number);
      case Format.unit:
        return unit
          ? this.formatWithUnit(number, unit)
          : this.formatNumber(number);
      default:
        return this.formatNumber(number);
    }
  }
}
