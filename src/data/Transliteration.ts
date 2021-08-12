const TransliterationWordType = {
  Hittite: 'hittite',
  Akkadogram: 'akkadogram',
  Sumerogram: 'sumerogram',
  Determination: 'determination',
} as const;

export interface TransliterationWord {
  type: typeof TransliterationWordType[keyof typeof TransliterationWordType];
  transliteration: TransliterationCharacter[];
}

export interface TransliterationCharacter {
  reading: string;
  number: number;
}
