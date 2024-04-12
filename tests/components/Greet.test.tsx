import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Greet from "../../src/components/Greet";
import "@testing-library/jest-dom/vitest";

describe("Greet", () => {
  it("should render hellow with name when name is provided", () => {
    render(<Greet name="John" />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/John/i);
  });
  it("should render login button when no name is provided", () => {
    render(<Greet />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(/login/i);
  });
});
