# JavaMail Example - Send Mail in Java using SMTP(http://www.journaldev.com/2532/javamail-example-send-mail-in-java-smtp)

Today we will look into JavaMail Example to send email in java programs. Sending emails is one of the common tasks in real life applications and that’s why Java provides robust JavaMail API that we can use to send emails using SMTP server. JavaMail API supports both TLS and SSL authentication for sending emails.

javamail example, send mail in java, java smtp, java send email

Today we will learn how to use JavaMail API to send emails using SMTP server with no authentication, TLS and SSL authentication and how to send attachments and attach and use images in the email body. For TLS and SSL authentication, I am using GMail SMTP server because it supports both of them.

JavaMail API is not part of standard JDK, so you will have to download it from it’s official website i.e JavaMail Home Page. Download the latest version of the JavaMail reference implementation and include it in your project build path. The jar file name will be javax.mail.jar.

If you are using Maven based project, just add below dependency in your project.

<dependency>
	<groupId>com.sun.mail</groupId>
	<artifactId>javax.mail</artifactId>
	<version>1.5.5</version>
</dependency>

Java Program to send email contains following steps:

    Creating javax.mail.Session object
    Creating javax.mail.internet.MimeMessage object, we have to set different properties in this object such as recipient email address, Email Subject, Reply-To email, email body, attachments etc.
    Using javax.mail.Transport to send the email message.

The logic to create session differs based on the type of SMTP server, for example if SMTP server doesn’t require any authentication we can create the Session object with some simple properties whereas if it requires TLS or SSL authentication, then logic to create will differ.

So I will create a utility class with some utility methods to send emails and then I will use this utility method with different SMTP servers.
JavaMail Example Program

Our EmailUtil class that has a single method to send email looks like below, it requires javax.mail.Session and some other required fields as arguments. To keep it simple, some of the arguments are hard coded but you can extend this method to pass them or read it from some config files.

package com.journaldev.mail;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class EmailUtil {

	/**
	 * Utility method to send simple HTML email
	 * @param session
	 * @param toEmail
	 * @param subject
	 * @param body
	 */
	public static void sendEmail(Session session, String toEmail, String subject, String body){
		try
	    {
	      MimeMessage msg = new MimeMessage(session);
	      //set message headers
	      msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
	      msg.addHeader("format", "flowed");
	      msg.addHeader("Content-Transfer-Encoding", "8bit");

	      msg.setFrom(new InternetAddress("no_reply@journaldev.com", "NoReply-JD"));

	      msg.setReplyTo(InternetAddress.parse("no_reply@journaldev.com", false));

	      msg.setSubject(subject, "UTF-8");

	      msg.setText(body, "UTF-8");

	      msg.setSentDate(new Date());

	      msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
	      System.out.println("Message is ready");
    	  Transport.send(msg);  

	      System.out.println("EMail Sent Successfully!!");
	    }
	    catch (Exception e) {
	      e.printStackTrace();
	    }
	}
}

Notice that I am setting some header properties in the MimeMessage, they are used by the email clients to properly render and display the email message. Rest of the program is simple and self understood.

Now let’s create our program to send email without authentication.
Send Mail in Java using SMTP without authentication

package com.journaldev.mail;

import java.util.Properties;

import javax.mail.Session;

public class SimpleEmail {
	
	public static void main(String[] args) {
		
	    System.out.println("SimpleEmail Start");
		
	    String smtpHostServer = "smtp.journaldev.com";
	    String emailID = "pankaj@journaldev.com";
	    
	    Properties props = System.getProperties();

	    props.put("mail.smtp.host", smtpHostServer);

	    Session session = Session.getInstance(props, null);
	    
	    EmailUtil.sendEmail(session, emailID,"SimpleEmail Testing Subject", "SimpleEmail Testing Body");
	}

}

Notice that I am using Session.getInstance() to get the Session object by passing the Properties object. We need to set the mail.smtp.host property with the SMTP server host. If the SMTP server is not running on default port (25), then you will also need to set mail.smtp.port property. Just run this program with your no-authentication SMTP server and by setting recipient email id as your own email id and you will get the email in no time.

The program is simple to understand and works well, but in real life most of the SMTP servers use some sort of authentication such as TLS or SSL authentication. So we will now see how to create Session object for these authentication protocols.
Send Email in Java SMTP with TLS Authentication

package com.journaldev.mail;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;

public class TLSEmail {

