module.exports= function(sequelize, DataTypes){
    const Locations = sequelize.define('Locations', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
        country:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        street:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipCode:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId:{
            type: DataTypes.STRING,
            allowNull: false,

        }
        
    });
    
    return Locations;
}