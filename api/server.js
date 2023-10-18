import axios from "axios";

// export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
//   ? process.env.NEXT_PUBLIC_BACKEND_URL
//   : "http://localhost:8080/api/v1";

// export const BASE_URL = "https://latestbackend.sojonews.com/api/v1/";

// export const BASE_URL = "http://localhost:5050/api/v1";
// export const BASE_URL = "http://localhost:5050/api/v1";
// export const BASE_URL = "http://192.168.1.70:5050/api/v1";

export const BASE_URL = "https://sojo-job-backend.vercel.app/api/v1";
export default axios.create({
  baseURL: BASE_URL,
});
