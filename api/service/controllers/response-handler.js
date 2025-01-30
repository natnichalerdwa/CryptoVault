// export const setSuccess = (data, response, statusCode = 200) => {
//   response.status(statusCode).json(data);
// };

// export const setError = (error, response, statusCode = 500) => {
//   response.status(statusCode).json({
//     code: statusCode === 500 ? "InternalServerError" : "BadRequestError",
//     message: error.message
//   });
// };


// export const setSuccess = (data, res, status = 200) => {
//     if (res.headersSent) return; // Avoid sending headers twice
//     res.status(status).json({ success: true, data });
//   };
  
//   export const setError = (error, res, status = 500) => {
//     if (res.headersSent) return; // Avoid sending headers twice
//     res.status(status).json({ success: false, error: error.message || error });
//  };
  

  export const setSuccess = (data, response) => {
      response.status(200);
      response.json(data);
  }

  export const setError = (error, response) => {
      response.status(400);
      response.json({
          code: "AunthenticationError",
          message: error.message
      }),
      response.status(500);
      response.json({
          code: "InternalServerError",
          message: error.message
      });
  }
  