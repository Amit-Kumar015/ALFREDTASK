import { isValidObjectId } from "mongoose";
import { Card } from "../models/Card.model.js";

const createCard = async (req, res) => {
    try {
        const {question, answer} = req.body
    
        if(!question || !answer){
            return res
            .status(404)
            .json({ error: "provide both question and answer"})
        }
    
        const card = await Card.create({
            question,
            answer,
            // user: req.user.id
        })
    
        if(!card){
            return res
            .status(500)
            .json({error: "error while creating the card in db"})
        }

        return res
        .status(200)
        .json({Card: "card created successfully"})

    } catch (error) {
        console.error("error while creating card")
        return res
        .status(500)
        .json({error: "error while creating card"})
    }
}

const getCards = async (req, res) => {
    try {
        // const allCards = await Card.find()
        
        const cardsData = await Card.aggregate([
            {
                $project: {
                    id: 1,
                    level: 1,
                    question: 1,
                    answer: 1,
                    date: 1
                }
            }
        ])

        return res
        .status(200)
        .json({data: cardsData})

    } catch (error) {
        console.error("error while fetching all cards data")
        return res
        .status(500)
        .json({error: "error while fetching all cards data"})
    }
}

const updateCard = async (req, res) => {
    try {
        const {newQuestion, newAnswer} = req.body
        const {id} = req.params

        if(!id || !isValidObjectId(id)){
            return res
            .status(400)
            .json({error: "provide valid card id"})
        }

        if(!newQuestion || !newAnswer){
            return res
            .status(404)
            .json({error: "provide both question and answer"})
        }

        const card = await Card.findByIdAndUpdate(
            id,
            {
                $set: {
                    question: newQuestion,
                    answer: newAnswer
                }
            },
            {
                new: true
            }
        )

        if(!card){
            return res
            .status(404)
            .json({error: "card not found"})
        }

        return res
        .status(200)
        .json({updatedCard: card})

    } catch (error) {
        console.error("error while updating the card")
        return res
        .status(500)
        .json({error: "error while updating the card"})
    }
}

const deleteCard = async (req, res) => {
    try {
        const {id} = req.params

        if(!id || !isValidObjectId(id)){
            return res
            .status(400)
            .json({error: "provide valid card id"})
        }

        const card = await Card.findByIdAndDelete(id)

        if(!card){
            return res
            .status(404)
            .json({error: "card not found"})
        }

        return res
        .status(200)
        .json({deletedCard: card})

    } catch (error) {
        console.error("error while deleting the card")
        return res
        .status(500)
        .json({error: "error while deleting the card"})
    }
}

export {createCard, getCards, updateCard, deleteCard}