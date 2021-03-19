const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class File extends Model {
  }
  File.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: new DataTypes.INTEGER()
      },
      fileName: {
        type: new DataTypes.STRING(),
        allowNull: true
      },
      fileLink: {
        type: new DataTypes.STRING(),
        allowNull: true
      },
      createdAt: {
        allowNull: true,
        type: new DataTypes.DATE(),
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'File',
      tableName: 'files'
    }
  );

  File.createFile = async function (fName, location) {
    const fileData = File.create({
      fileName: fName,
      fileLink: location
    });
    return fileData;
  }

  File.getAll = async () => {
    const files = await File.findAll();
    return files;
  }

  return File;
};