"use client";
import EnhancedTable from "@/components/userTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { getUsers } from "@/services/usersApi";
import {
  setPage,
  setPerPage,
  setTotal,
  setUserList,
} from "@/store/features/userSlice";
import React, { useEffect, useState } from "react";

function Users() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  async function getUsersFunction(params?: string) {
    const users = await getUsers(params);
    dispatch(setUserList(users.data));
    dispatch(setPerPage(users.per_page));
    dispatch(setPage(users.page));
    dispatch(setTotal(users.total));
    setIsLoading(false);
  }
  const { userList, page, perPage } = useAppSelector(
    (state) => state.userSlice
  );
  function handleReload() {
    setIsLoading(true);
    getUsersFunction().then((users) => {
      setIsLoading(false);
    });
  }
  useEffect(() => {
    getUsersFunction(`page=${page}&per_page=${perPage}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage]);

  function handlePerPage() {}

  return (
    <EnhancedTable
      usersList={userList}
      handleReload={() => handleReload()}
      isLoading={isLoading}
    />
  );
}

export default Users;
