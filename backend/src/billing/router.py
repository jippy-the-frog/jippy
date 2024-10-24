from datetime import datetime
from http import HTTPStatus
import traceback
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Request, Header, Response
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from src.auth.dependencies import add_current_user, get_current_user
from src.auth.models import User
from src.billing.models import StripeSession
from src.common.constants import FRONTEND_URL, STRIPE_API_KEY, STRIPE_WEBHOOK_SECRET
from src.common.dependencies import get_session
from src.subscriptions.models import Subscription
from .schemas import CheckoutRequestData
import stripe

FRONTEND_BILLING_URL_PATH = "user/billing"
stripe.api_key = STRIPE_API_KEY
router = APIRouter(prefix="/billing", tags=["billing"])
routerWithAuth = APIRouter(
    prefix="/billing", tags=["billing"], dependencies=[Depends(add_current_user)]
)

@routerWithAuth.post("/create-checkout-session")
async def create_checkout_session(
    request_data: CheckoutRequestData,
    user: Annotated[User, Depends(get_current_user)],
    session=Depends(get_session),
):
    price_id = request_data.price_id
    tier_id = request_data.tier_id

    try:
        checkout_session = stripe.checkout.Session.create(
            client_reference_id=str(user.id),
            payment_method_types=["card"],
            mode="subscription",
            line_items=[
                {
                    "price": price_id,
                    "quantity": 1,
                }
            ],
            success_url=f"""{FRONTEND_URL}/{FRONTEND_BILLING_URL_PATH}/?success=true&session_id={{CHECKOUT_SESSION_ID}}""",
            cancel_url=f"""{FRONTEND_URL}/{FRONTEND_BILLING_URL_PATH}/?cancelled=true""",
        )

        # Create new stripe session object
        stripe_session_id = checkout_session.id
        user_id = user.id
        new_stripe_session = StripeSession(
            id=stripe_session_id,
            user_id=user_id,
            tier_id=tier_id,
            # Subscription ID isn't available yet, so it'll be updated later by webhook event handler
        )
        # Save new stripe session to database
        session.add(new_stripe_session)
        session.commit()
        session.refresh(new_stripe_session)

        # Return stripe checkout URL to frontend for redirect
        return RedirectResponse(
            url=checkout_session.url if checkout_session.url else "",
            status_code=HTTPStatus.SEE_OTHER,
        )
    except Exception as e:
        raise HTTPException(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/webhook")
async def stripe_webhook(
    request: Request,
    stripe_signature: str = Header(None, alias="Stripe-Signature"),
    session=Depends(get_session),
):
    payload = await request.body()
    webhook_secret = STRIPE_WEBHOOK_SECRET

    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, webhook_secret
        )
        event_type = event["type"]
    except ValueError as e:
        # Invalid payload
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST, detail=f"""Invalid payload: {e}"""
        )
    except stripe.error.SignatureVerificationError as e:  # type: ignore
        # Invalid signature
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST, detail=f"""Invalid signature: {e}"""
        )

    try:
        if event_type == "checkout.session.completed":
            handle_checkout_completed(event, session)
        elif event_type == "invoice.created":
            handle_invoice_created(event)
        elif event_type == "invoice.paid":
            handle_payment_success(event)
        elif event_type == "invoice.payment_failed":
            handle_payment_failure(event)
        elif event_type == "customer.subscription.created":
            handle_subscription_created(event, session)
        elif event_type == "customer.subscription.deleted":
            handle_subscription_canceled(event, session)
        elif event_type == "customer.subscription.paused":
            handle_subscription_paused(event, session)
        elif event_type == "customer.subscription.resumed":
            handle_subscription_resumed(event, session)
        elif event_type == "customer.subscription.updated":
            handle_subscription_updated(event, session)
        elif event_type == "charge.dispute.created":
            handle_charge_dispute_created(event)
        elif event_type == "charge.dispute.closed":
            handle_charge_dispute_closed(event)
        else:
            # Unable to handle given event type, so respond that it's not implemented
            raise HTTPException(
                status_code=HTTPStatus.NOT_IMPLEMENTED,
                detail=f"""Unable to handle event type: {event_type}""",
            )

        # Processed given webhook event successfully, so return success status with HTTP response status code 200
        return Response(content='{"status": "success"}', media_type="application/json", status_code=HTTPStatus.OK)
    
    except HTTPException as exc:
        # Rethrow any HTTP exceptions unmodified so we don't override the status code with HTTP status 500 in the catch block below
        raise exc
    
    except Exception as exc:
        print(f"""ERROR processing webhook event type {event_type}: """)
        traceback.print_exception(exc)
        # Indicate to the caller that an error occurred with HTTP 500 status code
        raise HTTPException(
            status_code=HTTPStatus.INTERNAL_SERVER_ERROR, detail=str(exc)
        )


def handle_checkout_completed(event, session):
    checkout_session: stripe.checkout.Session = event["data"]["object"]
    update_subscription_for(checkout_session, session)


