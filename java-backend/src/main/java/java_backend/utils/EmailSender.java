package java_backend.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.resend.*;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;

import java_backend.configs.EnvConfig;

@Component
public class EmailSender {

    private final Resend resend;

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${resend.from.email}")
    private String fromEmail;

    public EmailSender() {
        this.resend = new Resend(EnvConfig.getenvvar("RESEND_API_KEY"));
        // this.resend = new Resend(resendApiKey);
    }

    public void sendEmail(String toEmail, String subject, String htmlContent) {
        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Karan.email <" + fromEmail + ">")
                .to(toEmail)
                .subject(subject)
                .html(htmlContent)
                .build();

        try {
            CreateEmailResponse data = resend.emails().send(params);
            System.out.println(data.getId());
        } catch (ResendException e) {
            e.printStackTrace();
        }
    }
}
