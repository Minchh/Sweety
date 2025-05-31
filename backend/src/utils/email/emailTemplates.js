export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Verify Your Email</title>
	</head>

	<body style="font-family: 'Georgia', serif; line-height: 1.6; color: #d4c4a8; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a;">
		<div style="background: linear-gradient(135deg, #2a1810 0%, #4a2c1a 50%, #6b3e2a 100%); padding: 30px; text-align: center; position: relative; overflow: hidden;">
			<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.2) 0%, transparent 50%);"></div>
			<h1 style="color: #f5e6d3; margin: 0; font-size: 2.2em; font-weight: 300; letter-spacing: 2px; position: relative; z-index: 1;">Verify Your Email</h1>
			<div style="width: 60px; height: 2px; background: linear-gradient(to right, #8b4513, #cd853f); margin: 15px auto 0; position: relative; z-index: 1;"></div>
		</div>

		<div style="background: linear-gradient(145deg, #1a1611 0%, #2d1f16 100%); padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.4); border: 1px solid #3a2818;">
			<p style="color: #d4c4a8; font-size: 1.1em; margin-bottom: 20px;">Hello,</p>
			<p style="color: #c4b49d; margin-bottom: 25px;">Thank you for joining the Sweety experience! Your verification code is:</p>
		
			<div style="text-align: center; margin: 40px 0; padding: 25px; background: linear-gradient(135deg, #3a2818 0%, #2a1810 100%); border-radius: 12px; border: 2px solid #4a2c1a; box-shadow: inset 0 2px 8px rgba(0,0,0,0.3);">
				<span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #cd853f; text-shadow: 0 2px 4px rgba(0,0,0,0.5); font-family: Arial, sans-serif;">{verificationCode}</span>
			</div>
		
			<p style="color: #c4b49d; margin-bottom: 18px;">Enter this code on the verification page to complete your registration and start enjoying our premium offerings.</p>
			<p style="color: #b8a082; margin-bottom: 18px; font-size: 0.95em;">This code will expire in 15 minutes for security reasons.</p>
			<p style="color: #a89376; margin-bottom: 25px; font-size: 0.9em;">If you didn't create an account with us, please ignore this email.</p>
			<p style="color: #d4c4a8; font-size: 1.05em;">Best regards,<br><span style="font-style: italic; color: #cd853f; font-size: 1.1em;">Sweety</span></p>
		
		</div>
		
		<div style="text-align: center; margin-top: 25px; color: #6b5d47; font-size: 0.8em; padding: 15px;">
			<p style="margin: 0;">This is an automated message, please do not reply to this email.</p>
			<div style="width: 40px; height: 1px; background: linear-gradient(to right, transparent, #4a2c1a, transparent); margin: 10px auto;"></div>
		</div>
	</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Welcome to Sweety</title>
	</head>

	<body style="font-family: 'Georgia', serif; line-height: 1.6; color: #d4c4a8; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a;">
		<div style="background: linear-gradient(135deg, #2a1810 0%, #4a2c1a 50%, #6b3e2a 100%); padding: 30px; text-align: center; position: relative; overflow: hidden;">
			<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.2) 0%, transparent 50%);"></div>
			<h1 style="color: #f5e6d3; margin: 0; font-size: 2.2em; font-weight: 300; letter-spacing: 2px; position: relative; z-index: 1;">Welcome to Sweety!</h1>
			<div style="width: 60px; height: 2px; background: linear-gradient(to right, #8b4513, #cd853f); margin: 15px auto 0; position: relative; z-index: 1;"></div>
		</div>

		<div style="background: linear-gradient(145deg, #1a1611 0%, #2d1f16 100%); padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.4); border: 1px solid #3a2818;">
			<p style="color: #d4c4a8; font-size: 1.1em; margin-bottom: 20px;">Hello, <span style="color: #cd853f; font-weight: bold;">{fullName}</span></p>
			<p style="color: #c4b49d; margin-bottom: 25px;">Congratulations! Your email has been successfully verified, and we're delighted to welcome you to the most elegant culinary experience – <strong style="color: #cd853f;">Sweety</strong>!</p>
			<p style="color: #c4b49d; margin-bottom: 25px;">Your journey into the world of exquisite flavors, artisanal creations, and sophisticated indulgences begins now.</p>
			<p style="color: #c4b49d; margin-bottom: 20px; font-weight: 500;">Here's what awaits you:</p>
			
			<div style="background: linear-gradient(135deg, #3a2818 0%, #2a1810 100%); padding: 25px; border-radius: 8px; border: 1px solid #4a2c1a; margin: 25px 0;">
				<div style="color: #b8a082; margin-bottom: 15px; padding: 8px 0; border-bottom: 1px solid #4a2c1a;">
					<span style="color: #cd853f; font-weight: bold;">✦</span> Exclusive access to our premium collections and seasonal specialties
				</div>
				<div style="color: #b8a082; margin-bottom: 15px; padding: 8px 0; border-bottom: 1px solid #4a2c1a;">
					<span style="color: #cd853f; font-weight: bold;">✦</span> Priority notifications for limited editions and artisanal creations
				</div>
				<div style="color: #b8a082; padding: 8px 0;">
					<span style="color: #cd853f; font-weight: bold;">✦</span> Curated recommendations tailored to your refined tastes
				</div>
			</div>

			<p style="color: #c4b49d; margin: 25px 0;">Ready to elevate your culinary experience? Discover our world of sophisticated flavors and timeless elegance.</p>
			
			<div style="text-align: center; margin: 35px 0;">
				<a href="{homePageUrl}" style="display: inline-block; background: linear-gradient(135deg, #8b4513 0%, #cd853f 100%); color: #f5e6d3; padding: 15px 35px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 1.1em; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3); transition: all 0.3s ease; border: 1px solid #a0522d;">EXPLORE SWEETY</a>
			</div>

			<p style="color: #c4b49d; margin-bottom: 25px;">Thank you for joining our community of discerning connoisseurs!</p>
			<p style="color: #d4c4a8; font-size: 1.05em;">With warmest regards,<br><span style="font-style: italic; color: #cd853f; font-size: 1.1em; font-weight: 500;">Sweety</span></p>
		</div>

		<div style="text-align: center; margin-top: 25px; color: #6b5d47; font-size: 0.8em; padding: 15px;">
			<p style="margin: 0;">This is an automated message, please do not reply to this email.</p>
			<div style="width: 40px; height: 1px; background: linear-gradient(to right, transparent, #4a2c1a, transparent); margin: 10px auto;"></div>
		</div>
	</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Password Reset Successful</title>
	</head>

	<body style="font-family: 'Georgia', serif; line-height: 1.6; color: #d4c4a8; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a;">
		<div style="background: linear-gradient(135deg, #2a1810 0%, #4a2c1a 50%, #6b3e2a 100%); padding: 30px; text-align: center; position: relative; overflow: hidden;">
			<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.2) 0%, transparent 50%);"></div>
			<h1 style="color: #f5e6d3; margin: 0; font-size: 2.2em; font-weight: 300; letter-spacing: 2px; position: relative; z-index: 1;">Password Reset Successful</h1>
			<div style="width: 60px; height: 2px; background: linear-gradient(to right, #8b4513, #cd853f); margin: 15px auto 0; position: relative; z-index: 1;"></div>
		</div>

		<div style="background: linear-gradient(145deg, #1a1611 0%, #2d1f16 100%); padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.4); border: 1px solid #3a2818;">
			<p style="color: #d4c4a8; font-size: 1.1em; margin-bottom: 20px;">Hello,</p>
			<p style="color: #c4b49d; margin-bottom: 25px;">We're pleased to confirm that your password has been successfully reset and your account security has been updated.</p>
			
			<div style="text-align: center; margin: 35px 0;">
				<div style="background: linear-gradient(135deg, #8b4513 0%, #cd853f 100%); color: #f5e6d3; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 28px; font-weight: bold; box-shadow: 0 4px 15px rgba(139, 69, 19, 0.4); border: 2px solid #a0522d;">
					✓
				</div>
			</div>
			
			<p style="color: #c4b49d; margin-bottom: 25px;">If you did not initiate this password reset, please contact our support team immediately for assistance.</p>
			<p style="color: #c4b49d; margin-bottom: 20px; font-weight: 500;">For enhanced security, we recommend:</p>
			
			<div style="background: linear-gradient(135deg, #3a2818 0%, #2a1810 100%); padding: 25px; border-radius: 8px; border: 1px solid #4a2c1a; margin: 25px 0;">
				<div style="color: #b8a082; margin-bottom: 15px; padding: 8px 0; border-bottom: 1px solid #4a2c1a;">
					<span style="color: #cd853f; font-weight: bold;">•</span> Use a strong, unique password with mixed characters
				</div>
				<div style="color: #b8a082; margin-bottom: 15px; padding: 8px 0; border-bottom: 1px solid #4a2c1a;">
					<span style="color: #cd853f; font-weight: bold;">•</span> Enable two-factor authentication for added protection
				</div>
				<div style="color: #b8a082; padding: 8px 0;">
					<span style="color: #cd853f; font-weight: bold;">•</span> Avoid reusing passwords across multiple platforms
				</div>
			</div>

			<p style="color: #c4b49d; margin-bottom: 25px;">Thank you for helping us keep your account secure.</p>
			<p style="color: #d4c4a8; font-size: 1.05em;">Best regards,<br><span style="font-style: italic; color: #cd853f; font-size: 1.1em; font-weight: 500;">Sweety</span></p>
		</div>

		<div style="text-align: center; margin-top: 25px; color: #6b5d47; font-size: 0.8em; padding: 15px;">
			<p style="margin: 0;">This is an automated message, please do not reply to this email.</p>
			<div style="width: 40px; height: 1px; background: linear-gradient(to right, transparent, #4a2c1a, transparent); margin: 10px auto;"></div>
		</div>
	</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: 'Georgia', serif; line-height: 1.6; color: #d4c4a8; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a;">
  <div style="background: linear-gradient(135deg, #2a1810 0%, #4a2c1a 50%, #6b3e2a 100%); padding: 30px; text-align: center; position: relative; overflow: hidden;">
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.2) 0%, transparent 50%);"></div>
    <h1 style="color: #f5e6d3; margin: 0; font-size: 2.2em; font-weight: 300; letter-spacing: 2px; position: relative; z-index: 1;">Password Reset</h1>
    <div style="width: 60px; height: 2px; background: linear-gradient(to right, #8b4513, #cd853f); margin: 15px auto 0; position: relative; z-index: 1;"></div>
  </div>

  <div style="background: linear-gradient(145deg, #1a1611 0%, #2d1f16 100%); padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.4); border: 1px solid #3a2818;">
    <p style="color: #d4c4a8; font-size: 1.1em; margin-bottom: 20px;">Hello,</p>
    <p style="color: #c4b49d; margin-bottom: 25px;">We received a request to reset your password for your Sweety account. If you didn't make this request, please disregard this email.</p>
    <p style="color: #c4b49d; margin-bottom: 30px;">To securely reset your password, please click the button below:</p>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="{resetURL}" style="display: inline-block; background: linear-gradient(135deg, #8b4513 0%, #cd853f 100%); color: #f5e6d3; padding: 15px 35px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 1.1em; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3); transition: all 0.3s ease; border: 1px solid #a0522d;">RESET PASSWORD</a>
    </div>

    <div style="background: linear-gradient(135deg, #3a2818 0%, #2a1810 100%); padding: 20px; border-radius: 8px; border: 1px solid #4a2c1a; margin: 25px 0; text-align: center;">
      <p style="color: #b8a082; margin: 0; font-size: 0.95em;">
        <span style="color: #cd853f; font-weight: bold;">⚠</span> This secure link will expire in <strong style="color: #cd853f;">15 minutes</strong> for your protection.
      </p>
    </div>

    <p style="color: #c4b49d; margin-bottom: 25px;">If you're unable to click the button, you can copy and paste this link into your browser:</p>
    <p style="color: #8b7355; font-size: 0.9em; word-break: break-all; background: linear-gradient(135deg, #3a2818 0%, #2a1810 100%); padding: 12px; border-radius: 4px; border: 1px solid #4a2c1a;">{resetURL}</p>

    <p style="color: #d4c4a8; font-size: 1.05em; margin-top: 30px;">Best regards,<br><span style="font-style: italic; color: #cd853f; font-size: 1.1em; font-weight: 500;">Sweety</span></p>
  </div>

  <div style="text-align: center; margin-top: 25px; color: #6b5d47; font-size: 0.8em; padding: 15px;">
    <p style="margin: 0;">This is an automated message, please do not reply to this email.</p>
    <div style="width: 40px; height: 1px; background: linear-gradient(to right, transparent, #4a2c1a, transparent); margin: 10px auto;"></div>
  </div>
</body>
</html>
`;
