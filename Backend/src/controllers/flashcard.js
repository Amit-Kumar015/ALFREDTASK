import mongoose, { isValidObjectId } from "mongoose";
import { Card } from "../models/Card.model.js";

const createCard = async (req, res) => {
    try {
        const { question, answer } = req.body

        if (!question || !answer) {
            return res
                .status(404)
                .json({ error: "provide both question and answer" })
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized - User ID missing" });
        }

        console.log("User ID:", req.user._id); 

        const card = await Card.create({
            question,
            answer,
            user: req.user?._id
        })

        if (!card) {
            return res
                .status(500)
                .json({ error: "error while creating the card in db" })
        }

        return res
            .status(200)
            .json({ Card: "card created successfully" })

    } catch (error) {
        console.error("error while creating card")
        return res
            .status(500)
            .json({ error: "error while creating card" })
    }
}

const getCards = async (req, res) => {
    try {
        const userId = req.user?._id; 

        const cardsData = await Card.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userId) }
            },
            {    
                $project: {
                    id: "$_id",
                    level: 1,
                    question: 1,
                    answer: 1,
                    nextReviewDate: 1
                }
            }
        ]);

        return res
            .status(200)
            .json({ data: cardsData });

    } catch (error) {
        console.error("Error while fetching user's cards data:", error);
        return res
            .status(500)
            .json({ error: "Error while fetching user's cards data" });
    }
}

const updateCard = async (req, res) => {
    try {
        const { newQuestion, newAnswer, newLevel } = req.body
        const { id } = req.params

        if (!id || !isValidObjectId(id)) {
            return res
                .status(400)
                .json({ error: "provide valid card id" })
        }

        if (!newQuestion && !newAnswer && !newLevel) {
            return res
                .status(404)
                .json({ error: "provide atleast question, answer or level" })
        }

        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
        }

        if (!card) {
            return res
                .status(404)
                .json({ error: "card not found" })
        }

        // Update card fields if new values are provided
        card.question = newQuestion || card.question;
        card.answer = newAnswer || card.answer;
        card.level = newLevel || card.level;

        // Save the updated card
        await card.save();

        return res
            .status(200)
            .json({ updatedCard: card })

    } catch (error) {
        console.error("error while updating the card")
        return res
            .status(500)
            .json({ error: "error while updating the card" })
    }
}

const deleteCard = async (req, res) => {
    try {
        const { id } = req.params

        if (!id || !isValidObjectId(id)) {
            return res
                .status(400)
                .json({ error: "provide valid card id" })
        }

        const card = await Card.findByIdAndDelete(id)

        if (!card) {
            return res
                .status(404)
                .json({ error: "card not found" })
        }

        return res
            .status(200)
            .json({ deletedCard: card })

    } catch (error) {
        console.error("error while deleting the card")
        return res
            .status(500)
            .json({ error: "error while deleting the card" })
    }
}

export { createCard, getCards, updateCard, deleteCard }