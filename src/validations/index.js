const mainValidations = {
  empty: 'validationsEmpty',

  email: {
    email: {
      message: 'Email invalid'
    },
    presence: {
      message: 'Email missing'
    }
  },

  password: {
    length: {
      minimum: 6,
      message: "Password's minimum length is of 6 characters"
    },
    presence: {
      message: 'Password missing'
    }
  },

  name: {
    presence: {
      message: 'Field missing'
    }
  }
}

export default mainValidations
