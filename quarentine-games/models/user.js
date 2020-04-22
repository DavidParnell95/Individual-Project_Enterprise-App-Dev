const sequelize = require('sequelize')
var bcyrpt = require('bcrypt');

module.exports = function(sequelize,DataTypes)
{
    var User= sequelize.define("User",{
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: true
        },
    
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
            isUnique: true
        },
    
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            len: [6,20]
        }
    });

    //Generate Hash
    User.generateHash = function(password){
        return bcyrpt.hashSync(password, bcyrpt.genSaltSync(10), null);
    }

    User.prototype.validPassword = function (password)
    {
        return bcyrpt.compareSync(password, this.localPassword);
    }
    
}
