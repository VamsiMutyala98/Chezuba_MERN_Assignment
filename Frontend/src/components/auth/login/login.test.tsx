import React from "react";
import { render, screen } from "@testing-library/react";
import Login from ".";

test("Login", () => {
  render(<Login />);
  const loginHeading = screen.getByTestId("login-heading");
  expect(loginHeading).toHaveTextContent("Login Page");
});
