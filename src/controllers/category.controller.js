
    
const Category = require("../Models/category.model");

const createCategory = async (req, res, next) => {
    try {
        const category = req.body;

        const categoryCreated = await Category.create(category);

        return res.status(201).json({
            message: "دسته بندی ایجاد شد",
            categoryCreated: categoryCreated
        });

    } catch (error) {
        next(error);
    }
};


const getCategory = async (req, res, next) => {
    try {
        const allCategory = await Category.findAll();

        if (allCategory.length === 0) {
            return res.status(404).json({
                message: "هیچ دسته‌بندی‌ای پیدا نشد"
            });
        }

        return res.status(200).json({
            message: "تمامی دسته‌ها",
            allCategory: allCategory
        });

    } catch (error) {
        next(error);
    }
};


const getCategoryById = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({
                message: "دسته‌بندی یافت نشد"
            });
        }

        return res.status(200).json({
            message: "دسته‌بندی مورد نظر",
            category: category
        });

    } catch (error) {
        next(error);
    }
};


const updatecategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({
                message: "دسته‌بندی پیدا نشد"
            });
        }

        await Category.update(req.body, {
            where: {
                id: categoryId
            }
        });

        const updatedCategory = await Category.findByPk(categoryId);

        return res.status(200).json({
            message: "دسته‌بندی آپدیت شد",
            category: updatedCategory
        });

    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const deleteId = req.params.id;

        // اول بررسی می‌کنیم Category وجود دارد یا نه
        const category = await Category.findByPk(deleteId);

        if (!category) {
            return res.status(404).json({
                message: "دسته‌بندی پیدا نشد"
            });
        }

        // بررسی می‌کنیم این Category محصول دارد یا نه
        const product = await Product.findOne({
            where: {
                categoryId: deleteId
            }
        });

        // اگر محصول داشت، اجازه حذف نمی‌دهیم
        if (product) {
            return res.status(400).json({
                message: "این دسته‌بندی دارای محصول است و قابل حذف نیست"
            });
        }

        // اگر محصولی نداشت، Category حذف می‌شود
        await category.destroy();

        return res.status(200).json({
            message: "دسته‌بندی حذف شد"
        });

    } catch (error) {
        next(error);
    }
};



module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    updatecategory,
    deleteCategory
};


