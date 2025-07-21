import { useLogin, type AuthCredentials } from "@/hooks/useLogin";
import { useNotification } from "@/hooks/useNotification";
import { useRef, useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

export function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isSubmittingLoginForm, setIsSubmittingLoginForm] = useState(false);
  const { notifyError, notifySuccess } = useNotification();
  const { login } = useLogin();

  async function handleLogin(event: React.FormEvent) {
    try {
      event.preventDefault();
      setIsSubmittingLoginForm(true);

      const credentials: AuthCredentials = {
        email: emailRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
      };

      await login(credentials);
      notifySuccess("Login realizado com sucesso");
    } catch (error) {
      console.error(error);
      notifyError(
        error instanceof Error ? error.message : "Erro ao realizar login",
      );
    } finally {
      setIsSubmittingLoginForm(false);
    }
  }

  function togglePasswordVisibility() {
    if (isPasswordHidden) {
      setIsPasswordHidden(false);
    } else {
      setIsPasswordHidden(true);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-800">
      <form
        className="flex flex-col justify-center gap-2 rounded-lg bg-white p-16"
        onSubmit={handleLogin}
      >
        <h2 className="mb-3.5 w-full text-center text-2xl text-blue-800">
          Realizar login
        </h2>

        <label htmlFor="email-input w-full">
          <div className="text-lg text-blue-800">Email</div>

          <input
            ref={emailRef}
            id="email-input"
            type="text"
            className="text-md w-full rounded-lg border-2 border-blue-800 p-2 text-blue-800 outline-blue-800"
          />
        </label>

        <label htmlFor="password-input w-full">
          <div className="text-lg text-blue-800">Senha</div>

          <div className="flex items-center justify-center gap-1.5">
            <input
              ref={passwordRef}
              id="password-input"
              className="text-md w-full rounded-lg border-2 border-blue-800 p-2 text-blue-800 outline-blue-800"
              type={isPasswordHidden ? "password" : "text"}
            />
            {isPasswordHidden ? (
              <BiSolidShow
                onClick={togglePasswordVisibility}
                className="cursor-pointer text-3xl text-blue-800"
              />
            ) : (
              <BiSolidHide
                onClick={togglePasswordVisibility}
                className="cursor-pointer text-3xl text-blue-800"
              />
            )}
          </div>
        </label>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-blue-800 p-2 text-center text-lg font-bold text-white"
        >
          {isSubmittingLoginForm ? "Entrando" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
