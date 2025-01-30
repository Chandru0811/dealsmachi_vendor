import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllReferredVendorWithIds = async (id) => {
  try {
    const response = await api.get(`admin/referrals/${id}`);
    return response.data.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllReferredVendorWithIds;
