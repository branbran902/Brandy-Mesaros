const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DB,
                                process.env.POSTGRES_USER,
                                process.env.POSTGRES_PASSWORD,
                                {
                                    host: process.env.POSTGRES_HOST,
                                    port: process.env.POSTGRES_PORT,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.POSTGRES_SSL == "true"
                                    	ca: process.env.CA_CERT,
				    }
                                },{
                                  logging: console.log,  
                                });

                                test();

                                async function test(){
                                  try {
                                   console.log('Gonna authenticate'); // <== to make sure console.log is working and not overrided!
                                   var conn = await sequelize.authenticate()
                                   .then(() => console.log('All Done :)'))
                                   .catch(err => console.error(err))
                                   console.log('Connection has been established successfully.');
                                 } catch (error) {
                                   console.error('Unable to connect to the database:', error);
                                 }
                               }

                               module.exports = {
                                sequelize: sequelize
                            };
