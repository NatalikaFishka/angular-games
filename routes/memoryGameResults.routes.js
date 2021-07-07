const { Router } = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const Result = require('../models/Result');
const router = Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log(req.user.userId)
        const userResults = await Result.find({ owner: req.user.userId });
        const userResultsForFrontEnd = userResults.map((object) => {
            const { id, cardsCategory, score, cardsInGame, matchesPerCard, data } = object;
            return { id, cardsCategory, score, cardsInGame, matchesPerCard, data }
        });

        res.json(userResultsForFrontEnd);

    } catch (e) {
        res.status(500).json({ message: "Something went wrong" })
    }
}
);

router.post('/save', authMiddleware, async (req, res) => {
    try {
        const result = new Result({
            owner: req.user.userId,
            cardsCategory: req.body.cardsCategory,
            score: req.body.score,
            cardsInGame: req.body.cardsInGame,
            matchesPerCard: req.body.matchesPerCard
        });
        const { id, cardsCategory, score, cardsInGame, matchesPerCard, data } = await result.save();

        console.log("req", req)

        res.json({ id, cardsCategory, score, cardsInGame, matchesPerCard, data });

    } catch (e) {
        res.status(500).json({ message: "Something went wrong" })
    }
}
)

router.post('/update', authMiddleware, async (req, res) => {
    try {

        const resultToUpdate = await Result.findByIdAndUpdate(req.body.id, {
            score: req.body.score,
            data: Date.now()
        }, {
            new: true,
            useFindAndModify: false
        });

        resultToUpdate.save();

        const userResults = await Result.find({ owner: req.user.userId });
        const userResultsForFrontEnd = userResults.map((object) => {
            const { id, score, cardsInGame, matchesPerCard, data } = object;
            return { id, score, cardsInGame, matchesPerCard, data }
        });

        res.json(userResultsForFrontEnd)

    } catch (e) {
        res.status(500).json({ message: "Something went wrong" })
    }
}
)
module.exports = router;