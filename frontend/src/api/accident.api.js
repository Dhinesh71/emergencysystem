import axios from 'axios';

const API_URL = 'http://localhost:4567/api/accidents';

export const getAccidents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching accidents:", error);
        throw error;
    }
};

export const getAccidentById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching accident ${id}:`, error);
        throw error;
    }
};
