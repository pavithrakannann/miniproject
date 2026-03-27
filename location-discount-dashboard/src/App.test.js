import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login page copy", () => {
  render(<App />);
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
});
