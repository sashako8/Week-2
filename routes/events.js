const { Router } = require("express");
const eventRouter = Router({mergeParams: true});

const EventDAO = require('../daos/events');

eventRouter.post("/", async (req, res, next) => {
  const { name, date } = req.body;
  if (!name || !date ) {
    res.status(400).send('body parameters "name" and "date" are required"');
  } else {
    const event = await EventDAO.create(name, date);
    res.json(event);
  }
});

eventRouter.get("/:eventId", async (req, res, next) => {
  const event = await EventDAO.getById(req.params.eventId);
  if (event) {
    res.json(event);
  } else {
    res.sendStatus(404);
  }
});

eventRouter.get("/", async (req, res, next) => {
  const events = await EventDAO.getAll();
  res.json(events);
});

eventRouter.put("/:eventId", async (req, res, next) => {
  const eventId = req.params.eventId;
  const event = req.body;
    const updatedEvent = await EventDAO.updateById(eventId, event);
    res.json(updatedEvent);

});

eventRouter.delete("/:eventId", async (req, res, next) => {
  const eventId = req.params.eventId;
  try {
    await EventDAO.deleteById(eventId);
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e.message);
  }
})

module.exports = eventRouter;