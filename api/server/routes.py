from io import BytesIO

from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from lark import UnexpectedInput

from .parser import HITTITE_TRANSCRIPTION_PARSER
from .model import TranscriptionSchema
from .output import output_docx

router = APIRouter()

@router.post("/")
def parse_transliteration(transliteration: TranscriptionSchema) -> dict:
    content = transliteration.content.strip()
    if content:
        try:
            result = HITTITE_TRANSCRIPTION_PARSER.parse(content)
            formatted = [s for s in result[0] if s is not None]
            return {
                'transliteration': formatted
            }
        except UnexpectedInput as parse_error:
            # Invalid transliteration
            raise HTTPException(
                status_code=400,
                detail={
                    'context': parse_error.get_context(content),
                    'line': parse_error.line,
                    'column': parse_error.column
                }
            )

    return {
        'transliteration': []
    }

@router.post(
    "/download",
    responses = {
        200: {
            "content": {"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {}}
        }
    },
    response_class=Response
)
def get_as_docx(
    transliteration: TranscriptionSchema
):
    content = transliteration.content.strip()
    if content:
        try:
            result = HITTITE_TRANSCRIPTION_PARSER.parse(content)
            formatted = [s for s in result[0] if s is not None]

            # Output docx
            file_io = BytesIO()
            output_docx(formatted, file_io)
            file_io.seek(0)

            return Response(
                content=file_io.read(),
                media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            )
        except UnexpectedInput as parse_error:
            # Invalid transliteration
            raise HTTPException(
                status_code=400,
                detail={
                    'context': parse_error.get_context(content),
                    'line': parse_error.line,
                    'column': parse_error.column
                }
            )

    raise HTTPException(
        status_code=400,
        detail={
            'message': 'Empty transliteration'
        }
    )
