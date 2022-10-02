const studentSchema = new mongoose.Schema({
    email: {
        type: {data: String, display: Boolean},
        required: [true, 'Email required.'],
        lowercase: true,
        validate: {
            validator: async function(email) {
              const user = await this.constructor.findOne({ email });
              if (user) {
                if (this.id === user.id) return true;
                return false;
              }
              return true;
            },
            message: props =>  `The specified email address ${props.value} is already in use.`
          }
    },
    password: {
        type: String,
        required: [true, 'Password required.'],
        minLength: 6,
        validate: [
            { validator: v => { return v.search(/\d/) > -1 }, message: props => `${props.value} does not contain digits.`},
            { validator: v => { return v.search(/[a-zA-Z]/) > -1 }, message: props => `${props.value} does not contain alphabets.`},
            { validator: v => { return v.search(/\W/) == -1 }, message: props => `${props.value} contains invalid characters.`}
        ]
    },
    name: {data: String, display: Boolean},
    dateOfBirth: {data: Date, display: Boolean},
    gender: {data: String, display: Boolean},
    program: {data: String, display: Boolean},
    description: {data: String, display: Boolean}
}, { collection: "students"});

module.exports = mongoose.model("Student", studentSchema);