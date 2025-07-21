import { LoginPage } from "@/pages/login";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

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
});
