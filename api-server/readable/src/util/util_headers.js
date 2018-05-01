
  // Generate a unique token for storing your bookshelf data on the backend server.


export const get_headers = () => {
    let token = localStorage.token
    if (!token) {
      token = localStorage.token = Math.random().toString(36).substr(-8)
    }
    const headers = {
      'Accept': 'application/json',
      'Authorization': token
    }
    return headers;
};
