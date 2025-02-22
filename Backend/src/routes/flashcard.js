import {Router} from "express"
import { createCard, deleteCard, getCards, updateCard } from "../controllers/flashcard.js"

const router = Router()

router.route("/flashcards")
        .post(createCard)
        .get(getCards)

router.route("/flashcards/:id")
        .put(updateCard)
        .delete(deleteCard)
        
export default router