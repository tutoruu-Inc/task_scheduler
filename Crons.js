import { CronJob } from "cron";
import { runTasks } from "./Cron/runTasks.js";

const crons = [
    {
        frequency: '* * * * *', // every minute
        job: runTasks
    }
];

export function initCrons() {
  crons.forEach((cron) => {
    const { frequency, job } = cron;
    new CronJob(frequency, async () => {
       await job();
    }).start();
  });
}
