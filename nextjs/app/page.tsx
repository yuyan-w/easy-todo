"use client";

import { useEffect, useState } from "react";

import { Task } from "@prisma/client";
import TaskItem from "./_components/TaskItem";
import TaskForm from "./_components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/tasks`);

      if (!res.ok) {
        setMessage("failed to fetch Tasks");
        return;
      }

      const data: Task[] = await res.json();
      setTasks(data);
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (title: string) => {
    setMessage("");
    try {
      const res = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
      });

      if (!res.ok) {
        setMessage("failed to create Task");
        return;
      }

      const data: Task = await res.json();
      setTasks((prevTasks) => [data, ...prevTasks]);
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  const deleteTask = async (id: string) => {
    setMessage("");
    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (!res.ok) {
        setMessage("failed to delete Task");
        return;
      }
      const data: Task = await res.json();
      const updatedTasks = tasks.filter((task) => task.id !== data.id);
      setTasks(updatedTasks);
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col min-w-[800px] space-y-4 mt-12">
        <h1 className="text-5xl font-bold mb-6 mx-auto text-indigo-600 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
          EasyTODO
        </h1>
        {isLoading ? (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-solid border-opacity-75"></div>
            <p className="mt-4 text-xl text-indigo-600">Loading...</p>
          </div>
        ) : (
          <>
            <TaskForm addTask={addTask} />
            <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg space-y-4">
              {tasks.map((task) => (
                <div
                  key={`task-${task.id}`}
                  className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                  <TaskItem task={task} deleteTask={deleteTask} />
                </div>
              ))}
            </div>
            {message && (
              <div className="flex items-center justify-center mt-4">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md flex items-center space-x-3">
                  <p className="text-sm font-semibold">{message}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
