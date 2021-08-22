from lark import Lark, Transformer
from pathlib import Path
import re


CHARACTER_NAME_WITH_NUMBER = re.compile(r'^([a-zA-Z\[\]<>šŠḫḪáÁéÉíÍúÚàÀèÈìÌùÙ]+)([0-9]+)$')

VOEWLS = set(["a", "i", "e", "u"])
ACCENTED_VOEWLS = {
    "a": {
        2: "á",
        3: "à"
    },
    "i": {
        2: "í",
        3: "ì"
    },
    "e": {
        2: "é",
        3: "è"
    },
    "u": {
        2: "ú",
        3: "ù"
    },
    "A": {
        2: "Á",
        3: "À"
    },
    "I": {
        2: "Í",
        3: "Ì"
    },
    "E": {
        2: "É",
        3: "È"
    },
    "U": {
        2: "Ú",
        3: "Ù"
    },
}

def convert_to_hittite_style_transliteration(reading: str, number: int):
    ret = ""

    if number != 2 and number != 3:
        return reading

    replaced = False
    for i in range(0, len(reading)):
        if reading[i].lower() in VOEWLS and not replaced:
            ret += ACCENTED_VOEWLS[reading[i]][number]
            replaced = True
        else:
            ret += reading[i]

    return ret

def detect_number(reading: str):
    for c in reading:
        if c in set("áéíú"):
            return 2
        elif c in set("àèìù"):
            return 3

    return None

class HittiteTranscriptionTransformer(Transformer):
    def start(self, lines):
        return lines

    def lines(self, lines):
        return lines

    def line(self, words):
        return words

    def word_with_determination(self, items):
        return items

    def hittite(self, names):
        return {
            "type": "hittite",
            "transliteration": [
                {
                    "reading": n["reading"].lower(),
                    "number": n["number"]
                } for n in names[0]
            ]
        }

    def akkadogram(self, names):
        return {
            "type": "akkadogram",
            "transliteration": [
                {
                    "reading": n["reading"].upper(),
                    "number": n["number"]
                } for n in names[0]
            ]
        }

    def sumerogram(self, names):
        return {
            "type": "sumerogram",
            "transliteration": [
                {
                    "reading": n["reading"].upper(),
                    "number": n["number"]
                } for n in names[0]
            ]
        }

    def determination(self, names):
        return {
            "type": "determination",
            "transliteration": names[0]
        }

    def word(self, characters_seq):
        # Flatten sequence of characters dict
        # [ [{A}, {B}], [{C}] ] -> [{A}, {B}, {C}]
        return sum(characters_seq, [])

    def annotation_begin(self, token):
        return {
            "reading": token[0].value,
            "number": None
        }

    def annotation_end(self, token):
        return {
            "reading": token[0].value,
            "number": None
        }

    def cuneiform_transliteration(self, tokens):
        return tokens

    def cuneiform_character(self, name_token):
        name_str = name_token[0].value

        match = CHARACTER_NAME_WITH_NUMBER.match(name_str)

        name = {
            "reading": name_str,
            "number": None
        }
        number = None

        if match:
            reading = match.group(1)
            number = int(match.group(2))

            reading = convert_to_hittite_style_transliteration(reading, number)

            name["reading"] = reading

        name["number"] = number or detect_number(name["reading"].lower()) or 1

        name["reading"] = name["reading"].replace("h", "ḫ").replace("H", "Ḫ")
        name["reading"] = name["reading"].replace("sz", "š")
        name["reading"] = name["reading"].replace("SZ", "Š").replace("sZ", "Š").replace("Sz", "Š")

        return name

    def NEWLINE(self, _):
        return None


HITTITE_TRANSCRIPTION_PARSER = Lark.open(
    str(Path(__file__).parent.joinpath("transcription.lark")),
    parser="lalr",
    transformer=HittiteTranscriptionTransformer()
)

HITTITE_TRANSCRIPTION_COMPLEMENTAION_PARSER = Lark.open(
    str(Path(__file__).parent.joinpath("complementation.lark")),
    parser="lalr"
)

def parse_all(sentences :str):
    # Check whether the complementation annotations is sane
    HITTITE_TRANSCRIPTION_COMPLEMENTAION_PARSER.parse(sentences)

    return HITTITE_TRANSCRIPTION_PARSER.parse(sentences)
