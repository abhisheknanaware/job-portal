import React from 'react';
import { Html, Head, Body, Container, Text, Heading, Preview } from '@react-email/components';

export const ApplicationUpdateEmail = ({ applicantName, jobTitle, companyName, newStatus }) => {
    const statusColor = newStatus.toLowerCase() === 'accepted' ? '#2e7d32'
        : newStatus.toLowerCase() === 'rejected' ? '#d32f2f'
            : '#1976d2';

    return React.createElement(Html, null,
        React.createElement(Head, null),
        React.createElement(Preview, null, `Update regarding your application for ${jobTitle}`),
        React.createElement(Body, { style: main },
            React.createElement(Container, { style: container },
                React.createElement(Heading, { style: h1 }, "Application Status Update"),
                React.createElement(Text, { style: text }, `Hi ${applicantName},`),
                React.createElement(Text, { style: text },
                    "There has been an update to your application for the ",
                    React.createElement("strong", null, jobTitle),
                    " position at ",
                    React.createElement("strong", null, companyName),
                    "."
                ),
                React.createElement(Text, { style: text },
                    "Your application status is now: ",
                    React.createElement("strong", { style: { color: statusColor, textTransform: 'uppercase' } }, newStatus)
                ),
                React.createElement(Text, { style: text },
                    newStatus.toLowerCase() === 'accepted'
                        ? "Congratulations! 🎉 The team will be in touch with you shortly regarding the next steps."
                        : newStatus.toLowerCase() === 'rejected'
                            ? "Unfortunately, the team has decided to move forward with other candidates at this time. We wish you the best of luck in your job search!"
                            : "Your application is still progressing. We'll keep you posted!"
                ),
                React.createElement(Text, { style: text }, "Best regards,"),
                React.createElement(Text, { style: text }, "The Job Portal Team")
            )
        )
    );
};

// Basic inline styling
const main = { backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 0 48px', marginBottom: '64px' };
const h1 = { color: '#333', fontSize: '24px', fontWeight: 'bold', padding: '0 48px' };
const text = { color: '#525f7f', fontSize: '16px', lineHeight: '24px', padding: '0 48px' };
