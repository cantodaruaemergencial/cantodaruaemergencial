export const RulesMessages: any = (quantity?: string) => {
  return {
    required: 'Campo obrigatório.',
    invalidDate: 'Formato de data inválido.',
    maxDate: 'A data não deve exceder a data máxima.',
    minLength: `Necessário ${quantity} dígitos.`,
    noFutureDate: `Futuro.`,
  };
};