	/**
	   Outgoing Mail (SMTP) Server
	   requires TLS or SSL: smtp.gmail.com (use authentication)
	   Use Authentication: Yes
	   Port for TLS/STARTTLS: 587
	 */
	public static void main(String[] args) {
		final String fromEmail = "myemailid@gmail.com"; //requires valid gmail id
		final String password = "mypassword"; // correct password for gmail id
		final String toEmail = "myemail@yahoo.com"; // can be any email id 
		
		System.out.println("TLSEmail Start");
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com"); //SMTP Host
		props.put("mail.smtp.port", "587"); //TLS Port
		props.put("mail.smtp.auth", "true"); //enable authentication
		props.put("mail.smtp.starttls.enable", "true"); //enable STARTTLS
		
                //create Authenticator object to pass in Session.getInstance argument
		Authenticator auth = new Authenticator() {
			//override the getPasswordAuthentication method
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(fromEmail, password);
			}
		};
		Session session = Session.getInstance(props, auth);
		
		EmailUtil.sendEmail(session, toEmail,"TLSEmail Testing Subject", "TLSEmail Testing Body");
		
	}

	
}

Since I am using GMail SMTP server that is accessible to all, you can set the correct variables in above program and run for yourself. Believe me it works!! 🙂
Java SMTP Example with SSL Authentication

package com.journaldev.mail;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;

public class SSLEmail {

	/**
	   Outgoing Mail (SMTP) Server
	   requires TLS or SSL: smtp.gmail.com (use authentication)
	   Use Authentication: Yes
	   Port for SSL: 465
	 */
	public static void main(String[] args) {
		final String fromEmail = "myemailid@gmail.com"; //requires valid gmail id
		final String password = "mypassword"; // correct password for gmail id
		final String toEmail = "myemail@yahoo.com"; // can be any email id 
		
		System.out.println("SSLEmail Start");
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com"); //SMTP Host
		props.put("mail.smtp.socketFactory.port", "465"); //SSL Port
		props.put("mail.smtp.socketFactory.class",
				"javax.net.ssl.SSLSocketFactory"); //SSL Factory Class
		props.put("mail.smtp.auth", "true"); //Enabling SMTP Authentication
		props.put("mail.smtp.port", "465"); //SMTP Port
		
		Authenticator auth = new Authenticator() {
			//override the getPasswordAuthentication method
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(fromEmail, password);
			}
		};
		
		Session session = Session.getDefaultInstance(props, auth);
		System.out.println("Session created");
	        EmailUtil.sendEmail(session, toEmail,"SSLEmail Testing Subject", "SSLEmail Testing Body");

	        EmailUtil.sendAttachmentEmail(session, toEmail,"SSLEmail Testing Subject with Attachment", "SSLEmail Testing Body with Attachment");

	        EmailUtil.sendImageEmail(session, toEmail,"SSLEmail Testing Subject with Image", "SSLEmail Testing Body with Image");

	}

}

The program is almost same as TLS authentication, just some properties are different. As you can see that I am calling some other methods from EmailUtil class to send attachment and image in email but I haven’t defined them yet. Actually I kept them to show later and keep it simple at start of the tutorial.
JavaMail Example – send mail in java with attachment

To send a file as attachment, we need to create an object of javax.mail.internet.MimeBodyPart and javax.mail.internet.MimeMultipart. First add the body part for the text message in the email and then use FileDataSource to attach the file in second part of the multipart body. The method looks like below.

/**
 * Utility method to send email with attachment
 * @param session
 * @param toEmail
 * @param subject
 * @param body
 */
public static void sendAttachmentEmail(Session session, String toEmail, String subject, String body){
	try{
         MimeMessage msg = new MimeMessage(session);
         msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
	     msg.addHeader("format", "flowed");
	     msg.addHeader("Content-Transfer-Encoding", "8bit");
	      
	     msg.setFrom(new InternetAddress("no_reply@journaldev.com", "NoReply-JD"));

	     msg.setReplyTo(InternetAddress.parse("no_reply@journaldev.com", false));

	     msg.setSubject(subject, "UTF-8");

	     msg.setSentDate(new Date());

	     msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
	      
         // Create the message body part
         BodyPart messageBodyPart = new MimeBodyPart();

         // Fill the message
         messageBodyPart.setText(body);
         
         // Create a multipart message for attachment
         Multipart multipart = new MimeMultipart();

         // Set text message part
         multipart.addBodyPart(messageBodyPart);

         // Second part is attachment
         messageBodyPart = new MimeBodyPart();
         String filename = "abc.txt";
         DataSource source = new FileDataSource(filename);
         messageBodyPart.setDataHandler(new DataHandler(source));
         messageBodyPart.setFileName(filename);
         multipart.addBodyPart(messageBodyPart);

         // Send the complete message parts
         msg.setContent(multipart);

         // Send message
         Transport.send(msg);
         System.out.println("EMail Sent Successfully with attachment!!");
      }catch (MessagingException e) {
         e.printStackTrace();
      } catch (UnsupportedEncodingException e) {
		 e.printStackTrace();
	}
}

