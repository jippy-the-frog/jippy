"""move table back

Revision ID: 37cf2356fe08
Revises: c3b7f848f6f3
Create Date: 2024-09-23 01:20:37.025966

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "37cf2356fe08"
down_revision: Union[str, None] = "c3b7f848f6f3"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "analysis",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("event_id", sa.Integer(), nullable=False),
        sa.Column("category_id", sa.Integer(), nullable=False),
        sa.Column("content", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(
            ["category_id"],
            ["category.id"],
        ),
        sa.ForeignKeyConstraint(
            ["event_id"],
            ["event.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.drop_table("analysis1")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "analysis1",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column("event_id", sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column("category_id", sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column("content", sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.ForeignKeyConstraint(
            ["category_id"], ["category.id"], name="analysis1_category_id_fkey"
        ),
        sa.ForeignKeyConstraint(
            ["event_id"], ["event.id"], name="analysis1_event_id_fkey"
        ),
        sa.PrimaryKeyConstraint("id", name="analysis1_pkey"),
    )
    op.drop_table("analysis")
    # ### end Alembic commands ###
