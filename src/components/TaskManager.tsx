import { FormEvent, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { addTask } from "../taskSlice";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import TaskCard from "./TaskCard";

function TaskManagerComponent() {
  const [taskContent, setTaskContent] = useState("");
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.taskManager.tasks);

  const handleAddTask = () => {
    dispatch(
      addTask({
        content: taskContent,
        owner: "User",
        creationDate: new Date().getDate().toLocaleString(),
        checked: false,
        timeSpent: 0,
      })
    );
    setTaskContent("");
  };

  const handleEditTaskContent = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setTaskContent(e.currentTarget.value);
    },
    []
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex gap-2">
        <Input
          type="text"
          value={taskContent}
          onChange={handleEditTaskContent}
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
      <div className="w-5/6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskManagerComponent;
