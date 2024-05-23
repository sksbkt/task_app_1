import axios from "axios";

const usersApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

export const usersUrlEndpoint = "users";

export async function getUsers(params?: string) {
  let response;
  try {
    if (params != undefined) {
      response = await usersApi.get(`${usersUrlEndpoint}?${params}`);
    } else {
      response = await usersApi.get(usersUrlEndpoint);
    }
  } catch (e: any) {
    console.log(e.message);
    return;
  }
  return response.data;
}

export async function getUser(params: string) {
  let response;
  try {
    response = await usersApi.get(`${usersUrlEndpoint}/${params}`);
  } catch (e: any) {
    console.log(e.message);
    return;
  }
  return response.data;
}

export async function deleteUser(params: string) {
  let response;
  try {
    response = await usersApi.delete(`${usersUrlEndpoint}/${params}`);
  } catch (e: any) {
    console.log(e.message);
    return;
  }
  return response.status;
}

export async function createUser(params: string) {
  let response;
  try {
    response = await usersApi.post(usersUrlEndpoint);
  } catch (e: any) {
    console.log(e.message);
    return;
  }
  return response.status;
}

export async function updateUser(params: string) {
  let response;
  try {
    response = await usersApi.put(`${usersUrlEndpoint}/${params}`);
  } catch (e: any) {
    console.log(e.message);
    return;
  }
  return response.status;
}
