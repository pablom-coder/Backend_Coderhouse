import { createProductsMock } from "../utils/prodcutsMock.js";

export const getAll = async (req, res) => {
  try {
    res.status(200).json({
      data: createProductsMock(5),
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
