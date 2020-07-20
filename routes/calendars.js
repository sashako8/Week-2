const { Router } = require("express");
const router = Router();

const CalendarDAO = require('../daos/calendars');

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send('body parameter "name" is required"');
  } else {
    const calendar = await CalendarDAO.create(name);
    res.json(calendar);
  }
});

router.get("/:calendarId", async (req, res, next) => {
  const calendar = await CalendarDAO.getById(req.params.calendarId);
  if (calendar) {
    res.json(calendar);
  } else {
    res.sendStatus(404);
  }
});

router.get("/", async (req, res, next) => {
  const calendars = await CalendarDAO.getAll();
  res.json(calendars);
});

router.put("/:calendarId", async (req, res, next) => {
  const calendarId = req.params.calendarId;
  const { name } = req.body;
    const updatedCalendar = await CalendarDAO.updateById(calendarId, name);
    res.json(updatedCalendar);

});

router.delete("/:calendarId", async (req, res, next) => {
  const calendarId = req.params.calendarId;
  try {
    await CalendarDAO.deleteById(calendarId);
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e.message);
  }
})

module.exports = router;