import express, { Router } from "express";
import MatchController from "../controllers/MatchController";

export default function createMatchingRouter(controller: MatchController): Router {
    const router: Router = express.Router();

    router.post("/findMatch", (req, res, next) => controller.findMatch(req, res, next));
    router.delete("/cancelMatch", (req, res, next) => controller.cancelMatch(req, res, next));

    return router;
}
