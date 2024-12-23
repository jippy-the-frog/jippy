from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey
from enum import Enum
from src.common.base import Base


class TierNames(str, Enum):
    FREE = "FREE"
    ADMIN = "ADMIN"
    PREMIUM = "PREMIUM"
    UNVERIFIED = "UNVERIFIED"


class Usage(Base):
    __tablename__ = "usage"

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), primary_key=True)
    gp_question_asked: Mapped[int] = mapped_column(default=0, server_default="0")
    essays: Mapped[int] = mapped_column(default=0, server_default="0")


class Tier(Base):
    __tablename__ = "tier"

    id: Mapped[int] = mapped_column(primary_key=True)
    tier_name: Mapped[TierNames]
    label: Mapped[str]
    gp_question_limit: Mapped[int]
    essay_limit: Mapped[int] = mapped_column(server_default="0")
