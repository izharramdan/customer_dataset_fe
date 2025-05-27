import axios from "@/lib/axios";

export const getAllCustomers = async (page = 1, limit = 50) => {
  const response = await axios.get("/customers", {
    params: { page, limit },
  });
  return response.data;
};
