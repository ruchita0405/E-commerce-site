package com.telusko.springEcom.service;

import com.telusko.springEcom.service.OrderEmailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderEmail(OrderEmailRequest req) throws MessagingException {

        // Build HTML item list
        StringBuilder itemsList = new StringBuilder();
        for (OrderEmailRequest.Item item : req.getItems()) {
            itemsList.append(
                    String.format("<li>%s x %d = ₹%.2f</li>",
                            item.getName(),
                            item.getQuantity(),
                            item.getPrice() * item.getQuantity()
                    )
            );
        }

        String htmlBody = """
                <h2>Thank you for your purchase, %s!</h2>
                <p>Your order has been confirmed.</p>

                <h3>Your Bill:</h3>
                <ul>%s</ul>

                <h3>Total Amount: ₹%.2f</h3>

                <p>We’ll notify you once it's shipped.</p>
                <p><strong>- Your Store Team</strong></p>
            """.formatted(req.getCustomerName(), itemsList, req.getTotalAmount());

        // Create email message
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("Your Store <" + mailSender + ">");
        helper.setTo(req.getTo());
        helper.setSubject("Order Confirmation - Order #" + req.getOrderId());
        helper.setText(htmlBody, true); // enable HTML

        mailSender.send(message);
    }
}
