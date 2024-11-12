import React, { useCallback, useEffect, useState } from "react";
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
  const subTask = task?.subTasks.find((task) => task?.id === subTaskId);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (task && isActive) {
      interval = setInterval(() => {
        if (subTaskId && subTask) {
          const newSecondSubtask = subTask.timeSpent + 1;
          dispatch(
            updateSubTask({
              taskId: taskId,
              subTaskId: subTaskId,
              timeSpent: newSecondSubtask,
            })
          );
        } else {
          const newSeconds = task.timeSpent + 1;
          dispatch(
            updateTask({
              taskId,
              timeSpent: newSeconds,
            })
          );
        }
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, dispatch, taskId, subTaskId, subTask, task]);

  const seconds = (subTaskId ? subTask?.timeSpent : task?.timeSpent) ?? 0;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  const switchButton = useCallback(() => {
    setIsActive((state) => !state);
  }, []);

  return (
    <Button
      variant={isActive ? "destructive" : "default"}
      onClick={switchButton}
    >
      {isActive
        ? `${formattedMinutes}:${formattedSeconds}`
        : `Start ${formattedMinutes}:${formattedSeconds}`}
    </Button>
  );
};

export default Timer;
