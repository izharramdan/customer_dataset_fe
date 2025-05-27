import axios from "@/lib/axios";

const BASE_URL = "https://customerdataset-production.up.railway.app/api/customers";

export const getAllCustomers = async (
  page = 1,
  limit = 50,
  search = "",
//   sortBy = "name",
//   order = "asc"
) => {
  const res = await axios.get(BASE_URL, {
    // params: { page, limit, search, sortBy, order },
    params: { page, limit, search },
  });
  return res.data;
};