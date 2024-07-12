import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("shows title", () => {
    setup();
    const title = screen.getByText(/Image processor/i);
    expect(title).toBeInTheDocument();
  });
});

function setup() {
  const view = render(<Header />);
  return { view };
}
