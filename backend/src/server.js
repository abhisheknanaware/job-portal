import './config/instrument.js'
import express from 'express';
import cors from 'cors';
import appRouter from './Route/approute.js';
import webhookRouter from './Route/weebhookrouter.js';
import 'dotenv/config'
import connectDb from './config/db.js';
import dns from 'dns';
import * as Sentry from "@sentry/node";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app=express();

Sentry.setupExpressErrorHandler(app);
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use(cors());
app.use(express.json());
app.use(appRouter)
app.use(webhookRouter);

const port=process.env.PORT ||3000;
connectDb().then(()=>{
    app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
    })
}).catch(()=>{
    console.log("MongoDB Connection Error:", err);
})


