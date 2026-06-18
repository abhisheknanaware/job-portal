import React from 'react';
import { Html, Head, Body, Container, Text, Heading, Preview } from '@react-email/components';

export const ApplicationSuccessEmail = ({ applicantName, jobTitle, companyName }) => {
    return React.createElement(Html, null,
        React.createElement(Head, null),
        React.createElement(Preview, null, `Application received for ${jobTitle}`),
        React.createElement(Body, { style: main },
            React.createElement(Container, { style: container },
                React.createElement(Heading, { style: h1 }, "Application Successful! 🎉"),
                React.createElement(Text, { style: text }, `Hi ${applicantName},`),
                React.createElement(Text, { style: text },
                    "We have successfully received your application for the ",
                    React.createElement("strong", null, jobTitle),
                    " position at ",
                    React.createElement("strong", null, companyName),
                    "."
                ),
                React.createElement(Text, { style: text },
                    "The recruitment team is currently reviewing your profile. We will notify you of any status updates regarding your application."
                ),
                React.createElement(Text, { style: text }, "Best of luck,"),
                React.createElement(Text, { style: text }, "The Job Portal Team")
            )
        )
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
