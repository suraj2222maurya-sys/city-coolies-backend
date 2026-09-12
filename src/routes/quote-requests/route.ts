import {
  NextResponse,
} from "next/server";

import nodemailer from "nodemailer";

export const runtime =
  "nodejs";

type QuoteRequest = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  details?: unknown;
};

function clean(
  value: unknown,
  maxLength: number,
) {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .trim()
    .slice(
      0,
      maxLength,
    );
}

function escapeHtml(
  value: string,
) {
  return value
    .replaceAll(
      "&",
      "&amp;",
    )
    .replaceAll(
      "<",
      "&lt;",
    )
    .replaceAll(
      ">",
      "&gt;",
    )
    .replaceAll(
      '"',
      "&quot;",
    )
    .replaceAll(
      "'",
      "&#039;",
    );
}

export async function POST(
  request: Request,
) {
  try {
    const body =
      (await request.json()) as QuoteRequest;

    const fullName =
      clean(
        body.fullName,
        100,
      );

    const phone =
      clean(
        body.phone,
        30,
      );

    const email =
      clean(
        body.email,
        160,
      );

    const service =
      clean(
        body.service,
        160,
      );

    const details =
      clean(
        body.details,
        4000,
      );

    if (
      !fullName ||
      !phone ||
      !email ||
      !service ||
      !details
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Please complete all required fields.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email,
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    const smtpUser =
      process.env
        .GMAIL_SMTP_USER;

    const smtpPassword =
      process.env
        .GMAIL_APP_PASSWORD;

    const recipient =
      process.env
        .QUOTE_NOTIFICATION_EMAIL ??
      "citycooliescrm@gmail.com";

    if (
      !smtpUser ||
      !smtpPassword
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Website email delivery is not configured yet.",
        },
        {
          status: 500,
        },
      );
    }

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user:
            smtpUser,

          pass:
            smtpPassword,
        },
      });

    const safeName =
      escapeHtml(
        fullName,
      );

    const safePhone =
      escapeHtml(
        phone,
      );

    const safeEmail =
      escapeHtml(
        email,
      );

    const safeService =
      escapeHtml(
        service,
      );

    const safeDetails =
      escapeHtml(
        details,
      ).replaceAll(
        "\n",
        "<br />",
      );

    const safeSubject =
      service
        .replace(
          /[\r\n]/g,
          " ",
        )
        .slice(
          0,
          80,
        );

    await transporter.sendMail({
      from:
        `City Coolies Website <${smtpUser}>`,

      to:
        recipient,

      replyTo:
        email,

      subject:
        `New City Coolies Enquiry - ${safeSubject}`,

      text:
        [
          "NEW CITY COOLIES WEBSITE ENQUIRY",
          "",
          `Name: ${fullName}`,
          `Phone: ${phone}`,
          `Email: ${email}`,
          `Service: ${service}`,
          "",
          "Message / Requirement:",
          details,
        ].join("\n"),

      html: `
        <div style="margin:0;background:#fff5f7;padding:28px;font-family:Arial,sans-serif;color:#242424">
          <div style="max-width:680px;margin:auto;overflow:hidden;border:1px solid #ffd6dc;border-radius:20px;background:#ffffff">

            <div style="background:#ed1c24;padding:22px 26px;color:#ffffff">
              <div style="font-size:11px;font-weight:700;letter-spacing:1px">
                CITY COOLIES
              </div>

              <h2 style="margin:7px 0 0;font-size:22px">
                New Website Enquiry
              </h2>
            </div>

            <div style="padding:26px">

              <table style="width:100%;border-collapse:collapse;font-size:14px">

                <tr>
                  <td style="width:140px;padding:9px 0;font-weight:700">
                    Name
                  </td>

                  <td>
                    ${safeName}
                  </td>
                </tr>

                <tr>
                  <td style="padding:9px 0;font-weight:700">
                    Phone
                  </td>

                  <td>
                    ${safePhone}
                  </td>
                </tr>

                <tr>
                  <td style="padding:9px 0;font-weight:700">
                    Email
                  </td>

                  <td>
                    ${safeEmail}
                  </td>
                </tr>

                <tr>
                  <td style="padding:9px 0;font-weight:700">
                    Service
                  </td>

                  <td>
                    ${safeService}
                  </td>
                </tr>

              </table>

              <div style="margin-top:20px;padding:18px;border-radius:13px;background:#fff4f6">

                <strong style="color:#ed1c24">
                  Message / Requirement
                </strong>

                <p style="margin:9px 0 0;line-height:1.65">
                  ${safeDetails}
                </p>

              </div>

            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,

      message:
        "Thank you. Your enquiry has been sent to City Coolies.",
    });

  } catch (error) {

    console.error(
      "City Coolies enquiry email error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Your enquiry could not be sent right now. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}