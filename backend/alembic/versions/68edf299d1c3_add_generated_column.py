"""Add generated column

Revision ID: 68edf299d1c3
Revises: 07e88ab50c98
Create Date: 2024-11-06 23:36:44.199496

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "68edf299d1c3"
down_revision: Union[str, None] = "07e88ab50c98"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "point",
        sa.Column("generated", sa.Boolean(), server_default="true", nullable=False),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("point", "generated")
    # ### end Alembic commands ###
