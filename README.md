# Machine Learning Image Processor

The application that provides feature of uploading images for processing them to machine learning tasks like neural network training.
It's splitted to following steps:
- *form* - user fills out the form of new dataset
- *upload* - user uploads images that are gonna be proceesed,
- *annotation* - user annotates every image in order to add custom labels. An annotation type depends on dataset type and can be one of:
  - classification (single class),
  - object detection (multiple bounding boxes with their own classes)
- *augmentation* - user sets augmentations steps for just created dataset. The application supports following augmentations:
  - Random-rotation,
  - Grayscale,
  - Noise,
  - Blur,
  - Crop
- *overview* - the point where user confirms all the settings of a dataset
  
Once the process is finish, a user can export specific dataset with one of predefined format that is one of followings:
  - Yolov8,
  - Coco,
  - CreateML,
  - Tensorflow-object-detection,
  - Retinanet-keras

## Technology Stack

- React
- Antd
- Redux
- Typescript
- JEST
- Cypress
- Eslint/Prettier
- Husky
- JSCPD
- Docker
- AWS (CI/CD)
  - S3
  - CodeBuild
  - CodePipeline

## How to run locally

In order to run the app locally, call the following commands:
- install deps - `npm install`
- run dev mode - `npm run start` or `npm run start:dev`

Alternativly if you need, you can run the app in different environments
- run prod mode - `npm run start:prod`
- run e2e mode - `npm run start:e2e`

## How to build

In order to build the app, run following command: `npm run build:dev`

Alternativly if you need, you can build the app in different environments
- build prod mode - `npm run build:prod`
- build e2e mode - `npm run build:e2e`

## How to test

You can test the app with following commands:
- unit tests - `npm run test:unit`
- e2e tests - `npm run test:e2e`

### E2E Tests

E2E tests are running inside Docker container, calling `npm run test:e2e` will build and run a docker containers from `cypress/docker-compose.yml` with mocked backend.

## CI/CD

The pipeline works in AWS CodeBuild/CodePipeline services and it's managed by `buildspec.yml` file, which triggers following commands
- `npm run test:unit -- --watchAll=false` - runs unit tests
- `npm run check-formatting` - checks formatting with eslint
- `npm run check-duplicates` - checks code duplicates with jscpd

Then the pipeline builds production app with `npm run build:prod`.
Built source is uploaded to AWS S3 and hosted out there.
