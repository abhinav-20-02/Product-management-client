import baseUrl from "./baseUrl";
import commonApi from "./commonApi";

export const addStudentApi = async (data) => {
    return await commonApi("POST", `${baseUrl}/students`, data);
};

export const getStudentsApi = async () => {
    return await commonApi("GET", `${baseUrl}/students`, {});
};

export const updateStudentApi = async (id, data) => {
    return await commonApi("PATCH", `${baseUrl}/students/${id}`, data);
};

export const deleteStudentApi = async (id) => {
    return await commonApi("DELETE", `${baseUrl}/students/${id}`, {});
};
