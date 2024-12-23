from datetime import datetime
from http import HTTPStatus
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from src.auth.dependencies import get_current_user
from src.auth.models import User
from src.common.dependencies import get_session
from src.essays.dependencies import has_essay_tries_left
from src.essays.models import (
    Comment,
    CommentAnalysis,
    Essay,
    Paragraph,
)
from src.lm.generate_essay_comments import (
    get_essay_comments,
    get_paragraph_comments_async,
)

from src.essays.schemas import EssayCreate, EssayCreateDTO, EssayDTO, EssayMiniDTO
from sqlalchemy.orm import Session, selectinload
from src.events.models import Analysis
from src.likes.models import Like


router = APIRouter(prefix="/essays", tags=["essays"])


@router.post("/")
async def create_essay(
    data: EssayCreate,
    user: Annotated[User, Depends(get_current_user)],
    session: Annotated[Session, Depends(get_session)],
    _=Depends(has_essay_tries_left),
) -> EssayCreateDTO:
    if len(data.paragraphs) > 20:
        raise HTTPException(
            HTTPStatus.BAD_REQUEST,
            detail="The maximum number of paragraphs is 20",
        )
    essay = Essay(question=data.question, user_id=user.id)

    paragraphs = []
    for paragraph in data.paragraphs:
        paragraphs.append(paragraph.content)

    paragraph_comments = await get_paragraph_comments_async(data.paragraphs, essay)
    essay.paragraphs = paragraph_comments
    essay.comments = await get_essay_comments(paragraphs, data.question)

    session.add(essay)
    session.commit()
    return {"essay_id": essay.id}


@router.get("/")
def get_essays(
    user: Annotated[User, Depends(get_current_user)],
    session: Annotated[Session, Depends(get_session)],
) -> list[EssayMiniDTO]:
    essays = session.scalars(
        select(Essay)
        .where(Essay.user_id == user.id)
        .options(
            selectinload(Essay.paragraphs).selectinload(Paragraph.comments),
        )
    )
    return essays


@router.get("/{id}")
def get_essay(
    id: int,
    user: Annotated[User, Depends(get_current_user)],
    session: Annotated[Session, Depends(get_session)],
) -> EssayDTO:
    essay = session.scalar(
        select(Essay)
        .where(Essay.id == id)
        .where(Essay.user_id == user.id)
        .options(
            selectinload(Essay.paragraphs)
            .selectinload(Paragraph.comments)
            .selectinload(Comment.likes),
            selectinload(Essay.paragraphs)
            .selectinload(Paragraph.comments)
            .selectinload(Comment.comment_analysises)
            .selectinload(CommentAnalysis.analysis)
            .selectinload(Analysis.category),
            selectinload(Essay.paragraphs)
            .selectinload(Paragraph.comments)
            .selectinload(Comment.comment_analysises)
            .selectinload(CommentAnalysis.analysis)
            .selectinload(Analysis.event),
            selectinload(Essay.paragraphs)
            .selectinload(Paragraph.comments)
            .selectinload(Comment.comment_analysises)
            .selectinload(CommentAnalysis.analysis)
            .selectinload(
                Analysis.likes.and_(Like.point_id.is_(None)).and_(
                    Like.user_id == user.id
                ),
            ),
            selectinload(Essay.comments)
            .selectinload(Comment.comment_analysises)
            .selectinload(CommentAnalysis.analysis)
            .selectinload(Analysis.category),
            selectinload(Essay.comments)
            .selectinload(Comment.comment_analysises)
            .selectinload(CommentAnalysis.analysis)
            .selectinload(Analysis.event),
            selectinload(Essay.comments)
            .selectinload(Comment.comment_analysises)
            .selectinload(CommentAnalysis.analysis)
            .selectinload(
                Analysis.likes.and_(Like.point_id.is_(None)).and_(
                    Like.user_id == user.id
                )
            ),
        )
    )
    if not essay:
        raise HTTPException(HTTPStatus.NOT_FOUND)

    return essay


@router.delete("/{id}")
def delete_essay(
    id: int,
    user: Annotated[User, Depends(get_current_user)],
    session: Annotated[Session, Depends(get_session)],
) -> EssayDTO:
    essay = session.scalar(
        select(Essay).where(Essay.id == id).where(Essay.user_id == user.id)
    )
    if not essay:
        raise HTTPException(HTTPStatus.NOT_FOUND)

    essay.deleted_at = datetime.now()
    session.add(essay)
    session.commit()

    return
