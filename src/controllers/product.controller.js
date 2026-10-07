const Product = require("../Models/Product.model");
const { Op } = require("sequelize");


const createProduct = async (req,res,next) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      categoryId
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      categoryId
    });

    res.status(201).json(product);

  } catch (error) {
     next(error);
  }
};
const getProducts = async (req, res, next) => {
    try {
        // 1. Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // 2. Search
        const search = req.query.search;

        // 3. Price filters
        const minPrice = req.query.minPrice !== undefined
            ? Number(req.query.minPrice)
            : undefined;

        const maxPrice = req.query.maxPrice !== undefined
            ? Number(req.query.maxPrice)
            : undefined;

        // 4. Category filter
        const categoryId = req.query.categoryId !== undefined
            ? Number(req.query.categoryId)
            : undefined;

        // 5. Sorting
        const sort = req.query.sort;
        let order = [["price", "ASC"]];

        if (sort === "price_desc") {
            order = [["price", "DESC"]];
        }

        if (
            sort !== undefined &&
            sort !== "price_asc" &&
            sort !== "price_desc"
        ) {
            return res.status(400).json({
                message: "Invalid sort value"
            });
        }

        // 6. Build filters
        const where = {};

        if (search) {
            where.name = {
                [Op.like]: `%${search}%`
            };
        }

        if (minPrice !== undefined) {
            where.price = {
                ...where.price,
                [Op.gte]: minPrice
            };
        }

        if (maxPrice !== undefined) {
            where.price = {
                ...where.price,
                [Op.lte]: maxPrice
            };
        }

        if (categoryId !== undefined) {
            where.categoryId = categoryId;
        }

        // 7. Get products
        const result = await Product.findAndCountAll({
            where,
            limit,
            offset,
            order
        });

        // 8. Pagination information
        const totalPages = Math.ceil(result.count / limit);

        return res.status(200).json({
            products: result.rows,
            pagination: {
                page,
                limit,
                totalProducts: result.count,
                totalPages
            }
        });

    } catch (error) {
        next(error);
    }
};


const getProductById = async (req, res,next) => {
    try {
        const productId = req.params.id;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                message: "محصول پیدا نشد"
            });
        }

        res.status(200).json({
            message: "محصول پیدا شد",
            product: product
        });

    } catch (error) {
         next(error);
    }
};

const updateProduct = async (req, res,next) => {
    try {
        const productId = req.params.id;

        const [updated] = await Product.update(req.body, {
            where: {
                id: productId
            }
        });

        if (updated === 0) {
            return res.status(404).json({
                message: "محصول پیدا نشد"
            });
        }

        const product = await Product.findByPk(productId);

        res.status(200).json({
            message: "محصول آپدیت شد",
            product: product
        });

    } catch (error) {
         next(error);
    }
};
const deleteProduct = async (req, res,next) => {
    try {
        const productId = req.params.id;

        const deleted = await Product.destroy({
            where: {
                id: productId
            }
        });

        if (deleted === 0) {
            return res.status(404).json({
                message: "محصول یافت نشد"
            });
        }

        res.status(200).json({
            message: "محصول با موفقیت حذف شد"
        });

    } catch (error) {
         next(error);
    }
};
module.exports = {
  createProduct,
   getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
