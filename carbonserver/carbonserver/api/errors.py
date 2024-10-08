from dataclasses import dataclass
from enum import Enum


class EmptyResultException(Exception):
    """
    The request return an empty result.
    """


@dataclass
class ErrorBase:
    code: str
    message: str


class DBErrorEnum(Enum):
    INTEGRITY_ERROR = "INTEGRITY_ERROR"
    DATA_ERROR = "DATA_ERROR"
    PROGRAMMING_ERROR = "PROGRAMMING_ERROR"


class DBError(ErrorBase):
    code: DBErrorEnum


class DBException(Exception):
    def __init__(self, error):
        self.error = error


class UserErrorEnum(str, Enum):
    API_KEY_UNKNOWN = "API_KEY_UNKNOWN"
    API_KEY_DISABLE = "API_KEY_DISABLE"
    FORBIDDEN = "FORBIDDEN"


class UserError(ErrorBase):
    code: DBErrorEnum


class NotAllowedErrorEnum(str, Enum):
    OPERATION_NOT_ALLOWED = "OPERATION_NOT_ALLOWED"
    NOT_IN_ORGANISATION = "NOT_IN_ORGANISATION"


class NotAllowedError(ErrorBase):
    code: NotAllowedErrorEnum


class UserException(Exception):
    def __init__(self, error):
        self.error = error
