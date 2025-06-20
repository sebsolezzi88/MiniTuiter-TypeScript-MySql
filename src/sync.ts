import sequelize from './config/db';
import './models/User';


const conectarYSincronizar = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado correctamente a la base de datos');
    console.log('Modelos registrados:', sequelize.models);

    await sequelize.sync({ force: true, logging: console.log }); // <-- Ojo aquí
    console.log('✅ Tablas sincronizadas correctamente');
  } catch (error) {
    console.error('❌ Error al sincronizar:', error);
  }
};

conectarYSincronizar();
