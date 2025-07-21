import { useNavigate } from "react-router-dom";
import { EmailOrPasswordInvalidError } from "../../../core/errors/EmailOrPasswordInvalidError";

export interface AuthCredentials {
  email: string;
  password: string;
}

export function useLogin() {
  const navigate = useNavigate();

  async function delay() {
    const THREE_SECONDS = 3000;
    await new Promise((resolve) => setTimeout(resolve, THREE_SECONDS));
  }

  async function login({ email, password }: AuthCredentials) {
    await delay();

    if (email === "admin@email.com" && password === "123456") {
      navigate("/dashboard");
    } else {
      throw new EmailOrPasswordInvalidError();
    }
  }

  return { login };
}
