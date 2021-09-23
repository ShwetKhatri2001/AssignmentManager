import axios from 'axios';

const apiUrl = `http://localhost:5000/api/`;

export const server = axios.create({
    baseURL: apiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  

export const getFormData = (data) => server.post(apiUrl + 'getFormData', data);

export const saveFormData = (data) => server.post(apiUrl + 'saveFormData', data);

export const singleFileUpload = async (data, options) => {
    try {
        const res = await axios.post(apiUrl + 'singleFile', data, options);
        return res.data.singleFileId;
    } catch (error) {
        throw error;
    }
}

export const multipleFilesUpload = async (data, options) => {
    try {
        const res = await axios.post(apiUrl + 'multipleFiles', data, options);
        return res.data.multipleFilesId;
    } catch (error) {
        throw error;
    }
}
