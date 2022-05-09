const { Router } = require('express');
const { get404 } = require ('../controllers/web.controllers');

const router = Router();

// 404
//router.get('*', get404);
router.use(get404);

/*
// 404
router.use((req, res, next) => {
    res.status(404).json({
        status:"Error", 
        msg:"Ups! not found"
    });
    return;
});
*/

module.exports = router;