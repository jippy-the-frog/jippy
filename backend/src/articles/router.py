from datetime import datetime
from http import HTTPStatus
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_, select
from sqlalchemy.orm import Session, selectinload
from src.articles.dependencies import retrieve_article
from src.auth.dependencies import get_current_user
from src.auth.models import User
from src.common.dependencies import get_session
from src.common.schemas import IndexResponse
from src.events.models import (
    Article,
    ArticleBookmark,
    Category,
    Event,
    TopArticleGroup,
    UserReadArticle,
)
from src.events.schemas import ArticleDTO, MiniArticleDTO


router = APIRouter(prefix="/articles", tags=["articles"])


@router.get("/")
def get_articles(
    user: Annotated[User, Depends(get_current_user)],
    session: Annotated[Session, Depends(get_session)],
    start_date: Annotated[datetime | None, Query()] = None,
    end_date: Annotated[datetime | None, Query()] = None,
    category_ids: Annotated[list[int] | None, Query()] = None,
    search: Annotated[str | None, Query()] = None,
    limit: int | None = None,
    offset: int | None = None,
    bookmarks: bool = False,
    singapore_only: bool = False,
) -> IndexResponse[MiniArticleDTO]:
    query = select(Article.id).distinct()

    query = query.where(Article.useless == False)  # noqa: E712

    # Scuffed fix for articles with no events
    query = query.where(Article.original_events.any())  # noqa: E712

    if start_date is not None:
        query = query.where(Article.date >= start_date)
    if end_date is not None:
        query = query.where(Article.date <= end_date)
    if singapore_only:
        query = query.where(Article.original_events.any(Event.is_singapore == True))  # noqa: E712
    if category_ids:
        query = query.where(Article.categories.any(Category.id.in_(category_ids)))
    if bookmarks:
        query = query.where(Article.bookmarks.any(ArticleBookmark.user_id == user.id))
    if search:
        query = query.where(
            or_(Article.title.ilike(f"%{search}"), Article.summary.ilike(f"%{search}%"))
        )

    relevant_ids = [id for id in session.scalars(query)]

    total_count = len(relevant_ids)

    article_query = (
        select(Article)
        .options(
            selectinload(Article.categories),
            selectinload(Article.bookmarks.and_(ArticleBookmark.user_id == user.id)),
        )
        .where(Article.id.in_(relevant_ids))
    )
    if limit is not None:
        article_query = article_query.limit(limit)
    if offset is not None:
        offset = max(0, offset)
        article_query = article_query.offset(offset)

    article_query = article_query.order_by(Article.date.desc())

    articles = session.scalars(article_query).all()

    return IndexResponse[MiniArticleDTO](
        total_count=total_count, count=len(articles), data=articles
    )


@router.get("/top")
def get_top_articles(
    singapore_only: bool,
    _: Annotated[User, Depends(get_current_user)],
    session=Depends(get_session),
) -> list[MiniArticleDTO]:
    """Get events of the most recent top_article_group"""
    top_article_group = session.scalar(
        select(TopArticleGroup)
        .where(TopArticleGroup.singapore_only == singapore_only)
        .order_by(TopArticleGroup.date.desc(), TopArticleGroup.id.desc())
        .limit(1)
        .options(
            selectinload(TopArticleGroup.articles).selectinload(Article.categories),
        )
    )

    if not top_article_group:
        raise HTTPException(HTTPStatus.NOT_FOUND)

    return top_article_group.articles


@router.get("/{id}")
def get_article(article: Annotated[Article, Depends(retrieve_article)]) -> ArticleDTO:
    return article


@router.post("/{id}/bookmarks")
def add_bookmark(
    id: int,
    user: Annotated[User, Depends(get_current_user)],
    article: Annotated[Article, Depends(retrieve_article)],
    session: Annotated[Session, Depends(get_session)],
):
    bookmark = session.scalar(
        select(ArticleBookmark)
        .where(ArticleBookmark.user_id == user.id)
        .where(ArticleBookmark.article_id == id)
    )
    if bookmark:
        return
    article.bookmarks.append(ArticleBookmark(user_id=user.id))
    session.add(article)
    session.commit()


@router.delete("/{id}/bookmarks")
def delete_bookmark(
    id: int,
    user: Annotated[User, Depends(get_current_user)],
    session: Annotated[Session, Depends(get_session)],
    _=Depends(retrieve_article),
):
    bookmark = session.scalar(
        select(ArticleBookmark)
        .where(ArticleBookmark.user_id == user.id)
        .where(ArticleBookmark.article_id == id)
    )
    if bookmark:
        session.delete(bookmark)
        session.commit()


@router.post("/{id}/read")
def read_article(
    id: int,
    user: Annotated[User, Depends(get_current_user)],
    _=Depends(retrieve_article),
    session=Depends(get_session),
):
    read_article = session.scalars(
        select(UserReadArticle)
        .where(UserReadArticle.article_id == id)
        .where(UserReadArticle.user_id == user.id)
    ).first()

    if read_article:
        read_article.last_read = datetime.now()
    else:
        date = datetime.now()
        read_article = UserReadArticle(
            article_id=id,
            user_id=user.id,
            first_read=date,
            last_read=date,
        )
    session.add(read_article)
    session.commit()
    return
