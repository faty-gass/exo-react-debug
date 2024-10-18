/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";
import { updateSubTask, updateTask } from "../taskSlice";
import { Button } from "./ui/button";

interface TimerProps {
  taskId: string;
  subTaskId?: string;
}

const Timer: React.FC<TimerProps> = ({ taskId, subTaskId }) => {
  const dispatch = useDispatch();
  const task = useAppSelector((state) =>
    state.taskManager.tasks.find((task) => task.id === taskId)
  );
  const subTask = useAppSelector((state) =>
    state.taskManager.tasks
      .find((task) => task.id === taskId)
      ?.subTasks.find((subTask) => subTask.id === subTaskId)
  );

  const [isActive, setIsActive] = useState(false);
  let instance = task;
  if (subTask) {
    instance = subTask;
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        const newSeconds = (instance?.timeSpent || 0) + 1;
        if (subTask && subTaskId) {
          dispatch(
            updateSubTask({
              taskId: taskId,
              subTaskId: subTaskId,
              timeSpent: newSeconds,
            })
          );
        }
        dispatch(
          updateTask({
            taskId,
            timeSpent: newSeconds,
          })
        );
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, dispatch, taskId, subTaskId]);

  const seconds = instance?.timeSpent || 0;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return (
    <Button
      variant={isActive ? "destructive" : "default"}
      onClick={() => setIsActive(!isActive)}
    >
      {isActive
        ? `${formattedMinutes}:${formattedSeconds}`
        : `Start ${formattedMinutes}:${formattedSeconds}`}
    </Button>
  );
};

export default Timer;
