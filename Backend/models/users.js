module.exports= function(sequelize, DataTypes){
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    Users.associate = (models) => {
        Users.hasMany(models.Orders, {
          onDelete: "cascade",
        });
        Users.hasMany(models.Carts, {
          onDelete: "cascade",
        });
      };
    return Users;
}