import { API_URL } from "@env";
import getFirebaseAccessToken from "../auth/auth";

interface GetBeParams {
  path: string;
  params?: any;
}

interface PostBeParams {
  path: string;
  body: Record<string, any>;
}

interface PutBeParams {
  path: string;
  body: Record<string, any>;
}

interface DeleteBeParams {
  path: string;
}
console.log(API_URL);
const getBe = async ({ path, params }: GetBeParams): Promise<any> => {
  const token = await getFirebaseAccessToken();

  const queryString = params
    ? `?${Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&")}`
    : "";

  try {
    const response = await fetch(`${API_URL}${path}${queryString}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Non-JSON response received");
    }
  } catch (error) {
    throw error;
  }
};

const postBe = async ({ path, body }: PostBeParams): Promise<any> => {
  try {
    const token = await getFirebaseAccessToken();

    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const putBe = async ({ path, body }: PutBeParams): Promise<any> => {
  try {
    const token = await getFirebaseAccessToken();

    const response = await fetch(`${API_URL}${path}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteBe = async ({ path }: DeleteBeParams): Promise<void> => {
  try {
    const token = await getFirebaseAccessToken();

    const response = await fetch(`${API_URL}${path}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export { getBe, postBe, deleteBe, putBe };