The program might look complex at first look but it’s simple, just create a body part for text message and another body part for attachment and then add them to the multipart. You can extend this method to attach multiple files too.
JavaMail example – send mail in java with image

Since we can create HTML body message, if the image file is located at some server location we can use img element to show them in the message. But sometimes we want to attach the image in the email and then use it in the email body itself. You must have seen so many emails that have image attachments and are also used in the email message.

The trick is to attach the image file like any other attachment and then set the Content-ID header for image file and then use the same content id in the email message body with <img src='cid:image_id'>.

/**
 * Utility method to send image in email body
 * @param session
 * @param toEmail
 * @param subject
 * @param body
 */
public static void sendImageEmail(Session session, String toEmail, String subject, String body){
	try{
         MimeMessage msg = new MimeMessage(session);
         msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
	     msg.addHeader("format", "flowed");
	     msg.addHeader("Content-Transfer-Encoding", "8bit");
	      
	     msg.setFrom(new InternetAddress("no_reply@journaldev.com", "NoReply-JD"));

	     msg.setReplyTo(InternetAddress.parse("no_reply@journaldev.com", false));

	     msg.setSubject(subject, "UTF-8");

	     msg.setSentDate(new Date());

	     msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
	      
         // Create the message body part
         BodyPart messageBodyPart = new MimeBodyPart();

         messageBodyPart.setText(body);
         
         // Create a multipart message for attachment
         Multipart multipart = new MimeMultipart();

         // Set text message part
         multipart.addBodyPart(messageBodyPart);

         // Second part is image attachment
         messageBodyPart = new MimeBodyPart();
         String filename = "image.png";
         DataSource source = new FileDataSource(filename);
         messageBodyPart.setDataHandler(new DataHandler(source));
         messageBodyPart.setFileName(filename);
         //Trick is to add the content-id header here
         messageBodyPart.setHeader("Content-ID", "image_id");
         multipart.addBodyPart(messageBodyPart);

         //third part for displaying image in the email body
         messageBodyPart = new MimeBodyPart();
         messageBodyPart.setContent("<h1>Attached Image</h1>" +
        		     "<img src='cid:image_id'>", "text/html");
         multipart.addBodyPart(messageBodyPart);
         
         //Set the multipart message to the email message
         msg.setContent(multipart);

         // Send message
         Transport.send(msg);
         System.out.println("EMail Sent Successfully with image!!");
      }catch (MessagingException e) {
         e.printStackTrace();
      } catch (UnsupportedEncodingException e) {
		 e.printStackTrace();
	}
}

JavaMail API Troubleshooting Tips

    java.net.UnknownHostException comes when your system is not able to resolve the IP address for the SMTP server, it might be wrong or not accessible from your network. For example, GMail SMTP server is smtp.gmail.com and if I use smtp.google.com, I will get this exception. If the hostname is correct, try to ping the server through command line to make sure it’s accessible from your system.

    pankaj@Pankaj:~/CODE$ ping smtp.gmail.com
    PING gmail-smtp-msa.l.google.com (74.125.129.108): 56 data bytes
    64 bytes from 74.125.129.108: icmp_seq=0 ttl=46 time=38.308 ms
    64 bytes from 74.125.129.108: icmp_seq=1 ttl=46 time=42.247 ms
    64 bytes from 74.125.129.108: icmp_seq=2 ttl=46 time=38.164 ms
    64 bytes from 74.125.129.108: icmp_seq=3 ttl=46 time=53.153 ms

    If your program is stuck in Transport send() method call, check that SMTP port is correct. If it’s correct then use telnet to verify that it’s accessible from you machine, you will get output like below.

    pankaj@Pankaj:~/CODE$ telnet smtp.gmail.com 587
    Trying 2607:f8b0:400e:c02::6d...
    Connected to gmail-smtp-msa.l.google.com.
    Escape character is '^]'.
    220 mx.google.com ESMTP sx8sm78485186pab.5 - gsmtp
    HELO
    250 mx.google.com at your service

That’s all for JavaMail example to send mail in java using SMTP server with different authentication protocols, attachment and images. I hope it will solve all your needs for sending emails in java programs.
