import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
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
        checked?:boolean;
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
          if (action.payload.content) subTask.content = action.payload.content;
          if (action.payload.timeSpent !== undefined)
            subTask.timeSpent = action.payload.timeSpent ?? 0;
            if (action.payload.checked !== undefined)
            task.checked = action.payload.checked;
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
        estimatedTime?: number;
        description?: string;
        taskId: string;
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
    checkTask: (
      state,
      action: PayloadAction<{ taskId: string; checked: boolean }>
    ) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.checked = action.payload.checked;
      }
    },
  },
});

export const {
  addTask,
  removeTask,
  addSubTask,
  updateTask,
  checkTask,
  updateSubTask,
  removeSubTask,
} = taskSlice.actions;

export default taskSlice.reducer;
