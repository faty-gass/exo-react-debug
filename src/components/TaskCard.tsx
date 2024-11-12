import { FormEvent, useCallback, useState } from "react";
import { useAppDispatch } from "../store";
import {
  removeTask,
  addSubTask,
  updateTask,
  Task,
  switchTaskCheck,
} from "../taskSlice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import EditableText from "./EditableText";
import Timer from "./Timer";
import SubTask from "./SubTask";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const dispatch = useAppDispatch();
  const [subTaskContent, setSubTaskContent] = useState("");

  const handleUpdateCheckedTask = useCallback(() => {
    dispatch(
      switchTaskCheck({
        taskId: task.id,
      })
    );
  }, [dispatch, task.id]);

  const handleUpdateTask = useCallback(
    (content: string) => {
      dispatch(
        updateTask({
          taskId: task.id,
          content,
        })
      );
    },
    [dispatch, task.id]
  );

  const handleRemoveTask = useCallback(() => {
    dispatch(removeTask(task.id));
  }, [dispatch, task.id]);

  const handleEditSubTaskName = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setSubTaskContent(e.currentTarget.value);
    },
    []
  );

  const handleAddSubTask = useCallback(() => {
    dispatch(
      addSubTask({ taskId: task.id, content: subTaskContent, owner: "User" })
    );
    setSubTaskContent("");
  }, [dispatch, subTaskContent, task.id]);

  return (
    <Card className="min-h-72 p-1">
      <CardHeader>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 items-center justify-center">
            <Button
              id="jfnr"
              variant={task.checked ? "check" : "outline"}
              onClick={handleUpdateCheckedTask}
            >
              {task.checked ? "✓" : "☐"}
            </Button>
            <CardTitle>
              <EditableText
                text={task.content}
                onTextChange={handleUpdateTask}
                className={`custom-css-class ${
                  task.checked ? "line-through text-gray-500" : ""
                }`}
              />
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <Timer taskId={task.id} />
            <Button variant="destructive" onClick={handleRemoveTask}>
              X
            </Button>
          </div>
        </div>
        <CardDescription>{task.description}</CardDescription>
        <CardDescription>Adding Components</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {task.subTasks.map((subTask) => (
          <SubTask key={subTask.id} taskId={task.id} subTask={subTask} />
        ))}
        <div className="flex gap-2">
          <Input
            type="text"
            value={subTaskContent}
            onChange={handleEditSubTaskName}
          />
          <Button onClick={handleAddSubTask}>Add SubTask</Button>
        </div>
      </CardContent>
    </Card>
  );
}
