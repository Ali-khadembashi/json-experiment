// // See https://github.com/typicode/json-server#module
// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults()

// server.use(middlewares)
// // Add this before server.use(router)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/blog/:resource/:id/show': '/:resource/:id'
// }))
// server.use(router)
// server.listen(3000, () => {
//     console.log('JSON Server is running')
// })

// // Export the Server API
// module.exports = server


const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser); // Add bodyParser middleware for parsing request bodies

// Custom middleware for handling appropriate responses
server.use((req, res, next) => {
  if (req.method === 'POST') {
    // Handle POST request
    const newResource = req.body;
    // Add your logic to process the new resource, such as saving it to the 'db.json' file
    // ...
    res.status(201).json(newResource); // Send a 201 Created status code with the new resource
  } else if (req.method === 'PUT') {
    // Handle PUT request
    const resourceId = req.params.id;
    const updatedResource = req.body;
    // Add your logic to update the resource with the provided ID, such as updating the 'db.json' file
    // ...
    res.status(200).json(updatedResource); // Send a 200 OK status code with the updated resource
  } else if (req.method === 'DELETE') {
    // Handle DELETE request
    const resourceId = req.params.id;
    // Add your logic to delete the resource with the provided ID, such as updating the 'db.json' file
    // ...
    res.status(204).end(); // Send a 204 No Content status code indicating successful deletion
  } else {
    // For other methods (GET, PATCH, etc.), continue with the default router
    next();
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

module.exports = server;