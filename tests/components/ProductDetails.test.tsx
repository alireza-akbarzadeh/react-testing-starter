import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { server } from "../mocks/server";

import { http, HttpResponse } from "msw";
import { products } from "../mocks/data";

describe("ProductDetails", () => {
  //   it("should render error if the id is not valid", async () => {
  //     server.use(
  //       http.get("/products/:id", () => new HttpResponse(null, { status: 404 }))
  //     );
  //     render(<ProductDetail productId={0} />);
  //     const error = await screen.findByText(/Invalid/i);
  //     expect(error).toBeInTheDocument();
  //   });

  it("should render the list of product", async () => {
    render(<ProductDetail productId={1} />);

    expect(
      await screen.findByText(new RegExp(products[0].name))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(products[0].name))
    ).toBeInTheDocument();
  });
});
