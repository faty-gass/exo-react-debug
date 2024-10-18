import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  addTask,
  removeTask,
  addSubTask,
  updateTask,
  removeSubTask,
  updateSubTask,
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
function TaskManagerComponent() {
  const [taskContent, setTaskContent] = useState("");
  const [subTaskContent, setSubTaskContent] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.taskManager.tasks);

  const handleAddTask = () => {
    dispatch(
      addTask({
        content: taskContent,
        owner: "User",
        creationDate: "",
        checked: false,
        timeSpent: 0,
      })
    );
    setTaskContent("");
  };

  const handleRemoveTask = (taskId: string) => {
    dispatch(removeTask(taskId));
  };
  const handleRemoveSubTask = (taskId: string, subTaskId: string) => {
    dispatch(removeSubTask({ taskId, subTaskId }));
  };
  const handleAddSubTask = (taskId: string) => {
    dispatch(addSubTask({ taskId, content: subTaskContent, owner: "User" }));
    setSubTaskContent("");
  };

  const handleUpdateTask = (taskId: string, newContent: string) => {
    dispatch(
      updateTask({
        taskId,
        content: newContent,
      })
    );
    setEditingTaskId(null);
  };

  const handleUpdateCheckedTask = (taskId: string, checked: boolean) => {
    dispatch(
      updateTask({
        taskId,
        checked: checked,
      })
    );
    setEditingTaskId(null);
  };
  const handleUpdateSubTask = (
    taskId: string,
    subTaskId: string,
    checked: boolean
  ) => {
    dispatch(
      updateSubTask({
        taskId,
        subTaskId,
        checked: checked,
      })
    );
    setEditingTaskId(null);
  };
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex gap-2">
        <Input
          type="text"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
        />
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
      <div className="w-5/6">
        {tasks.map((task) => (
          <Card className="min-h-72 p-1">
            <CardHeader>
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2 items-center justify-center">
                  <Button
                    variant={task.checked ? "check" : "outline"}
                    onClick={() => {
                      handleUpdateCheckedTask(task.id, !task.checked);
                    }}
                  >
                    {task.checked ? "✓" : "☐"}
                  </Button>
                  <CardTitle>
                    <EditableText
                      text={task.content}
                      onTextChange={(e) => handleUpdateTask(task.id, e)}
                      className={`custom-css-class ${
                        task.checked ? "line-through text-gray-500" : ""
                      }`}
                    />
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  <Timer taskId={task.id} />
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveTask(task.id)}
                  >
                    X
                  </Button>
                </div>
              </div>
              <CardDescription>{task.description}</CardDescription>
              <CardDescription>Adding Components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {task.subTasks.map((subTask) => (
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-2 items-center justify-center">
                    <Button
                      variant={subTask.checked ? "Check" : "outline"}
                      onClick={() => {
                        handleUpdateSubTask(
                          task.id,
                          subTask.id,
                          !subTask.checked
                        );
                      }}
                    >
                      {task.checked ? "✓" : ""}
                    </Button>
                    <CardTitle>
                      <span className="text-[#AAA] mr-4">-</span>
                      <EditableText
                        text={subTask.content}
                        onTextChange={(e) => handleUpdateTask(subTask.id, e)}
                        className="custom-css-class"
                      />
                    </CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Timer taskId={task.id} subTaskId={subTask.id} />
                    <Button
                      variant="destructive"
                      onClick={() => handleRemoveSubTask(task.id, subTask.id)}
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={subTaskContent}
                  onChange={(e) => setSubTaskContent(e.target.value)}
                />
                <Button onClick={() => handleAddSubTask(task.id)}>
                  Add SubTask
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TaskManagerComponent;
