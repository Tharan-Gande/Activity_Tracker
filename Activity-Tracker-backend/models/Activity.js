// Activity Model
const mongoose = require('mongoose');
const moment = require('moment');

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: function () {
    const now = moment().format("YYYY-MM-DD");
    return moment(this.date).isAfter(now) ? 'in progress' : 'pending';
  }},
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
