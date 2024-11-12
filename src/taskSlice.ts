import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  content: string;
  creationDate: string;
  estimatedTime?: number;
  checked: boolean;
  timeSpent: number;
  owner: string;
  description?: string;
  subTasks: Task[];
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "subTasks">>) => {
      state.tasks.push({
        ...action.payload,
        id: Date.now().toString(),
        subTasks: [],
      });
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    removeSubTask: (
      state,
      action: PayloadAction<{ taskId: string; subTaskId: string }>
    ) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.subTasks = task.subTasks.filter(
          (subTask) => subTask.id !== action.payload.subTaskId
        );
      }
    },
    updateSubTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        subTaskId: string;
        content?: string;
        timeSpent?: number;
        checked?: boolean;
      }>
    ) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        const subTask = task.subTasks.find(
          (subTask) => subTask.id === action.payload.subTaskId
        );
        if (subTask) {
          action.payload.content && (subTask.content = action.payload.content);
          action.payload.timeSpent &&
            (subTask.timeSpent = action.payload.timeSpent);
          action.payload.checked && (subTask.checked = action.payload.checked);
        }
      }
    },
    addSubTask: (
      state,
      action: PayloadAction<{ taskId: string; content: string; owner: string }>
    ) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.subTasks.push({
          ...action.payload,
          id: Date.now().toString(),
          creationDate: "",
          checked: false,
          estimatedTime: 0,
          timeSpent: 0,
          subTasks: [],
        });
      }
    },
    updateTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        estimatedTime?: number;
        description?: string;
        content?: string;
        timeSpent?: number;
        checked?: boolean;
      }>
    ) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        if (action.payload.content) task.content = action.payload.content;
        if (action.payload.description)
          task.content = action.payload.description;
        if (action.payload.estimatedTime)
          task.estimatedTime = action.payload.estimatedTime;
        if (action.payload.timeSpent !== undefined)
          task.timeSpent = action.payload.timeSpent ?? 0;
        if (action.payload.checked !== undefined)
          task.checked = action.payload.checked;
      }
    },
    switchTaskCheck: (state, action: PayloadAction<{ taskId: string }>) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.checked = !task.checked;
        task.checked &&
          task.subTasks.forEach((subtask) => (subtask.checked = true));
      }
    },
    switchSubTaskCheck: (
      state,
      action: PayloadAction<{ taskId: string; subTaskId: string }>
    ) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        const subTask = task.subTasks.find(
          (subtask) => subtask.id === action.payload.subTaskId
        );
        if (subTask) {
          subTask.checked = !subTask.checked;

          // check task when all subtasks are checked
          if (task.subTasks.every((subtask) => subtask.checked)) {
            task.checked = true;
          }
        }
      }
    },
  },
});

export const {
  addTask,
  removeTask,
  addSubTask,
  updateTask,
  switchTaskCheck,
  switchSubTaskCheck,
  updateSubTask,
  removeSubTask,
} = taskSlice.actions;

export default taskSlice.reducer;
