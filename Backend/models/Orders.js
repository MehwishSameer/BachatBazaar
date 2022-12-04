module.exports= function(sequelize, DataTypes){
    const Orders= sequelize.define('Orders',{
        orderID:  {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderBill: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: 1,
            unique: false
        }

    });
    return Orders;
}