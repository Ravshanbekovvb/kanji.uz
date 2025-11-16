import { SendMailType } from '@/types/types'
import nodemailer from 'nodemailer'
import { prisma, PrismaClient } from '../prisma'

class SendMailService {
	constructor(private readonly prisma: PrismaClient) {}

	async create(payload: SendMailType): Promise<{ success: boolean; messageId?: string }> {
		const { email, name, html, to, password } = payload

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})

		// Convert ReactNode to string if needed
		const htmlContent = `
<!doctype html>
<html lang="uz">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>Profile Created</title>
  </head>
  <body style="margin:0;padding:0;font-family:Inter, Arial, sans-serif;background:#f4f6f8;color:#333;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(12,20,30,0.08);">
            <!-- Header -->
            <tr>
              <td style="padding:20px 24px;background: linear-gradient(90deg,#4f46e5,#06b6d4);color:#fff;">
                <h1 style="margin:0;font-size:20px;font-weight:600;">kanji.uz — Profil yaratildi</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 24px 12px 24px;">
                <p style="margin:0 0 12px 0;font-size:15px;line-height:1.5;">
                  Assalomu alaykum <strong>${name}</strong>,
                </p>

                <p style="margin:0 0 18px 0;font-size:15px;line-height:1.5;">
                  Sizning profilingiz yaratildi. Quyida tizimga kirish maʼlumotlaringiz keltirilgan — iltimos, ularni xavfsiz saqlang.
                </p>

                <!-- Card with credentials -->
                <div style="background:#f8fafc;border:1px solid #eef2f7;padding:16px;border-radius:10px;margin-bottom:20px;">
                  <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">Login (email)</p>
                  <p style="margin:0 0 12px 0;font-size:16px;font-weight:600;">${email}</p>

                  <p style="margin:0 0 8px 0;font-size:14px;color:#6b7280;">Vaqtinchalik parol</p>
                  <p style="margin:0;font-size:16px;font-weight:600;letter-spacing:0.4px;">${password}</p>
                </div>

                <!-- CTA -->
                <p style="margin:0 0 18px 0;">
                  <a href="${process.env.APP_URL || '#'}" style="display:inline-block;padding:12px 18px;border-radius:8px;background:#4f46e5;color:#fff;text-decoration:none;font-weight:600;">
                    Tizimga kirish
                  </a>
                </p>

                <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">
                  Parolingizni birinchi kirishda oʻzgartirishni unutmang. Agar siz bu so'rovni amalga oshirmagan boʻlsangiz, iltimos, bizga xabar bering.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 24px;background:#fbfbff;border-top:1px solid #eef2f7;">
                <p style="margin:0;font-size:13px;color:#9aa3b2;">
                  kanji.uz jamoasi • <a href="${process.env.APP_URL || '#'}" style="color:#4f46e5;text-decoration:none;">${process.env.APP_URL || 'Saytga o`tish'}</a>
                </p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </body>
</html>`

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: to || email,
			subject: `Your Profile has been created! ${name}`,
			html: htmlContent,
		}

		const result = await transporter.sendMail(mailOptions)

		return {
			success: true,
			messageId: result.messageId,
		}
	}
}

const sendMailService = new SendMailService(prisma)
type SendMailServiceType = typeof sendMailService

export { sendMailService, type SendMailServiceType }
