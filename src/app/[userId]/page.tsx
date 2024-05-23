"use client";
import UserCard from "@/components/userCard";
import EnhancedTable from "@/components/userTable";
import CircularProgress from "@mui/material/CircularProgress";
import { getUser } from "@/services/usersApi";
import { useEffect, useState } from "react";

function UserDetail({ params: { userId } }: { params: { userId: string } }) {
  const [user, setUser] = useState<UserProps>();
  const [isLoading, setIsLoading] = useState(true);

  async function getUserFunction() {
    const user = await getUser(userId);
    setUser(user.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getUserFunction();
  }, []);

  return (
    <>
      {!isLoading && user && user != undefined ? (
        <UserCard user={user} />
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default UserDetail;
