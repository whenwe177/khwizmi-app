import QuizApp from "@/components/Quiz/QuizApp";
import { useAppContext } from "@/context/AppContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const QuizPage = () => {
  const { content } = useAppContext();

  const { data, isLoading, isError, mutate, status, isIdle } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/khwizify", {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      if (!response.ok) throw new Error(`${response.status}`);
      const questions = await response.json();
      return questions;
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    console.log({ status });
  }, [status]);

  if (isLoading || isIdle) return <p>Loading</p>;

  if (isError) return <p>Error</p>;

  return (
    <div>
      <QuizApp quiz={data} />
    </div>
  );
};

export default QuizPage;
