import { Router } from 'express'; 
import { UserAdapter } from '../adapter/UserAdapter';
import { UserApplication } from '../../application/UserApplication';
import { UserController } from '../controller/UserController';
import { authenticateToken } from '../../../src/infraestructure/web/authMiddleware';

const router = Router();

const userAdapter = new UserAdapter();
const userAppService = new UserApplication(userAdapter);
const userController = new UserController(userAppService);

router.post('/login', async (req, res) => {
  await userController.login(req, res);
  // try {
//    await userController.login(req, res);
 // } catch (error) {
 //   res.status(400).json({ message: 'Error en la creacion del usuario', error });
//  }

  });

router.get('/users', authenticateToken, async (req, res) => {
  try {
    await userController.getAllUsers(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los usuarios', error });
  }
});


router.post('/users' ,async (req, res) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error en la creacion del usuario', error });
  }
});

router.put('/users/:id', authenticateToken, async (req, res) => {
  try {
    await userController.updateUser(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el usuario', error });
  }
});


router.get('/users/:id', authenticateToken,  async (req, res) => {
  try {
    await userController.getUserById(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el usuario', error });
  }
});


router.get('/users-mail/:email', async (req, res) => {
  try {
    await userController.getUserByEmail(req, res);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener el usuario por email', error });
  }
});

export default router;