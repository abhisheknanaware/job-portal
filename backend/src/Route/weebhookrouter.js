import { Router } from "express";
import { clerkWebhooks } from "../controller/webhook";
const webhookRouter = Router();
webhookRouter.post('/webhooks',clerkWebhooks);
export default webhookRouter;