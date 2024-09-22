import React, { useState } from "react";

type TaskFromProps = {
  addTask: (task: string) => Promise<void>;
};

const TaskForm: React.FC<TaskFromProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (title.trim()) {
      await addTask(title);
      setTitle("");
    }
    setIsLoading(false);
  };
  return (
    <form className="space-x-6 flex items-center bg-white p-4 rounded-lg shadow-lg">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
        type="text"
        value={title}
        placeholder="新しいタスクを入力"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <button
        className={`w-24 border-2 px-4 py-2 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
          isLoading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-indigo-500 hover:bg-indigo-600"
        }`}
        disabled={isLoading}
        onClick={handleClick}
      >
        作成
      </button>
    </form>
  );
};

export default TaskForm;
