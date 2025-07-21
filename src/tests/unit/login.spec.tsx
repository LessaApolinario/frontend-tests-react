import { useLogin, type AuthCredentials } from "@/hooks/useLogin";
import { LoginPage } from "@/pages/login";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  renderHook,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { EmailOrPasswordInvalidError } from "../../core/errors/EmailOrPasswordInvalidError";

describe("Login tests", () => {
  it("should change password visibility", async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );
    const passwordInput = screen.getByTestId(
      "password-input",
    ) as HTMLInputElement;
    const showPasswordButton = screen.getByTestId("show-password-btn");

    fireEvent.click(showPasswordButton);
    expect(passwordInput.type).toBe("text");

    await waitFor(() => {
      const hidePasswordButton = screen.getByTestId("hide-password-btn");
      fireEvent.click(hidePasswordButton);
      expect(passwordInput.type).toBe("password");
    });
  });

  it("should change login button text", () => {
    const { container } = render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    const loginButton = container.querySelector(
      "button[type=submit]",
    ) as HTMLButtonElement;

    expect(loginButton.textContent).toBe("Entrar");
    fireEvent.click(loginButton);
    expect(loginButton.textContent).toBe("Entrando");
  });

  it("should not login", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });
    const login = result.current.login;

    const invalidPayload: AuthCredentials = {
      email: "my-email@email.com",
      password: "some-pass",
    };

    await expect(login(invalidPayload)).rejects.toThrow(
      EmailOrPasswordInvalidError,
    );
  });
});