def handle_invoice_created(event):
    invoice_id: str = event["data"]["object"]["id"]
    try:
        # Call Stripe API to finalise invoice automatically so that subscription payment is charged timely
        stripe.Invoice.finalize_invoice(invoice_id)
    except stripe.error.StripeError as stripe_err:
        print(f"""ERROR: Failed to finalize invoice with ID {invoice_id}:""")
        # Print stack trace to help with debugging
        traceback.print_exception(stripe_err)
        # Notify the caller that an error occurred while finalizing invoice with HTTP 500 status code and exception string
        raise HTTPException(
            status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            detail=f"""Error finalizing invoice with ID {invoice_id}: {stripe_err}""",
        )


def handle_payment_success(event):
    # Subscription renewed successfully, update your database to reflect payment success
    pass


def handle_payment_failure(event):
    # Notify user of payment failure or retry logic
    pass


def handle_subscription_created(event, session):
    checkout_session = event["data"]["object"]
    update_subscription_for(checkout_session, session)
    # TODO: Update user tier_id


def handle_subscription_canceled(event, session):
    checkout_session = event["data"]["object"]
    update_subscription_for(checkout_session, session)
    # TODO: Update user tier_id


def handle_subscription_paused(event, session):
    checkout_session = event["data"]["object"]
    update_subscription_for(checkout_session, session)
    # TODO: Consider how to notify the frontend about this


def handle_subscription_resumed(event, session):
    checkout_session = event["data"]["object"]
    update_subscription_for(checkout_session, session)
    # TODO: Consider how to notify the frontend about this


def handle_subscription_updated(event, session):
    checkout_session = event["data"]["object"]
    update_subscription_for(checkout_session, session)
    # TODO: Update user tier_id if needed


def handle_charge_dispute_created(event):
    # Update user subscription status to paused
    pass


def handle_charge_dispute_closed(event):
    # Update user subscription status based on whether customer won or we won
    pass


def update_session(checkout_session: stripe.checkout.Session, session):
    if checkout_session["mode"] != "subscription":
        print(f"""ERROR: Invalid session mode received when processing checkout session: {checkout_session["mode"]}""")
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail=f"""Invalid mode received in checkout handler: {checkout_session["mode"]}""",
        )
    if not checkout_session["subscription"]:
        print(f"""ERROR: Invalid subscription ID received when processing checkout session: {checkout_session["subscription"]}""")
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail=f"""Invalid subscription ID received in checkout handler: {checkout_session["subscription"]}""",
        )
    if not checkout_session["customer"]:
        print(f"""ERROR: Invalid customer ID received when processing checkout session: {checkout_session["customer"]}""")
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail=f"""Invalid customer ID received in checkout handler: {checkout_session["customer"]}""",
        )
    # Update stripe_session table to with updated subscription data from stripe
    subscription_id: str = str(checkout_session["subscription"])
    stripe_session = session.get(StripeSession, checkout_session["id"])

    if not stripe_session.subscription_id:
        stripe_session.subscription_id = subscription_id
        session.add(stripe_session)
        session.commit()
        session.refresh(stripe_session)
    else:
        print(f"""ERROR: Invalid subscription ID received when processing checkout session: {stripe_session.subscription_id}""")
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail=f"""Invalid subscription ID received in checkout handler: {stripe_session.subscription_id}""",
        )


def update_subscription_for(subscription: stripe.Subscription, session):
    if not subscription["id"]:
        print(f"""ERROR: Invalid subscription ID received when processing subscription update: {subscription["id"]}""")
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail=f"""Invalid subscription ID received: {subscription["id"]}""",
        )
    if not subscription["customer"]:
        print(f"""ERROR: Invalid customer ID received when processing subscription update: {subscription["customer"]}""")
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail=f"""Invalid customer ID received: {subscription["customer"]}""",
        )
    subscription_id: str = subscription["id"]
    customer_id: str = str(subscription["customer"])

    stripe_session = session.scalars(
        select(StripeSession)
        .where(StripeSession.subscription_id == subscription_id)
    )
    if not stripe_session.user_id:
        print(f"""ERROR: Stripe session data not yet updated in database, unable to process subscription update with ID {subscription_id}""")
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail="Missing user ID in database",
        )
    # At this point, user_id is available, so we can update the subscription in the database
    user_id: int = int(stripe_session.user_id)

    stripe_subscription = stripe.Subscription.retrieve(subscription_id)
    subscription_data = stripe_subscription['items']['data'][0]
    price_id: str = subscription_data['price']['id']
    new_subscription = Subscription(
        id=subscription_id,
        user_id=user_id,
        price_id=price_id,
        customer_id=customer_id,
        subscription_period_end=datetime.fromtimestamp(
            stripe_subscription["current_period_end"]
        ).isoformat()
        if stripe_subscription["current_period_end"]
        else None,
        subscription_ended_date=datetime.fromtimestamp(
            stripe_subscription["ended_at"]
        ).isoformat()
        if stripe_subscription["ended_at"]
        else None,
        subscription_cancel_at=datetime.fromtimestamp(
            stripe_subscription["cancel_at_period_end"]
        ).isoformat()
        if stripe_subscription["cancel_at_period_end"]
        else None,
        subscription_cancelled_date=datetime.fromtimestamp(
            stripe_subscription["canceled_at"]
        ).isoformat()
        if stripe_subscription["canceled_at"]
        else None,
        status=stripe_subscription["status"],
    )
    session.add(new_subscription)
    session.commit()
    session.refresh(new_subscription)
