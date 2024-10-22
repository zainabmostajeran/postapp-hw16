import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLike } from "react-icons/ai";
import { fetchAllComments } from "../apis/coment.api";

export const UserComments: React.FC = () => {
  const { id } = useParams();

  const comments = useQuery({
    queryKey: ["user-comments", id],
    queryFn: () => fetchAllComments({ skip: 0 }),
  });

  const filteredComments = comments.data?.comments.filter(
    (comment) => Number(comment.user.id) === Number(id)
  );

  return (
    <section className="bg-blue-100 p-4 mt-6 rounded-lg">
      <p className="font-bold pb-3">comments:</p>
      {(filteredComments || []).map((el) => (
        <div key={el.id} className="flex justify-between items-center">
          <p>{el.body}</p>
          <div className="flex gap-2 items-center justify-center">
            <p>{el.likes}</p>
            <AiOutlineLike className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      ))}
    </section>
  );
};
