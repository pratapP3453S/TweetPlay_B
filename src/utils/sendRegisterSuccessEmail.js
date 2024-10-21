import nodemailer from 'nodemailer';
import http from 'http'

const sendRegisterSuccessEmail = async (userEmail, userName) => {
    const server = http.createServer((request, response) => {
        const auth = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const receiver = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: " Welcome to TweetPlay - Your Account is Ready!",
            text: "Thank you for registering on TweetPlay!",
            html: `
            <h4>Dear ${userName},</h4><br>
            <p>
               Welcome to TweetPlay – where exciting conversations and fun connections await! 🎉<br>
               We're thrilled to have you on board. Your account has been successfully created, and you're now part of our amazing community. Below are your account details for login:
            </p>
            <br><hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;"><br>
            <p>
               Email: ${userEmail}
               Password: 
            </p>
            <br><hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;"><br>
            <p>
               You can now log in to your account and explore everything TweetPlay has to offer. Whether you're here to tweet your thoughts, join conversations, or follow your favorite people, we're sure you'll love the experience!
            </p>
            <br><hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;"><br>
            <p>
               Get Started:<br>
               Log In Now and start exploring
               Update Your Profile and personalize your account
               Change Your Password: For your security, we recommend changing your password after logging in.
            </p>
            <br><hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;"><br>
            <p>
               Need Help?
               If you have any questions or need assistance, feel free to reach out to our support team. We're here to help you make the most of your TweetPlay journey.<br>
               Thank you for choosing TweetPlay! We can't wait to see what you bring to the conversation.
            </p>
            <br><hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;"><br>
            <p>
               Best regards,<br>The TweetPlay Team
            </p>
            <br><hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;"><br>
            <p>
               P.S. Don’t forget to follow us on Twitter, Instagram, and Facebook to stay updated with the latest news and features!
            </p>
            <br><hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;"><br>
            <p>Let me know if you'd like to customize anything further!</p>
            `,
        };

        auth.sendMail(receiver, (error, emailResponse) => {
            if (error) {
                throw new ApiError(
                    500,
                    "Something went wrong when sending register successfull email."
                );
            }
            console.log("success!");
            response.end();
        });
    });
};

export { sendRegisterSuccessEmail}