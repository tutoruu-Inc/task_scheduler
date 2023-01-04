import Tasks from "./model.js";

function getDate(durationFromNow = "1 minute") {
  const [duration, unit] = durationFromNow.split(" ");
  const date = new Date();
  if (unit.toLowerCase().includes("minute")) return date.setMinutes(date.getMinutes() + parseInt(duration));
  if (unit.toLowerCase().includes("hour")) return date.setHours(date.getHours() + parseInt(duration));
  if (unit.toLowerCase().includes("day")) return date.setDate(date.getDate() + parseInt(duration));
  if (unit.toLowerCase().includes("week")) return date.setDate(date.getDate() + parseInt(duration) * 7);
}

function formatTask(task) {
  const { on, after } = task;
  task.at = on ? new Date(on) : getDate(after);
  return task;
}

export const create = (task) => Tasks.create(formatTask(task));
export const getOne = (search) => Tasks.findOne(search);
export const getAll = () => Tasks.find();
export const remove = (identifier) => Tasks.deleteOne({ identifier });
export const update = (task) =>
  Tasks.updateOne({ identifier: task.identifier }, formatTask(task));
