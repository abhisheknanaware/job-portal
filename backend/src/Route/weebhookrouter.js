import { Router } from "express";
import { clerkWebhooks } from "../controller/webhook.js";
const webhookRouter = Router();
webhookRouter.post('/webhooks',clerkWebhooks);
export default webhookRouter;