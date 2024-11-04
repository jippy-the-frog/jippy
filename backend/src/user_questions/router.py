from http import HTTPStatus
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import with_polymorphic, selectinload
from src.auth.dependencies import get_current_user
from src.auth.models import User
from src.common.dependencies import get_session
from src.events.models import Analysis, Event
from src.notes.models import Note
from src.limits.check_usage import within_usage_limit
from src.user_questions.models import (
    Answer,
    Point,
    PointAnalysis,
    UserQuestion,
)
from src.essay_helper.form_answer import form_answer_analysis_based
from src.user_questions.schemas import (
    CreateUserQuestion,
    UserQuestionDTO,
    UserQuestionMiniDTO,
    ValidationResult,
)
from src.lm.generate_response import generate_response
from src.lm.validate_question import validate_question


router = APIRouter(prefix="/user-questions", tags=["user-questions"])

polymorphic_note = with_polymorphic(Note, "*")


@router.get("/")
def get_user_questions(
    user: Annotated[User, Depends(get_current_user)],
    session=Depends(get_session),
) -> list[UserQuestionMiniDTO]:
    user_questions = session.scalars(
        select(UserQuestion)
        .where(UserQuestion.user_id == user.id)
        .options(selectinload(UserQuestion.answer).selectinload(Answer.points))
    )
    return user_questions


@router.get("/{id}")
def get_user_question(
    id: int,
    user: Annotated[User, Depends(get_current_user)],
    session=Depends(get_session),
) -> UserQuestionDTO:
    user_question = session.scalar(
        select(UserQuestion)
        .where(UserQuestion.id == id)
        .where(UserQuestion.user_id == user.id)
        .options(
            selectinload(UserQuestion.answer)
            .selectinload(Answer.points)
            .selectinload(Point.point_analysises)
            .selectinload(PointAnalysis.analysis)
            .selectinload(Analysis.event)
            .selectinload(Event.original_article),
            selectinload(UserQuestion.answer)
            .selectinload(Answer.points)
            .selectinload(Point.fallback),
            selectinload(UserQuestion.answer)
            .selectinload(Answer.points)
            .selectinload(Point.point_analysises)
            .selectinload(PointAnalysis.analysis)
            .selectinload(Analysis.category),
            selectinload(UserQuestion.answer)
            .selectinload(Answer.points)
            .selectinload(Point.likes),
            selectinload(UserQuestion.answer)
            .selectinload(Answer.points)
            .selectinload(Point.point_analysises)
            .selectinload(PointAnalysis.analysis)
            .selectinload(Analysis.likes),
        )
    )

    if not user_question:
        raise HTTPException(HTTPStatus.NOT_FOUND)

    return user_question


@router.post("/classify")
def classify_question(question: str):
    return validate_question(question)


@router.post("/")
async def create_user_question(
    data: CreateUserQuestion,
    user: Annotated[User, Depends(get_current_user)],
    session=Depends(get_session),
) -> UserQuestionDTO | ValidationResult:
    validation = within_usage_limit(user, session, data.question)

    if not validation.is_valid:
        return validation

    user_question = UserQuestion(question=data.question, user_id=user.id)

    results = await generate_response(data.question)
    answer = form_answer_analysis_based(results)
    user_question.answer = answer

    session.add(user_question)
    session.commit()
    session.refresh(user_question)
    same_user_question = session.scalar(
        select(UserQuestion)
        .where(UserQuestion.id == user_question.id)
        .options(
            selectinload(
                UserQuestion.answer,
                Answer.points,
                Point.point_analysises,
                PointAnalysis.analysis,
                Analysis.event,
                Event.original_article,
            ),
            selectinload(
                UserQuestion.answer,
                Answer.points,
                Point.fallback,
            ),
            selectinload(
                UserQuestion.answer,
                Answer.points,
                Point.point_analysises,
                PointAnalysis.analysis,
                Analysis.category,
            ),
        )
    )

    return same_user_question
