import { Router } from 'express'; 
import { PaisAdapter } from '../adapter/PaisAdapter';
import { PaisApplicationService } from '../../application/PaisApplicationServices';
import { PaisController } from '../controller/PaisContrtoller';

const router = Router();

//Inicializacion de las capas

const paisAdapter = new PaisAdapter();
const paisAppService = new PaisApplicationService(paisAdapter);
const paisController = new PaisController(paisAppService);

//Definir ruta con manejo de errores

router.post('/pais', async (req, res) => {
  try {
    await paisController.createPais(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error en la creacion del pais', error });
  }
});

router.get('/pais', async (req, res) => {
  try {
    await paisController.getAllPaises(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los paises', error });
  }
});

router.get('/pais/:id', async (req, res) => {
  try {
    await paisController.getPaisById(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el pais', error });
  }
});

router.get('/pais-nombre/:nombre', async (req, res) => {
  try {
    await paisController.getPaisByNombre(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el pais por nombre', error });
  }
});

router.put('/pais/:id', async (req, res) => {
  try {
    await paisController.updatePais(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el pais', error });
  }
});

router.delete('/pais/:id', async (req, res) => {
  try {
    await paisController.deletePais(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar el pais', error });
  }
});

export default router;