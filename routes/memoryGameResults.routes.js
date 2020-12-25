const {Router} = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const Result = require('../models/Result');
const router = Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log(req.user.userId)
        const result = await Result.find({owner: req.user.userId});
        res.json(result);

    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
    }
);

router.post('/save', authMiddleware, async (req, res) => {
    try {
        
        const result = new Result({
            owner: req.user.userId,
            score: req.body.score,
            cardsInGame: req.body.cardsInGame,
            matchesPerCard: req.body.MatchesPerCard
        });
        await result.save();

        res.json({});

    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
    }
)

module.exports = router;