import React from 'react';
import { Html, Head, Body, Container, Text, Heading, Preview } from '@react-email/components';

export const ApplicationSuccessEmail = ({ applicantName, jobTitle, companyName }) => {
    return (
        <Html>
            <Head />
            <Preview>Application received for {jobTitle}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Application Successful! 🎉</Heading>
                    <Text style={text}>Hi {applicantName},</Text>
                    <Text style={text}>
                        We have successfully received your application for the <strong>{jobTitle}</strong> position at <strong>{companyName}</strong>.
                    </Text>
                    <Text style={text}>
                        The recruitment team is currently reviewing your profile. We will notify you of any status updates regarding your application.
                    </Text>
                    <Text style={text}>Best of luck,</Text>
                    <Text style={text}>The Job Portal Team</Text>
                </Container>
            </Body>
        </Html>
    );
};

// Basic inline styling
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
};

const h1 = {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    padding: '0 48px',
};

const text = {
    color: '#525f7f',
    fontSize: '16px',
    lineHeight: '24px',
    padding: '0 48px',
};
