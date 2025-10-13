// package java_backend.utils;

// import org.springframework.stereotype.Component;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;

// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.MimeMessageHelper;

// import jakarta.mail.MessagingException;
// import jakarta.mail.internet.MimeMessage;

// @Component
// public class JavaEmailSender {

//     private JavaEmailSender mailSender;

//     public JavaEmailSender(JavaEmailSender mailSender) {
//         this.mailSender = mailSender;
//     }

//     @Value("${spring.mail.username}")
//     private String fromEmail;

//     // Method for sending HTML emails
//     public void sendEmail(String toEmail, String subject, String htmlTextContent) {
//         try {
//             MimeMessage mimeMessage = mailSender.createMimeMessage();
//             MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

//             helper.setFrom(fromEmail);
//             helper.setTo(toEmail);
//             helper.setSubject(subject);
//             helper.setText(htmlTextContent, true);
//             mailSender.send(mimeMessage);
//         } catch (Exception e) {
//             // TODO: handle exception
//             throw new RuntimeException("Failed to send email: " + e.getMessage());
//         }

//     }
// }
