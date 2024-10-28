"""user_add_last_accessed_col

Revision ID: 09a561eb1f1c
Revises: 61b03cca7e85
Create Date: 2024-10-28 07:57:39.502755

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "09a561eb1f1c"
down_revision: Union[str, None] = "61b03cca7e85"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("like", "article_concept.article_id")
    op.drop_column("like", "article_concept.concept_id")
    op.add_column(
        "user",
        sa.Column(
            "last_accessed",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("user", "last_accessed")
    op.add_column(
        "like",
        sa.Column(
            "article_concept.concept_id",
            sa.INTEGER(),
            autoincrement=False,
            nullable=True,
        ),
    )
    op.add_column(
        "like",
        sa.Column(
            "article_concept.article_id",
            sa.INTEGER(),
            autoincrement=False,
            nullable=True,
        ),
    )
    # ### end Alembic commands ###