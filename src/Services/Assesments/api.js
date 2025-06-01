import axios from "axios";

//Todo: Wordpress cookie implementation
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;

const processRequest = async (route, type) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const res = await axios({
      method: type,
      url: `${url + route}`,
    });

    const response = {
      ...res,
      error: false,
    };

    if(res.status !==200){
      response.error = true;
    }
    
    return response;
  } catch (error) {
      console.log(error);
      if(!error?.response?.data?.message){
        error.response.data.message = error.message || "Something went wrong!";
      }
      
      const response = {
        data: error.response.data,
        error: true,
      };
    return response;
  }
}

const getRequest = async (route) => {
  return await processRequest(route, "get");
};

const postRequest = async (route) => {
  return await processRequest(route, "post");
};

export { getRequest, postRequest };