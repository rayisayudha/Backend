const spkNotaService = require("../../../services/spkNotaService");
const jwt = require("jsonwebtoken");

// const { promisify } = require("util");
// const cloudinary = require("../../../../config/cloudinary");
// const cloudinaryUpload = promisify(cloudinary.uploader.upload);
// const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);

function verifyToken(token) {
  try {
    return jwt.verify(token, "Rahasia");
  } catch (error) {
    throw new Error("Token expired");
  }
}

module.exports = {
  listAllSpkNota: async (req, res) => {
    try {
      let tokenPayload = { id: null };
      if (req.headers.authorization !== "") {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split("Bearer ")[1];
        tokenPayload = await verifyToken(token);
      }

      spkNotaService
        .list({ id: tokenPayload.id })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(500).json({
            error: err.message,
          });
        });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  // getProductsByStatus(req, res) {
  //     try {
  //         if (req.query.statusProduk === "All") {
  //             productsService
  //                 .findByIdSeller(req.query.idSeller)
  //                 .then((data) => {
  //                     res.status(200).json(data);
  //                 })
  //                 .catch((err) => {
  //                     res.status(500).json({
  //                         error: err.message,
  //                     });
  //                 });
  //         } else {
  //             productsService
  //                 .listByStatus(req.query.idSeller, req.query.statusProduk)
  //                 .then((data) => {
  //                     res.status(200).json(data);
  //                 })
  //                 .catch((err) => {
  //                     res.status(500).json({
  //                         error: err.message,
  //                     });
  //                 });
  //         }
  //     } catch (error) {
  //         res.status(500).json({
  //             error: error.message,
  //         });
  //     }
  // },

  getSpkNotaById: async (req, res) => {
    try {
      const product = await spkNotaService.getById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  // getProductByKategori: async (req, res) => {
  //     try {
  //         let tokenPayload = {id: null};
  //         if (req.headers.authorization !== "") {
  //             const bearerToken = req.headers.authorization;
  //             const token = bearerToken.split("Bearer ")[1];
  //             tokenPayload = await verifyToken(token);
  //         }

  //         const product = await productsService.getByKategori({id: tokenPayload.id, kategori: req.query.kategori});
  //         res.status(200).json(product);
  //     } catch (error) {
  //         res.status(500).json({
  //             error: error.message,
  //         });
  //     }
  // },

  // getProductByName: async (req, res) => {
  //     try {
  //         const namaProduk = req.query.namaProduk.toLowerCase();
  //         const product = await productsService.getByNama(namaProduk);
  //         res.status(200).json(product);
  //     } catch (error) {
  //         res.status(500).json({
  //             error: error.message,
  //         });
  //     }
  // },

  createSpkNota: async (req, res) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = await verifyToken(token);
      const idUser = tokenPayload.id;

      const { project, category, startDate, endDate, bahan, tebal, ukuran, jumlah, ukuranJadi, ncrTop, ncrMid1, ncrMid2, ncrMid3, ncrBot, cetak, warna, finishing, catatan } = req.body;

      const createArgs = {
        idUser,
        project,
        category,
        startDate,
        endDate,
        bahan,
        tebal,
        ukuran,
        jumlah,
        ukuranJadi,
        ncrTop,
        ncrMid1,
        ncrMid2,
        ncrMid3,
        ncrBot,
        cetak,
        warna,
        finishing,
        catatan,
        status: "To Do",
        approval: "Waiting",
      };
      console.log(createArgs.project);
      spkNotaService.create(createArgs).then((SpkNota) => {
        res.status(201).json({
          status: "SPKNOTA_CREATED",
          SpkNota,
        });
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  updateSpkNota: async (req, res) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const tokenPayload = await verifyToken(token);
    const idUser = tokenPayload.id;

    const { project, category, startDate, endDate, bahan, tebal, ukuran, jumlah, ukuranJadi, ncrTop, ncrMid1, ncrMid2, ncrMid3, ncrBot, cetak, warna, finishing, catatan } = req.body;

    try {
      let updateArgs = {
        idUser,
        project,
        category,
        startDate,
        endDate,
        bahan,
        tebal,
        ukuran,
        jumlah,
        ukuranJadi,
        ncrTop,
        ncrMid1,
        ncrMid2,
        ncrMid3,
        ncrBot,
        cetak,
        warna,
        finishing,
        catatan,
      };

      spkNotaService.update(req.params.id, updateArgs).then(() => {
        res.status(200).json({
          status: "OK",
          message: "Spk nota updated",
        });
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  deleteSpkNota: async (req, res) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = await verifyToken(token);
      const idUser = tokenPayload.id;
      const { id } = req.query;

      spkNotaService.delete(id, idUser).then(() => {
        res.status(200).json({
          status: "OK",
          message: "SPK Nota deleted",
        });
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
};
