const express = require("express");
const cors = require("cors");

const controllers = require("../app/controllers");

const spkNotaController = require("../app/controllers/api/v1/spkNotaController");
const userController = require("../app/controllers/api/v1/userController");

const apiRouter = express.Router();
apiRouter.use(cors());
apiRouter.use(express.json());

// API Authentication & Authorization
apiRouter.post("/api/v1/register", userController.register);
apiRouter.post("/api/v1/login", userController.login);

apiRouter.get("/api/v1/auth/me", userController.whoAmI);
apiRouter.delete("/api/v1/auth/delete/:email", userController.deleteUser);

// API User
apiRouter.put("/api/v1/auth/me", userController.authorization, userController.updateInfoUser);

// API SPK Nota
apiRouter.post("/api/v1/spknota", userController.authorization, spkNotaController.createSpkNota);
apiRouter.delete("/api/v1/spknota", userController.authorization, spkNotaController.deleteSpkNota);
apiRouter.put("/api/v1/spknota/:id", userController.authorization, spkNotaController.updateSpkNota);
apiRouter.get("/api/v1/spknota/:id", spkNotaController.getSpkNotaById);
apiRouter.get("/api/v1/spknota", spkNotaController.listAllSpkNota);

apiRouter.get("/api/v1/errors", () => {
  throw new Error("Second Hand Error");
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
