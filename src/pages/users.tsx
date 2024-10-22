import { fetchAllUser } from "../apis/user.api";
import { UserCard, UserCardSkeleton } from "../components/usercard";
import { Link } from "react-router-dom";
import React from "react";
import { useQuery } from "@tanstack/react-query";


export const UsersPage: React.FC = () => {

  const users = useQuery({
    queryKey: ["fetching-users"],
    queryFn: () => fetchAllUser({ skip: 0 }),
  });
  console.log(users.data?.users);
  
  return (
    <main className="min-h-screen w-full bg-blue-100 px-2">
      <section className="mx-auto max-w-[600px] w-full grid grid-cols-1 gap-y-4 py-10">
        {users.data?.users.map((el, index) => (
          <Link key={index} to={`/user-info/${el.id}`}>
            <UserCard
              image={el.image}
              firstName={el.firstName}
              lastName={el.lastName}
              email={el.email}
              age={el.age}
              birthDate={el.birthDate}
              address={el.address}
            />
          </Link>
        ))}

        {users.isLoading && (
          <>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </>
        )}
      </section>
    </main>
  );
};