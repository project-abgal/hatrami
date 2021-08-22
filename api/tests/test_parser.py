from server.parser import HITTITE_TRANSCRIPTION_PARSER


class TestParser:
    def test_full_example_without_complementation(self):
        sentence = 'nu _EGIR_-pa {d}_UTU_-i ha-lu-kan2 pe2-e-da-asz'
        result_expect = [
            [
                [
                    [
                        {'transliteration': [{'number': 1, 'reading': 'nu'}], 'type': 'hittite'}
                    ],
                    [
                        {'transliteration': [{'number': 1, 'reading': 'EGIR'}], 'type': 'sumerogram'},
                        {'transliteration': [{'number': 1, 'reading': 'pa'}], 'type': 'hittite'}
                    ],
                    [
                        {'transliteration': [{'number': 1, 'reading': 'd'}], 'type': 'determination'},
                        {'transliteration': [{'number': 1, 'reading': 'UTU'}], 'type': 'sumerogram'},
                        {'transliteration': [{'number': 1, 'reading': 'i'}], 'type': 'hittite'}
                    ],
                    [
                        {'transliteration': [
                            {'number': 1, 'reading': 'ḫa'},
                            {'number': 1, 'reading': 'lu'},
                            {'number': 2, 'reading': 'kán'}
                        ],'type': 'hittite'}
                    ],
                    [
                        {'transliteration': [
                            {'number': 2, 'reading': 'pé'},
                            {'number': 1, 'reading': 'e'},
                            {'number': 1, 'reading': 'da'},
                            {'number': 1, 'reading': 'aš'}
                        ],'type': 'hittite'}
                    ]
                ]
            ]
        ]
        result = HITTITE_TRANSCRIPTION_PARSER.parse(sentence)

        assert result == result_expect

    def test_full_example_with_complementation(self):
        sentence = '+[um-ma+ {d}_utu]_-+szi+'
        result_expect = [
            [
                [
                    [
                        {'transliteration': [
                            {'number': None, 'reading': '['},
                            {'number': 1, 'reading': 'UM'},
                            {'number': 1, 'reading': 'MA'}
                        ], 'type': 'akkadogram'},
                    ],
                    [
                        {'transliteration': [{'number': 1, 'reading': 'd'}], 'type': 'determination'},
                        {'transliteration': [
                            {'number': 1, 'reading': 'UTU'},
                            {'number': None, 'reading': ']'},
                        ], 'type': 'sumerogram'},
                        {'transliteration': [{'number': 1, 'reading': 'ŠI'}], 'type': 'akkadogram'}
                    ],
                ]
            ]
        ]
        result = HITTITE_TRANSCRIPTION_PARSER.parse(sentence)

        assert result == result_expect
