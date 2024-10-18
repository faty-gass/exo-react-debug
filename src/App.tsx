import { NavigationMenuDemo } from "./components/NavigationBar";
import TaskManagerComponent from "./components/TaskManager";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full flex flex-col items-center py-8 container">
        <NavigationMenuDemo />
      </div>
      <div className="h-screen flex flex-col items-center py-8 container">
        <div className="flex flex-col gap-4 items-start justify-center w-3/4 max">
          <div className="col-span-2 ">
            <div className="text-4xl font-bold mb-2">{t("title")}</div>
            <div className="text-lg text-muted-foreground">
              {t("description")}
            </div>
          </div>
          <TaskManagerComponent />
        </div>
      </div>
    </>
  );
}

export default App;
