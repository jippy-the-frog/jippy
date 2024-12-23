"""Unset stripe_session.subscription_id foreign key constraint

Revision ID: 3b7cc72ac8de
Revises: 5b3d1b5c303e
Create Date: 2024-10-24 22:58:55.652730

"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "3b7cc72ac8de"
down_revision: Union[str, None] = "5b3d1b5c303e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(
        "stripe_session_subscription_id_fkey", "stripe_session", type_="foreignkey"
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(
        "stripe_session_subscription_id_fkey",
        "stripe_session",
        "subscription",
        ["subscription_id"],
        ["id"],
    )
    # ### end Alembic commands ###
