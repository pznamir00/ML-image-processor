const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.post("/images", (req, res) => {
  setTimeout(() => {
    req.body.image.isUploaded = true;
    req.body.image.url = `https://some-fake-url.com/${req.body.image}`;
    res.status(200).send(req.body);
  }, 1500);
});

app.put("/images/batch", (req, res) => {
  res.status(200).send(req.body);
});

app.post("/datasets", (req, res) => {
  res.status(200).send(req.body);
});

app.put("/datasets", (req, res) => {
  res.status(200).send(req.body);
});

app.get("/datasets", (req, res) => {
  res.status(200).send([
    {
      id: 1,
      name: "Clothing",
      type: "OBJECT_DETECTION",
      images: [
        {
          name: "DSC_4500.JPG",
          url: "https://some-url.com/DSC_4500.JPG",
          isUploaded: true,
          datasetId: 1,
          metadata: {
            annotations: [
              {
                class: "t-shirt",
                min: { x: 30, y: 120 },
                max: { x: 56, y: 309 },
              },
            ],
          },
        },
      ],
      augmentations: [
        {
          algorithm: 2,
          fromPercentage: 0.45,
          toPercentage: 0.8,
        },
      ],
    },
    {
      id: 2,
      name: "Handwritten Numbers",
      type: "CLASSIFICATION",
      images: [
        {
          name: "DSC_4506.JPG",
          url: "https://some-url.com/DSC_4506.JPG",
          isUploaded: true,
          datasetId: 2,
          metadata: { class: "6" },
        },
      ],
      augmentations: [
        {
          algorithm: 2,
          fromPercentage: 0.45,
          toPercentage: 0.8,
        },
      ],
    },
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
