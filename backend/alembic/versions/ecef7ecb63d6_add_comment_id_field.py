"""Add comment_id field

Revision ID: ecef7ecb63d6
Revises: f1dc8d2f4fc1
Create Date: 2024-10-27 21:01:16.598470

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "ecef7ecb63d6"
down_revision: Union[str, None] = "f1dc8d2f4fc1"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("like", sa.Column("comment_id", sa.Integer(), nullable=True))
    op.create_foreign_key(None, "like", "comment", ["comment_id"], ["id"])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "like", type_="foreignkey")
    op.drop_column("like", "comment_id")
    # ### end Alembic commands ###
