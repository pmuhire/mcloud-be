const { array, boolean } = require('joi');

module.exports = {
  openapi: "3.0.0", // present supported openapi version
  info: {
    title: "MCLOUD APIs", // short title.
    description: "MCLOUD APIs documentation", //  desc.
    version: "1.0.0", // version number
    contact: {
      name: "Muhire Patrick", // your name
      email: "pmuhire2002@gmail.com", // your email
      url: "https://my-brand-zeta.vercel.app/", // your website
    },
  },
  servers: [
    {
      url: "http://localhost:8000/api/v1", // url
      description: "Local server", // name
    }

  ],
  tags: [
    {
      name: "Users", // name of a tag
    },
  ],
  components: {
    schemas: {
      // user model
      User: {
        type: "object", // data type
        properties: {
        //   uuid: {
        //     type: "string", 
        //     description: "Identification number", 
        //     example: "23ef672hshshbd", 
        //   },
          firstName: {
            type: "string",
            description: "Users firstname",
            example: "Muhire", // example of a title
          },
          lastName: {
            type: "string",
            description: "Users lastname",
            example: "Patrick", // example of a title
          },
          email: {
            type: "string", // data type
            description: "Users email",
            example: "pmuhire2002@gmail.com", // example of a completed value
          },
          password: {
            type: "string", // data type
            description: "Users password",
            example: "encripted password", // example of a completed value
          },
        },
      },
      // TOKEN
      Token: {
        "type": "object",
        "properties": {
          "token": {
            "type": "string"
          }
        }
      },
      // LOGIN
      Login: {
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        }
      },
      // error model
      Error: {
        type: "object", //data type
        properties: {
          message: {
            type: "string", // data type
            description: "Error message",
            example: "Not found", // example of an error message
          },
          internal_code: {
            type: "string", // data type
            description: "Error internal code",
            example: "Invalid parameters", // example of an error internal code
          },
        },
      },
      
    },
  },
  paths: {
    //  USERS APIs DOCUMENTATION
    "/user": {
      get: {
        tags: ["Users"],
        "summary": "Get  Users",
        description: "Get Users",
        // parameters: [
        //   {
        //     "in": "query",
        //     "name": "Authorization",
        //     "description": "bearer token for user authorization",
        //     "required": true
        //   }
        // ],
        responses: {
          200: {
            description: "Users were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    "/user/newuser": {
      "post": {
        "tags": [
          "Users"
        ],
        "summary": "Save new User",
        "description": "Save new User",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        requestBody: {
          // expected request body
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        "responses": {
          200: {
            description: "User added successfully", // response desc.
          },

          // response code
          500: {
            description: "Server error", // response desc.
          },
        }
      },
    },
    "/user/modify/{uuid}": {
      "patch": {
        "tags": [
          "Users"
        ],
        "summary": "Update existing User",
        "description": "Update existing User",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            name: "uuid",
            in: "path",
            description: "Id of a user",
            required: true,
            type: "string"
          },
          {
            "in": "body",
            "name": "body",
            "description": "User object that needs to be added to the database",
            "required": true,
            "schema": {
              $ref: "#/components/schemas/User",
            }
          },{
            "in": "query",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema":{
              type: "string"
            }
          }],
        responses: {
          // response code
          200: {
            description: "User updated successfully", // response desc.
          },
          // response code
          404: {
            description: "User not found", // response desc.
          },
          // response code
          500: {
            description: "Server error", // response desc.
          },
        },
      },
    },
    "/user/{uuid}": {
      get: {
        tags: ["Users"],
        "summary": "Get a User",
        description: "Get a User",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id of a user",
            required: true,
            type: "string"
          },
          {
            "in": "query",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema":{
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Users were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    // "/user/delete/{id}": {
    //   "delete": {
    //     "tags": [
    //       "Users"
    //     ],
    //     "summary": "Delete a User",
    //     "description": "Delete User",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         name: "id",
    //         in: "path",
    //         description: "Id of a user",
    //         required: true,
    //         type: "string"
    //       },
    //       {
    //         "in": "query",
    //         "name": "Authorization",
    //         "description": "bearer token for user authorization",
    //         "required": true,
    //         "schema":{
    //           type: "string"
    //         }
    //       }],
    //     responses: {
    //       // response code
    //       200: {
    //         description: "User updated successfully", // response desc.
    //       },
    //       // response code
    //       404: {
    //         description: "User not found", // response desc.
    //       },
    //       // response code
    //       500: {
    //         description: "Server error", // response desc.
    //       },
    //     },
    //   },
    // },

    // login 
    "/user/login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Login",
        "description": "Login",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        requestBody: {
          // expected request body
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Login",
              },
            },
          },
        },
        "responses": {
          200: {
            description: "Loged in successfully", // response desc.
          },

          // response code
          500: {
            description: "Server error", // response desc.
          },
        }
      },
    },
  },

};