const express = require('express');
const router = express.Router();

router.post('/postreview', async (req, res) => {
    try {
        const { comment } = req.body
        if (comment.length > 255) {
            return res.status(400).json({message: "Review length exceeds character limit"})
        }
        const review = await db.Review.create({
            userId: req.body.userId,
            serviceProviderId: req.body.serviceProviderId,
            rating: req.body.rating,
            comment: req.body.comment

        });
        res.status(201).json(review)

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")

    }

       
});

router.get('/getreview/:id', async (req, res) => {
    try{
        const review = await Review.findByPk(req.params.id);
        if (review) {
            res.send(review);
        } else {
            res.status(404).send("Review not found")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});

router.delete('/reviews/:id', async (req, res) => {
    try{
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({message: "Review not found"})
        }
        await review.destroy();
        return res.status(200).json({message: "Review not found"});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
});

module.exports = router;