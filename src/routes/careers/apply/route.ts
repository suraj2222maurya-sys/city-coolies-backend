import {
  NextResponse,
} from "next/server";

import nodemailer from "nodemailer";

export const runtime =
  "nodejs";

const MAX_RESUME_SIZE =
  5 * 1024 * 1024;

const allowedMimeTypes =
  new Set([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]);

function clean(
  value: FormDataEntryValue | null,
) {
  return String(
    value ?? "",
  )
    .trim()
    .slice(
      0,
      5000,
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
    const gmailUser =
      process.env
        .CITY_COOLIES_GMAIL_USER;

    const gmailPassword =
      process.env
        .CITY_COOLIES_GMAIL_APP_PASSWORD;

    const receiver =
      process.env
        .CAREERS_RECEIVER_EMAIL ||
      "citycooliescrm@gmail.com";

    if (
      !gmailUser ||
      !gmailPassword
    ) {
      return NextResponse.json(
        {
          message:
            "Career email service is not configured yet.",
        },
        {
          status: 503,
        },
      );
    }

    const formData =
      await request.formData();

    const fullName =
      clean(
        formData.get(
          "fullName",
        ),
      );

    const phone =
      clean(
        formData.get(
          "phone",
        ),
      );

    const email =
      clean(
        formData.get(
          "email",
        ),
      );

    const location =
      clean(
        formData.get(
          "location",
        ),
      );

    const role =
      clean(
        formData.get(
          "role",
        ),
      );

    const experience =
      clean(
        formData.get(
          "experience",
        ),
      );

    const skills =
      clean(
        formData.get(
          "skills",
        ),
      );

    const occupation =
      clean(
        formData.get(
          "occupation",
        ),
      );

    const expectedSalary =
      clean(
        formData.get(
          "expectedSalary",
        ),
      );

    const applicantMessage =
      clean(
        formData.get(
          "message",
        ),
      );

    const resumeEntry =
      formData.get(
        "resume",
      );

    if (
      !fullName ||
      !phone ||
      !email ||
      !location ||
      !role ||
      !experience ||
      !skills ||
      !applicantMessage
    ) {
      return NextResponse.json(
        {
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
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !(resumeEntry instanceof File)
    ) {
      return NextResponse.json(
        {
          message:
            "Please attach your resume or CV.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      resumeEntry.size >
      MAX_RESUME_SIZE
    ) {
      return NextResponse.json(
        {
          message:
            "Resume file must be 5 MB or smaller.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !allowedMimeTypes.has(
        resumeEntry.type,
      )
    ) {
      return NextResponse.json(
        {
          message:
            "Resume must be a PDF, DOC or DOCX file.",
        },
        {
          status: 400,
        },
      );
    }

    const resumeBuffer =
      Buffer.from(
        await resumeEntry.arrayBuffer(),
      );

    const transporter =
      nodemailer.createTransport(
        {
          service: "gmail",
          auth: {
            user:
              gmailUser,
            pass:
              gmailPassword,
          },
        },
      );

    await transporter.sendMail(
      {
        from:
          `"City Coolies Careers" <${gmailUser}>`,

        to:
          receiver,

        replyTo:
          email,

        subject:
          `Career Application - ${fullName} - ${role}`,

        text: [
          "CITY COOLIES CAREER APPLICATION",
          "",
          `Full Name: ${fullName}`,
          `Mobile: ${phone}`,
          `Email: ${email}`,
          `Location: ${location}`,
          `Role / Career Track: ${role}`,
          `Work Experience: ${experience}`,
          `Skills / Expertise: ${skills}`,
          `Current Occupation: ${occupation || "Not provided"}`,
          `Expected Salary: ${expectedSalary || "Not provided"}`,
          "",
          "About Applicant:",
          applicantMessage,
        ].join("\n"),

        html: `
          <div style="font-family:Arial,sans-serif;background:#fff7f8;padding:30px;color:#222;">
            <div style="max-width:720px;margin:auto;background:#fff;border:1px solid #f4d7dc;border-radius:18px;overflow:hidden;">
              <div style="background:#f02030;color:#fff;padding:22px 26px;">
                <div style="font-size:12px;font-weight:700;letter-spacing:2px;">CITY COOLIES CAREERS</div>
                <h1 style="font-size:25px;margin:8px 0 0;">New Career Application</h1>
              </div>

              <div style="padding:26px;">
                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <tr><td style="padding:8px 0;color:#777;">Full Name</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(fullName)}</td></tr>
                  <tr><td style="padding:8px 0;color:#777;">Mobile</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(phone)}</td></tr>
                  <tr><td style="padding:8px 0;color:#777;">Email</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(email)}</td></tr>
                  <tr><td style="padding:8px 0;color:#777;">Location</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(location)}</td></tr>
                  <tr><td style="padding:8px 0;color:#777;">Career Track</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(role)}</td></tr>
                  <tr><td style="padding:8px 0;color:#777;">Experience</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(experience)}</td></tr>
                  <tr><td style="padding:8px 0;color:#777;">Skills</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(skills)}</td></tr>
                  <tr><td style="padding:8px 0;color:#777;">Current Occupation</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(occupation || "Not provided")}</td></tr>
                  <tr><td style="padding:8px 0;color:#777;">Expected Salary</td><td style="padding:8px 0;font-weight:700;">${escapeHtml(expectedSalary || "Not provided")}</td></tr>
                </table>

                <div style="margin-top:24px;padding-top:20px;border-top:1px solid #eee;">
                  <div style="font-size:12px;font-weight:700;color:#f02030;margin-bottom:8px;">ABOUT APPLICANT</div>
                  <p style="line-height:1.7;margin:0;">${escapeHtml(applicantMessage).replaceAll("\n", "<br />")}</p>
                </div>

                <div style="margin-top:22px;padding:14px;background:#fff1f3;border-radius:10px;font-size:12px;">
                  Resume / CV is attached to this email.
                </div>
              </div>
            </div>
          </div>
        `,

        attachments: [
          {
            filename:
              resumeEntry.name,

            content:
              resumeBuffer,

            contentType:
              resumeEntry.type,
          },
        ],
      },
    );

    return NextResponse.json(
      {
        ok: true,
        message:
          "Application submitted successfully.",
      },
    );
  } catch (error) {
    console.error(
      "Career application email failed:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Application could not be submitted. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}