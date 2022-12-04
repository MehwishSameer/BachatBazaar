module.exports= function(sequelize, DataTypes){
    const Carts= sequelize.define('Carts',{
        cartID:  {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
            productQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1,
            unique: false
        },
        productPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            unique: false
        },
        checked: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: 1,
            unique: false
        }

    });
    return Carts;
}
