const router = require("express").Router();

const { Player } = require("../../database");

router.get("/", async (req, res) => {
  const players = await Player.findAll();

  res.status(200).json({ players });
});

router.post("/", async (req, res) => {
  const player = await Player.create(req.body);
  res.status(200).json({ player });
});

router.put("/:playerId", async (req, res) => {
  await Player.update(req.body, {
      where:{ id: req.params.playerId }
  });
  res.status(200).json({ message: ` ${playerId} has been modified` });
});


router.delete("/:playerId", async (req, res) => {
    await Player.destroy({
        where:{ id: req.params.playerId }
    });
    res.status(200).json({ message: ` ${playerId} has been removed` });
  });
  


module.exports = router;
