from pydantic import BaseModel

class TranscriptionSchema(BaseModel):
    language: str
    content: str

    class Config:
        schema_extra = {
            "example": {
                "language": "hittite",
                "content": "nu _NINDA_-an e-ez-za-at-te-ni wa-a-tar-ma e-ku-ut-te-ni"
            }
        }
