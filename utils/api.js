function getApiUrl() {
   return process.env.BASE_API_URL;
}

const callFetchAsync = async (endpoint, method, body, headers = {}) => {
   try {
      const options = {
         headers: new Headers({
            'Content-Type': 'application/json',
            ...headers
         }),
         body
      };

      if(body) {
         options.body = JSON.stringify(body);
      }

      const response = await fetch(`${getApiUrl()}${endpoint}`, {
         method,
         credentials: 'same-origin',
         ...options
      });

      return await response.json();
   }
   catch (err) {
      return { success: false, data: err };
   }
}

const postAsync = (endpoint, body) => {
   return callFetchAsync(endpoint, 'POST', body);
}

module.exports = {
   postAsync: postAsync
}