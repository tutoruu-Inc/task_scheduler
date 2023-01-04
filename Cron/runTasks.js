import { getAll, remove, update } from "../Task/service.js";
import fetch from "node-fetch";

export const runTasks = async () => {
  const tasks = await getAll();
  const current_tasks = tasks.filter(
    ({ at, completed, failed }) => at < new Date() && !failed && !completed
  );

  let completed = 0;
  let failed = 0;
  for (const { data, endpoint, identifier, method, headers } of current_tasks) {
    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(headers ?? {}),
        },
        body: JSON.stringify(data),
      });

      if (!res.ok)
        throw new Error(`Request failed with status code ${res.status}`);

      await update({ identifier, completed: true });
      completed++;
    } catch (e) {
      await update({ identifier, failed: true });
      failed++;
      console.error(e);
    }
  }
  if (completed) console.log(`completed ${completed} tasks`);
  if (failed) console.log(`failed ${failed} tasks`);
};
