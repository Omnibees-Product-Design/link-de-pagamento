export const reservation = {
  hotelName: "Blue Tree Premium Congonhas Airport",
  roomType: "Quarto Superior Duplo",
  cancellationNote: "Cancelamento grátis antes de 6 jun 2024",
  bookingNumber: "RES024562-12648",
  guestName: "Alberto Roberto",
  checkIn: "08/06/2024",
  checkOut: "10/06/2024",
  nights: 2,
  amount: "R$ 5.000,00",
  taxesAndFees: "R$ 120,00",
  installments: "Em 2x de R$ 2.560,00 sem juros",
  total: "R$ 5.120,00",
};

/** Opções de parcelamento — mesma tabela do protótipo (prototypes/v3.html, parc-dropdown). */
export const installmentOptions = [
  { n: 1, valueLabel: "R$ 5.120,00", rateLabel: "sem juros" },
  { n: 2, valueLabel: "R$ 2.560,00", rateLabel: "sem juros" },
  { n: 3, valueLabel: "R$ 1.706,67", rateLabel: "sem juros" },
  { n: 4, valueLabel: "R$ 1.337,20", rateLabel: "1,99% a.m." },
  { n: 5, valueLabel: "R$ 1.081,25", rateLabel: "1,99% a.m." },
  { n: 6, valueLabel: "R$ 909,87", rateLabel: "1,99% a.m." },
  { n: 10, valueLabel: "R$ 563,50", rateLabel: "2,49% a.m." },
  { n: 12, valueLabel: "R$ 476,22", rateLabel: "2,49% a.m." },
];
