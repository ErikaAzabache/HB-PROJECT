import os
import sys
import smtplib

def send_email(receiver, activation_number, subject):

    receiver_email = receiver
    sender_email = os.environ['EMAIL_SENDER']
    sender_pwd = os.environ['EMAIL_PASSWORD']
    sender_user = os.environ['USER_SENDER']
    smtpserver = smtplib.SMTP(os.environ['EMAIL_SERVER'], 587) #not self hosted.

    smtpserver.ehlo() #Identify yourself to an ESMTP server using EHLO
    smtpserver.starttls() #Requests the mail server to start TLS/SSL negotiation and protect the connection with security layer.
    smtpserver.login(sender_user, sender_pwd)

    if subject=='activation':
        msg_header = 'To:' + receiver_email + '\n' + 'From: ' + sender_email + '\n' + 'Subject: Email Confirmation \n'
        msg_intro = '\n Thank you for registering. To activate your account click here: \n\n'
        activation_link = "http://localhost:5000/activation/" + str(activation_number)
    
    if subject=='forgot_pass':
        msg_header = 'To:' + receiver_email + '\n' + 'From: ' + sender_email + '\n' + 'Subject: Reset Password \n'
        msg_intro = '\n You requested a password reset. To continue with this process, please click here: \n\n'
        activation_link = "http://localhost:5000/reset/" + str(activation_number)
        
    msg_content = msg_intro + activation_link

    msg = msg_header + msg_content
    smtpserver.sendmail(sender_email, receiver_email, msg)
    smtpserver.close()
