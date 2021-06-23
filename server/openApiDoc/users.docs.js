const util1 = require('../utils/apiBuildHandler')
const tag = 'UserController'
const schema = {
  usersSchema: {
    title: 'Get All Users',
    type: 'object',
    properties: {
      sumOfUser: {
        type: 'integer',
      },
      users: {
        type: 'array',
        items: {
          properties: {
            id: {
              type: 'integer',
            },
            userName: {
              type: 'string',
            },
            accountNumber: {
              type: 'number',
            },
            emailAddress: {
              type: 'string',
            },
            identityNumber: {
              type: 'number',
            },
          },
        },
      },
    },
  },
  userSchema: {
    title: 'Get User',
    properties: {
      id: {
        type: 'integer',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
    },
  },
  updateUserSchema: {
    title: 'Update User',
    properties: {
      user_id: {
        type: 'string',
      },
      user_name: {
        type: 'string',
      },
      account_number: {
        type: 'number',
      },
      email_address: {
        type: 'string',
      },
      identity_number: {
        type: 'number',
      },
    },
  },
  deleteUserSchema: {
    title: 'Delete Event',
    properties: {
      message: {
        type: 'string',
      },
    },
  },
}
const paths = {
  '/users': {
    get: {
      tags: [tag],
      parameters: [],
      responses: {
        200: {
          description: 'Get All Users',
          content: {
            'application/json': {
              schema: util1.getSchemaResponse(
                'usersSchema',
                'usersSchema',
                'object',
              ),
            },
          },
        },
      },
    },
  },
  '/user': {
    get: {
      tags: [tag],
      parameters: [],
      responses: {
        200: {
          description: 'Get User',
          content: {
            'application/json': {
              schema: util1.getSchemaResponse(
                'userSchema',
                'userSchema',
                'object',
              ),
            },
          },
        },
      },
    },
    put: {
      tags: [tag],
      requestBody: {
        content: {
          'application/json': {
            schema: util1.getSchemaRequest('updateUserSchema'),
          },
        },
      },
      responses: {
        200: {
          description: 'User Modification',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: [tag],
      parameters: [],
      responses: {
        200: {
          description: 'Delete User',
          content: {
            'application/json': {
              schema: util1.getSchemaResponse(
                'deleteUserSchema',
                'deleteUserSchema',
                'object',
              ),
            },
          },
        },
      },
    },
  },
}

exports.default = { schema, paths }
