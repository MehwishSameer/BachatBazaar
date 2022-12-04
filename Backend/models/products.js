module.exports= function(sequelize, DataTypes){
    const Products= sequelize.define('Products',{
        id:  {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
      /*  CategoryID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false
        },*/
        productPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            unique: false
        },
        productDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        productImage: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: 1,
            unique: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        checked: {
            type: DataTypes.INTEGER,
            allowNull: true,
            default: 0,
            unique: false
        }

    });
Products.associate = (models) => {
    Products.hasMany(models.Carts, {
      onDelete: "cascade",
    });
  };
    return Products;
}