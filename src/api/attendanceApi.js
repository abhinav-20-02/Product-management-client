import baseUrl from "./baseUrl";
import commonApi from "./commonApi";

export const addStudentApi = async (data) => {
    return await commonApi("POST", baseUrl, data);
};

export const getStudentsApi = async () => {
    return await commonApi("GET", baseUrl, {});
};

export const updateStudentApi = async (id, data) => {
    return await commonApi("PATCH", `${baseUrl}/${id}`, data);
};

export const deleteStudentApi = async (id) => {
    return await commonApi("DELETE", `${baseUrl}/${id}`, {});
};
