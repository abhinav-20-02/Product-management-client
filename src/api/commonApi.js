import axios from 'axios';

const commonApi = async (reqMethod, reqUrl, reqData) => {
    const config = {
        method: reqMethod,
        url: reqUrl,
        data: reqData,
    };
    return await axios(config).then(res => {
        return res;
    }).catch(err => {
        return err;
    });
};

export default commonApi;
