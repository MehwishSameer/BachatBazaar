module.exports= function(sequelize, DataTypes){
    const Purchases= sequelize.define('Purchases',{
        historyID:  {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        noofProducts:  {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
           
    });
    return Purchases;
}