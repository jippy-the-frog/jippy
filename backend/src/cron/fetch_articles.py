from datetime import datetime
import httpx

from src.common.constants import GUARDIAN_API_KEY
from sqlalchemy import select
from src.events.models import Article, ArticleSource
from src.common.database import engine
from sqlalchemy.orm import Session
from src.scrapers.guardian.process import GuardianArticle, GuardianArticleFields


def query_page(page: int, date):
    response = httpx.get(
        "https://content.guardianapis.com/search",
        params={
            "api-key": GUARDIAN_API_KEY,
            "page-size": 50,
            "page": page,
            "lang": "en",
            "show-fields": ["all"],
            "from-date": date,
        },
    )
    response_json = response.json()
    data = response_json["response"]
    if data["status"] != "ok":
        print("something went wrong with page:", page)
        return []
    return data["results"]


def get_today_articles():
    result = []
    cur_date = datetime.now().date()
    for i in range(1, 11):
        new_batch = query_page(i, cur_date)
        if len(new_batch) < 50:
            print(f"On page {i}, only got {len(new_batch)} articles. Stopping.")
            result += new_batch
            break
        print(f"On page {i}, got {len(new_batch)} articles")
        result += new_batch

    return result


def form_guardian_artilcle_obj(article: dict):
    article_obj = GuardianArticle(
        fields=GuardianArticleFields(
            bodyText=article["fields"]["bodyText"],
            trailText=article["fields"]["trailText"],
            thumbnail=article["fields"]["thumbnail"],
        ),
        webUrl=article["webUrl"],
        webTitle=article["webTitle"],
        webPublicationDate=article["webPublicationDate"],
    )
    return article_obj


def add_daily_articles_to_db(article: GuardianArticle):
    with Session(engine) as session:
        query_article = session.scalars(
            select(Article).where(
                Article.title == article.webTitle,
                Article.source == ArticleSource.GUARDIAN,
                Article.date == article.webPublicationDate,
                Article.url == article.webUrl,
            )
        ).first()

        if query_article:
            print(f"Article {article.webTitle} already exists in database")
            return False

        try:
            article_orm = Article(
                title=article.webTitle,
                summary=article.fields.trailText if article.fields.trailText else "",
                url=article.webUrl,
                source=ArticleSource.GUARDIAN,
                body=article.fields.bodyText,
                date=article.webPublicationDate,
                image_url=article.fields.thumbnail or "",
            )
            session.add(article_orm)
            session.commit()
            print(
                f"Added {article.webTitle} to database at {article.webPublicationDate}"
            )
        except Exception as e:
            print(f"Something went wrong with article {article.webTitle}")
            print(e)
            return False


def populate_daily_articles():
    articles = get_today_articles()
    articles = articles[:1]
    for article in articles:
        article_obj = form_guardian_artilcle_obj(article)
        add_daily_articles_to_db(article_obj)


if __name__ == "__main__":
    populate_daily_articles()
