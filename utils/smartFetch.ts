import { error } from "console";

export class ResponseError extends Error {
  response: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
  }
}

export const smartFetch = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit
) => {
  try {
    const response = await fetch(input, init);
    if (!response.ok) {
      throw new ResponseError("Bad fetch response", response);
    }
    const data = (await response.json()) as T;
    return { data, error: null };
  } catch (error: unknown) {
    if (error instanceof ResponseError) {
      return { data: null, error };
    } else {
      return { data: null, error: new Error("Unexpected error") };
    }
  }
};
