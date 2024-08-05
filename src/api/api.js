import axios from "axios";

// const params = {
//     headers: {
//         Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
//     },
// };

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
        return null;
    }
};
