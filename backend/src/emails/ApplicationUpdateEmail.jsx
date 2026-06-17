import React from 'react';
import { Html, Head, Body, Container, Text, Heading, Preview } from '@react-email/components';

export const ApplicationUpdateEmail = ({ applicantName, jobTitle, companyName, newStatus }) => {

    // Make the text green for accepted, red for rejected, blue for anything else
    const statusColor = newStatus.toLowerCase() === 'accepted' ? '#2e7d32'
        : newStatus.toLowerCase() === 'rejected' ? '#d32f2f'
            : '#1976d2';

    return (
        <Html>
            <Head />
            <Preview>Update regarding your application for {jobTitle}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Application Status Update</Heading>
                    <Text style={text}>Hi {applicantName},</Text>
                    <Text style={text}>
                        There has been an update to your application for the <strong>{jobTitle}</strong> position at <strong>{companyName}</strong>.
                    </Text>
                    <Text style={text}>
                        Your application status is now: <strong style={{ color: statusColor, textTransform: 'uppercase' }}>{newStatus}</strong>
                    </Text>

                    {/* Dynamic Message based on status */}
                    <Text style={text}>
                        {newStatus.toLowerCase() === 'accepted'
                            ? "Congratulations! 🎉 The team will be in touch with you shortly regarding the next steps."
                            : newStatus.toLowerCase() === 'rejected'
                                ? "Unfortunately, the team has decided to move forward with other candidates at this time. We wish you the best of luck in your job search!"
                                : "Your application is still progressing. We'll keep you posted!"}
                    </Text>

                    <Text style={text}>Best regards,</Text>
                    <Text style={text}>The Job Portal Team</Text>
                </Container>
            </Body>
        </Html>
    );
};

// Basic inline styling
const main = { backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 0 48px', marginBottom: '64px' };
const h1 = { color: '#333', fontSize: '24px', fontWeight: 'bold', padding: '0 48px' };
const text = { color: '#525f7f', fontSize: '16px', lineHeight: '24px', padding: '0 48px' };
