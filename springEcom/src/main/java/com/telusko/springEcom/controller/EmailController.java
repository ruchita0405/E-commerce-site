package com.telusko.springEcom.controller;
import com.telusko.springEcom.service.OrderEmailRequest;
import com.telusko.springEcom.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin("*")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-order-email")
    public ResponseEntity<?> sendOrderEmail(@RequestBody OrderEmailRequest req) {
        try {
            emailService.sendOrderEmail(req);
            return ResponseEntity.ok("Order confirmation email sent!");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Failed to send email: " + e.getMessage());
        }
    }
}

