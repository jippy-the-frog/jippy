"""make id in analysis actually pk

Revision ID: ddf34f03e551
Revises: 90baf2b50ff3
Create Date: 2024-09-23 01:08:01.468695

"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "ddf34f03e551"
down_revision: Union[str, None] = "90baf2b50ff3"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute("ALTER TABLE analysis DROP CONSTRAINT analysis_pkey CASCADE")
    op.create_primary_key("analysis_pkey", "analysis", ["id"])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
