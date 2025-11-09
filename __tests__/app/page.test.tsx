import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { name: /welcome to altocv2/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<Home />);
    const description = screen.getByText(/ai-powered cv builder with ats optimization/i);
    expect(description).toBeInTheDocument();
  });

  it("renders the Get Started button", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /get started/i });
    expect(button).toBeInTheDocument();
  });

  it("renders the Learn More button", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /learn more/i });
    expect(button).toBeInTheDocument();
  });
});
