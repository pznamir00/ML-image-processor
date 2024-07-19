describe("Datasets", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/datasets/add");
  });

  it("fills out the form", () => {
    fillOutTheForm();
    clickNext();
  });

  it("uploads files", () => {
    fillOutTheForm();
    clickNext();
    uploadFiles();
    clickNext();
  });

  it("annotates images", () => {
    fillOutTheForm();
    clickNext();
    uploadFiles();
    clickNext();
    annotateImages();
    clickNext();
    confirmModal();
  });

  it("makes augmentations", () => {
    fillOutTheForm();
    clickNext();
    uploadFiles();
    clickNext();
    annotateImages();
    clickNext();
    confirmModal();
    makeAugmentations();
    clickNext();
    confirmModal();
  });

  it("reviews overview", () => {
    fillOutTheForm();
    clickNext();
    uploadFiles();
    clickNext();
    annotateImages();
    clickNext();
    confirmModal();
    makeAugmentations();
    clickNext();
    confirmModal();
    reviewOverview();
  });
});

const fillOutTheForm = () => {
  cy.get("#name")
    .type("roads dataset")
    .get(".ant-radio-button-wrapper")
    .contains("Object Detection")
    .click();
};

const uploadFiles = () => {
  cy.get('input[type="file"]')
    .selectFile(["cypress/images/img1.jpg", "cypress/images/img2.jpg"], {
      force: true,
    })
    .get('div[data-testid="upload-result-image"]')
    .should("have.length", 2)
    .get('button[data-testid="upload-actions-upload-btn"]')
    .click()
    .get(".ant-progress-status-success", { timeout: 10000 })
    .should("exist");
};

const annotateImages = () => {
  const makeAnnotation = () => {
    cy.get(".sc-iwsKbI")
      .click(300, 300)
      .trigger("mouseover")
      .trigger("mousedown", { which: 1 })
      .trigger("mousemove", {
        clientX: 400,
        clientY: 400,
        screenX: 400,
        screenY: 400,
        pageX: 400,
        pageY: 400,
      })
      .trigger("mouseup", { which: 1 })
      .get('input[type="search"]')
      .type("road")
      .get("button")
      .contains("Save")
      .click({ force: true });
  };

  makeAnnotation();
  cy.get(".anticon-arrow-right").click();
  makeAnnotation();
};

const makeAugmentations = () => {
  cy.get("button")
    .contains("Add")
    .as("addBtn")
    .get('div[data-testid="algorithm-image-1"]')
    .click()
    .get("@addBtn")
    .click()
    .get('div[data-testid="algorithm-image-3"]')
    .click()
    .get(".ant-slider-handle-1")
    .type("{rightarrow}{rightarrow}{rightarrow}")
    .get("@addBtn")
    .click()
    .get(".AugmentationsList_item__P8LKB")
    .should("have.length", 2)
    .eq(0)
    .invoke("text")
    .should("include", "Random rotation")
    .should("include", "0% - 25%")
    .get(".AugmentationsList_item__P8LKB")
    .eq(1)
    .invoke("text")
    .should("include", "Noise")
    .should("include", "3% - 25%");
};

const reviewOverview = () => {
  cy.get('div[data-testid="overview-details"]')
    .invoke("text")
    .should("include", "roads dataset")
    .should("include", "Object Detection")
    .should("include", "1 classes")
    .should("include", "2 images")
    .get(".AugmentationsList_item__P8LKB")
    .should("have.length", 2);
};

const clickNext = () => {
  cy.get("button").contains("Next").click();
};

const confirmModal = () => {
  cy.get("button").contains("OK").click();
};
