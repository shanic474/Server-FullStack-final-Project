import transporter from '../services/mailer.js';

async function emailValidationTemplate(user,verificationUrl) {
    await transporter.sendMail({
        from: 'noreply@example.com',
        to: user.user_email,
        subject: 'Email Verification',
        html: `
            <!DOCTYPE html>
            <html lang="he" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fa; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                                <!-- Header -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                                            ✉️ אימות כתובת אימייל
                                        </h1>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                            שלום,
                                        </p>
                                        <p style="margin: 0 0 30px 0; color: #555555; font-size: 15px; line-height: 1.6;">
                                            תודה שהצטרפת אלינו! כדי להשלים את תהליך ההרשמה, אנא אמת את כתובת האימייל שלך על ידי לחיצה על הכפתור למטה:
                                        </p>
                                        
                                        <!-- Button -->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td align="center" style="padding: 20px 0;">
                                                    <a href="${verificationUrl}" 
                                                       style="display: inline-block; 
                                                              padding: 16px 40px; 
                                                              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                                              color: #ffffff; 
                                                              text-decoration: none; 
                                                              border-radius: 50px; 
                                                              font-size: 16px; 
                                                              font-weight: 600;
                                                              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                                                              transition: all 0.3s ease;">
                                                        🔐 אמת את כתובת האימייל
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <p style="margin: 30px 0 20px 0; color: #777777; font-size: 14px; line-height: 1.6;">
                                            אם הכפתור לא עובד, אתה יכול להעתיק ולהדביק את הקישור הבא בדפדפן שלך:
                                        </p>
                                        <p style="margin: 0 0 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 6px; word-break: break-all;">
                                            <a href="${verificationUrl}" style="color: #667eea; text-decoration: none; font-size: 13px;">
                                                ${verificationUrl}
                                            </a>
                                        </p>
                                        
                                        <p style="margin: 20px 0 0 0; color: #999999; font-size: 13px; line-height: 1.6;">
                                            ⏱️ קישור זה יפוג בעוד שעה אחת.
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="padding: 30px; background-color: #f8f9fa; border-top: 1px solid #e9ecef; text-align: center;">
                                        <p style="margin: 0 0 10px 0; color: #999999; font-size: 13px;">
                                            אם לא ביקשת אימות זה, אנא התעלם ממייל זה.
                                        </p>
                                        <p style="margin: 0; color: #bbbbbb; font-size: 12px;">
                                            © 2025 All rights reserved
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `,
    });
}

async function resetPasswordTemplate(user,resetPasswordUrl) {
    await transporter.sendMail({
        from: 'noreply@example.com',
        to: user.user_email,
        subject: 'איפוס סיסמה',
        html: `
            <!DOCTYPE html>
            <html lang="he" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Password</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fa; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                                <!-- Header -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 30px; text-align: center;">
                                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                                            🔑 איפוס סיסמה
                                        </h1>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                            שלום,
                                        </p>
                                        <p style="margin: 0 0 30px 0; color: #555555; font-size: 15px; line-height: 1.6;">
                                            קיבלנו בקשה לאיפוס הסיסמה שלך. אם ביקשת זאת, אנא לחץ על הכפתור למטה כדי ליצור סיסמה חדשה:
                                        </p>
                                        
                                        <!-- Security Alert Box -->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                                            <tr>
                                                <td style="padding: 20px; background-color: #fff3cd; border-right: 4px solid #ffc107; border-radius: 6px;">
                                                    <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                                                        ⚠️ <strong>שים לב:</strong> אם לא ביקשת איפוס סיסמה, אנא התעלם ממייל זה והסיסמה שלך תישאר ללא שינוי.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Button -->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td align="center" style="padding: 20px 0;">
                                                    <a href="${resetPasswordUrl}" 
                                                       style="display: inline-block; 
                                                              padding: 16px 40px; 
                                                              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                                                              color: #ffffff; 
                                                              text-decoration: none; 
                                                              border-radius: 50px; 
                                                              font-size: 16px; 
                                                              font-weight: 600;
                                                              box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
                                                              transition: all 0.3s ease;">
                                                        🔐 אפס את הסיסמה
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <p style="margin: 30px 0 20px 0; color: #777777; font-size: 14px; line-height: 1.6;">
                                            אם הכפתור לא עובד, אתה יכול להעתיק ולהדביק את הקישור הבא בדפדפן שלך:
                                        </p>
                                        <p style="margin: 0 0 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 6px; word-break: break-all;">
                                            <a href="${resetPasswordUrl}" style="color: #f5576c; text-decoration: none; font-size: 13px;">
                                                ${resetPasswordUrl}
                                            </a>
                                        </p>
                                        
                                        <p style="margin: 20px 0 0 0; color: #999999; font-size: 13px; line-height: 1.6;">
                                            ⏱️ קישור זה יפוג בעוד שעה אחת מטעמי אבטחה.
                                        </p>
                                        
                                        <!-- Security Tips -->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px;">
                                            <tr>
                                                <td style="padding: 20px; background-color: #e7f3ff; border-radius: 6px;">
                                                    <p style="margin: 0 0 10px 0; color: #004085; font-size: 14px; font-weight: 600;">
                                                        💡 טיפים לאבטחה:
                                                    </p>
                                                    <ul style="margin: 0; padding-right: 20px; color: #004085; font-size: 13px; line-height: 1.8;">
                                                        <li>השתמש בסיסמה חזקה המכילה אותיות, מספרים וסימנים מיוחדים</li>
                                                        <li>אל תשתמש באותה סיסמה באתרים שונים</li>
                                                        <li>אל תשתף את הסיסמה שלך עם אף אחד</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="padding: 30px; background-color: #f8f9fa; border-top: 1px solid #e9ecef; text-align: center;">
                                        <p style="margin: 0 0 10px 0; color: #999999; font-size: 13px;">
                                            מייל זה נשלח לבקשתך. אם לא ביקשת איפוס סיסמה, אנא התעלם ממייל זה.
                                        </p>
                                        <p style="margin: 0; color: #bbbbbb; font-size: 12px;">
                                            © 2025 All rights reserved
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `,
    });
}


export { emailValidationTemplate, resetPasswordTemplate };