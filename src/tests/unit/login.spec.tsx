import { LocationDisplay } from "@/components/LocationDisplay";
import { EmailOrPasswordInvalidError } from "@/errors/EmailOrPasswordInvalidError";
import { useLogin, type AuthCredentials } from "@/hooks/useLogin";
import { LoginPage } from "@/pages/login";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("Login tests", () => {
  it("should change password visibility", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
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
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
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
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
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

  it("should login", async () => {
    const routerWrapper = ({ children }: { children: ReactNode }) => {
      return (
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={children} />
            <Route path="/dashboard" element={<LocationDisplay />} />
          </Routes>
        </MemoryRouter>
      );
    };
    const loginHook = renderHook(() => useLogin(), {
      wrapper: routerWrapper,
    });

    const payload: AuthCredentials = {
      email: "admin@email.com",
      password: "123456",
    };

    let loginResult: void;

    await act(async () => {
      loginResult = await loginHook.result.current.login(payload);
    });

    expect(loginResult).toBeUndefined();

    const locationDiv = screen.getByTestId("location");
    expect(locationDiv.textContent).toBe("/dashboard");
  });
});
