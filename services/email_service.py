import resend
from decouple import config

resend.api_key = config('RESEND_API_KEY')


def send_email(
    subject: str,
    to: str | list[str],
    html: str,
    from_email: str = "onboarding@resend.dev",
):
    if isinstance(to, str):
        to = [to]

    return resend.Emails.send(
        {
            "from": from_email,
            "to": to,
            "subject": subject,
            "html": html,
        }
    )
