const Events = require('../models/events');

module.exports = {};
  
module.exports.create = async (name, date) => {
  return await Events.create({ name, date });
};

module.exports.getById = async (eventId) => {
  try {
    const event = await Events.findOne({ _id: eventId }).lean();
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.getAll = async () => {
  return await Events.find();
}

module.exports.updateById = async (eventId, event) => {
  return await Events.update({ _id: eventId }, event);
};

module.exports.deleteById = async (eventId) => {
  await Events.remove({ _id: eventId });
};
