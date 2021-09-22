import axios from 'axios';

const apiUrl = `http://localhost:5000/api/`;

export const server = axios.create({
    baseURL: apiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  

export const getFormData = (data) => server.get(apiUrl + 'getFormData', data);

export const saveFormData = (data) => server.post(apiUrl + 'saveFormData', data);

export const singleFileUpload = async (data, options) => {
    try {
        await axios.post(apiUrl + 'singleFile', data, options);
    } catch (error) {
        throw error;
    }
}
export const getSingleFiles = async () => {
    try {
        const {data} = await axios.get(apiUrl + 'getSingleFiles');
        return data;
    } catch (error) {
        throw error;
    }
}

export const multipleFilesUpload = async (data, options) => {
    try {
        await axios.post(apiUrl + 'multipleFiles', data, options);
    } catch (error) {
        throw error;
    }
}
export const getMultipleFiles = async () => {
    try{
        const {data} = await axios.get(apiUrl + 'getMultipleFiles');
        return data;
    }catch(error){
        throw error;
    }
}