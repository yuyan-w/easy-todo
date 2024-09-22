import React, { useState } from "react";
import { Task } from "@prisma/client";

type Tasks = {
  task: Task;
  deleteTask: (id: string) => Promise<void>;
};

const TaskItem: React.FC<Tasks> = ({ task, deleteTask }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async (id: string) => {
    setIsLoading(true);
    await deleteTask(id);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-indigo-600">{task.title}</h2>
        <p className="text-gray-500 text-sm">
          Created At: {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>
      <button
        className={`px-4 py-2 text-white font-bold rounded-lg transition-colors duration-300 ease-in-out 
          ${
            isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        disabled={isLoading}
        onClick={() => handleClick(task.id)}
      >
        {isLoading ? "削除中..." : "削除"}
      </button>
    </>
  );
};

export default TaskItem;
