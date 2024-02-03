import { Router } from 'express'
import { GetEmployess, AddEmployee, UpdateEmployee, DeleteEmployee, getEmployeeWorkhours, addWorkhour, getStatistics, getPrepayments, updateWorkhour, deleteWorkhour, addPrepayment, updatePrepayment, deletePrepayment } from '../controllers/controller.js';

const router = Router();

router.get('/', (req, res) => { res.send({ msg: 'Backend is up!' }) });
router.get('/employees', GetEmployess);
router.post('/employees', AddEmployee);
router.patch('/employees/:id', UpdateEmployee);
router.delete('/employees/:id', DeleteEmployee);

router.get('/workhours', getEmployeeWorkhours);
router.post('/workhours', addWorkhour);
router.patch('/workhours/:id', updateWorkhour);
router.delete('/workhours/:id', deleteWorkhour);

router.get('/prepayments', getPrepayments);
router.post('/prepayments', addPrepayment);
router.patch('/prepayments/:id', updatePrepayment);
router.delete('/prepayments/:id', deletePrepayment);

router.get('/statistics/:month', getStatistics);

export default router;