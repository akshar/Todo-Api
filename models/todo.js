module.exports = function(sequelize, DataTypes) {

    return sequelize.define('todo', {
        description: {
            type: DataTypes.STRING,
            allowNUll: false,
            validate: {
                len: [1, 250]
            }
        },

        completed: {
            type: DataTypes.BOOLEAN,
            allowNUll: false,
            defaultValue: false
        }


    });

};
