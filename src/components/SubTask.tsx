import { useAppDispatch } from "../store";
import {
  removeSubTask,
  updateSubTask,
  Task,
  switchSubTaskCheck,
} from "../taskSlice";
import { Button } from "./ui/button";
import { CardTitle } from "./ui/card";
import EditableText from "./EditableText";
import Timer from "./Timer";
import { useCallback } from "react";

interface SubTaskProps {
  taskId: string;
  subTask: Task;
}

export default function SubTask({ subTask, taskId }: SubTaskProps) {
  const dispatch = useAppDispatch();

  const handleUpdateCheckedSubTask = useCallback(() => {
    dispatch(
      switchSubTaskCheck({
        taskId: taskId,
        subTaskId: subTask.id,
      })
    );
  }, [dispatch, taskId, subTask]);

  const handleRemoveSubTask = useCallback(() => {
    dispatch(removeSubTask({ taskId, subTaskId: subTask.id }));
  }, [dispatch, subTask.id, taskId]);

  const handleUpdateSubTask = useCallback(
    (content: string) => {
      dispatch(
        updateSubTask({
          taskId: taskId,
          subTaskId: subTask.id,
          content,
        })
      );
    },
    [dispatch, subTask.id, taskId]
  );
  return (
    <div className="flex gap-2 justify-between">
      <div className="flex gap-2 items-center justify-center">
        <Button
          variant={subTask.checked ? "check" : "outline"}
          onClick={handleUpdateCheckedSubTask}
        >
          {subTask.checked ? "✓" : ""}
        </Button>
        <CardTitle>
          <span className="text-[#AAA] mr-4">-</span>
          <EditableText
            text={subTask.content}
            onTextChange={handleUpdateSubTask}
            className="custom-css-class"
          />
        </CardTitle>
      </div>
      <div className="flex gap-2">
        <Timer taskId={taskId} subTaskId={subTask.id} />
        <Button variant="destructive" onClick={handleRemoveSubTask}>
          X
        </Button>
      </div>
    </div>
  );
}
