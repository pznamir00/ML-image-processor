describe("Datasets", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/datasets");
  });

  it("shows the datasets table", () => {
    cy.get(".ant-table-container").should("exist");
  });

  it("shows 2 items in the table", () => {
    cy.get(".ant-table-row.ant-table-row-level-0").should("have.length", 2);
  });
});
