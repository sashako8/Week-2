const Calendars = require('../models/calendars');

module.exports = {};
  
module.exports.create = async (name) => {
  return await Calendars.create({ name });
};

module.exports.getById = async (calendarId) => {
  try {
    const calendar = await Calendars.findOne({ _id: calendarId }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.getAll = async () => {
  return await Calendars.find();
}

module.exports.updateById = async (calendarId, name) => {
    return await Calendars.update({ _id: calendarId }, { name });
};

module.exports.deleteById = async (calendarId) => {
  await Calendars.remove({ _id: calendarId });
};
