import 'dotenv/config';
import './config/instrument.js'
import express from 'express';
import cors from 'cors';
import {clerkMiddleware} from '@clerk/express';
import appRouter from './Route/approute.js';
import webhookRouter from './Route/weebhookrouter.js';
import CompanyRouter from './Route/companyRoutes.js';
import connectDb from './config/db.js';
import dns from 'dns';
import * as Sentry from "@sentry/node";
import connectCloudinary from './config/cloudinary.js';
import jobRouter from './Route/jobRoutes.js';
import UserRouter from './Route/userroutes.js';

try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (err) {
    console.warn("Unable to set DNS servers, using default:", err);
}

const app=express();

app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

app.use(webhookRouter);
app.use(appRouter);

app.use('/api/company',CompanyRouter);
app.use('/api/jobs',jobRouter);
app.use('/api/users',UserRouter);

Sentry.setupExpressErrorHandler(app);
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

const port=process.env.PORT ||3000;

// Connect to services asynchronously (non-blocking for Vercel)
connectCloudinary().catch((err) => console.error("Cloudinary Connection Error:", err));
connectDb().catch((err) => console.error("MongoDB Connection Error:", err));

if (!process.env.VERCEL) {
    app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
    })
}

export default app;


