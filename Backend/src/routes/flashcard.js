import {Router} from "express"
import { createCard,
        deleteCard,
        getCards,
        updateCard,
} from "../controllers/flashcard.js"
import { verifyJWT } from "../middleware/authMiddleware.js"

const router = Router()
// router.use(verifyJWT)

router.route("/flashcards")
        .post(verifyJWT, createCard)
        .get(verifyJWT, getCards)

router.route("/flashcards/:id")
        .put(updateCard)
        .delete(deleteCard)
        
export default router