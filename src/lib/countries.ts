// Lista de países + DDI — porta o combo-pais e o mapa COUNTRY_DDI
// (prototypes/v3.html). Usada pelo CountryField (pesquisável) e pelo
// PhoneField (selector de código do país).

export type Country = { iso: string; label: string; ddi: string };

export const COUNTRIES: Country[] = [
  { iso: 'BR', label: 'Brasil', ddi: '+55' },
  { iso: 'AR', label: 'Argentina', ddi: '+54' },
  { iso: 'BO', label: 'Bolívia', ddi: '+591' },
  { iso: 'CL', label: 'Chile', ddi: '+56' },
  { iso: 'CO', label: 'Colômbia', ddi: '+57' },
  { iso: 'EC', label: 'Equador', ddi: '+593' },
  { iso: 'MX', label: 'México', ddi: '+52' },
  { iso: 'PY', label: 'Paraguai', ddi: '+595' },
  { iso: 'PE', label: 'Peru', ddi: '+51' },
  { iso: 'UY', label: 'Uruguai', ddi: '+598' },
  { iso: 'VE', label: 'Venezuela', ddi: '+58' },
  { iso: 'US', label: 'Estados Unidos', ddi: '+1' },
  { iso: 'PT', label: 'Portugal', ddi: '+351' },
  { iso: 'ES', label: 'Espanha', ddi: '+34' },
  { iso: 'DE', label: 'Alemanha', ddi: '+49' },
  { iso: 'FR', label: 'França', ddi: '+33' },
  { iso: 'IT', label: 'Itália', ddi: '+39' },
  { iso: 'GB', label: 'Reino Unido', ddi: '+44' },
  { iso: 'JP', label: 'Japão', ddi: '+81' },
  { iso: 'CN', label: 'China', ddi: '+86' },
];
