const { DataTypes, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    height_min: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    height_max:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    weight_min: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    weight_max:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    life_time_min:  {
      type: DataTypes.STRING,
    },
    
    life_time_max:  {
      type: DataTypes.STRING,
    },
    
    createInBd:  {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    
    img:  {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://cdn2.thedogapi.com/images/HyJvcl9N7.jpg",
    },
  });
};
