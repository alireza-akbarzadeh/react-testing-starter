import { render, screen } from "@testing-library/react";
import Label from "../../src/components/Label";
import { LanguageProvider } from "../../src/providers/language/LanguageProvider";
import { Language } from "../../src/providers/language/type";

describe("Label", () => {
  const renderComponents = (labelId: string, lng: Language) => {
    render(
      <LanguageProvider language={lng}>
        <Label labelId={labelId} />
      </LanguageProvider>
    );
  };

  describe("Given the current language is EN", () => {
    it.each([
      {
        labelId: "welcome",
        text: "Welcome",
      },
      {
        labelId: "new_product",
        text: "New Product",
      },
      {
        labelId: "edit_product",
        text: "Edit Product",
      },
    ])("should render $text for $labelId", ({ labelId, text }) => {
      renderComponents(labelId, "en");
      const label = screen.getByText(text);
      expect(label).toBeInTheDocument();
    });
  });

  describe("Given the current language is ES", () => {
    it.each([
      {
        labelId: "welcome",
        text: "Bienvenidos",
      },
      {
        labelId: "new_product",
        text: "Nuevo Producto",
      },
      {
        labelId: "edit_product",
        text: "Editar Producto",
      },
    ])("should render $text for $labelId", ({ labelId, text }) => {
      renderComponents(labelId, "es");
      const label = screen.getByText(text);
      expect(label).toBeInTheDocument();
    });
  });

  it("should render an error if label id is not valid", () => {
    expect(() => renderComponents("!", "en")).toThrowError();
  });
});
