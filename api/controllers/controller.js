import prisma from '../lib/prisma.js'

export const GetEmployess = async (req, res) => {
  try {
    const result = await prisma.employee.findMany();

    res.send(result);
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}

export const AddEmployee = async (req, res) => {
  const { name, address, position, priceperhour } = req.body;

  try {
    await prisma.employee.create({
      data: {
        name, address, position, pricePerHour: Number(priceperhour)
      }
    });

    res.send({ msg: 'hozzáadva!' });
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}

export const UpdateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, address, position, priceperhour } = req.body;

  try {
    await prisma.employee.update({ data: {
      name, address, position, pricePerHour: Number(priceperhour)
    }, where: { id: Number(id) } });

    res.send({ msg: 'frissítve!' });
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}

export const DeleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({ where: { id: Number(id) } });
    res.send({ msg: 'törölve!' });
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}

export const getEmployeeWorkhours = async(req, res) => {
  try {
    const result = await prisma.workhour.findMany({ select: { id: true, employee: { select: { name: true, id: true } }, date: true, start: true, end: true } });
    res.send(result);
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!' });
  }
}

export const addWorkhour = async (req, res) => {
  const { id, date, start, end } = req.body;

  try {
    await prisma.workhour.create({ data: {
      empId: Number(id), date, start, end
    } });

    res.send({ msg: 'hozzáadva!' });
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}

export const updateWorkhour = async(req, res) => {
  const { id } = req.params;
  const { empId, date, start, end } = req.body;

  try {
    await prisma.workhour.update({ data: {
      empId, date, start, end
    }, where: { id: Number(id) } });
    res.send({ msg: 'frissítve!' });
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}

export const deleteWorkhour = async(req, res) => {
  const { id } = req.params;

  try {
    await prisma.workhour.delete({ where: { id: Number(id) } });
    res.send({ msg: 'törölve!' });
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] })
  }
}

export const getPrepayments = async (req, res) => {
  try {
    const result = await prisma.prepayment.findMany({ include: { employee: true } });

    res.send(result);
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}

export const addPrepayment = async (req, res) => {
  const { employee, date, amount } = req.body;

  try {
    await prisma.prepayment.create({ data: { empId: Number(employee.id), date, amount } });
    res.send({ msg: 'hozzáadva!' });
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}

export const updatePrepayment = async (req, res) => {
  const { id } = req.params;
  const { employee, date, amount } = req.body;

  try {
    await prisma.prepayment.update({ data: {
      empId: Number(employee.id), date, amount
    }, where: { id: Number(id) } });
    res.send({ msg: 'frissítve!' });
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}

export const deletePrepayment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.prepayment.delete({ where: { id: Number(id) } });
    res.send({ msg: 'törölve!' });
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}

export const calendarStats = async (req, res) => {
  try {
    const prepayments = await prisma.prepayment.findMany({ include: { employee: true } });

    const pps = prepayments.map((pp) => {
      return { name: pp.employee.name, date: pp.date, amount: pp.amount }
    });

    res.send({ prepayments: pps, payments: ps });
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}

export const getStatistics = async (req, res) => {
  const { month } = req.params;

  try {
    const employees = await prisma.employee.findMany();
    const workhours = await prisma.workhour.findMany();
    const prepayments = await prisma.prepayment.findMany();

    const stats = employees.map((employee) => {
      const name = employee.name;
      const pph = employee.pricePerHour;
      const idok = workhours.filter(x => x.empId == employee.id && x.date.getMonth()+1 == month);
      const ms = idok.reduce((acc, curr) => {
        return acc + (curr.end.getTime() - curr.start.getTime());
      }, 0);
      const pps = prepayments.filter(x => x.empId == employee.id && x.date.getMonth()+1 == month);
      const overallpps = pps.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);

      const hours = (ms / 3600000).toFixed(2);
      const salary = hours * pph;

      return { name, pph, hours, salary, overallpps };
    });

    res.send(stats);
  } catch (e) {
    if (e) console.error(e);
    res.send({ msg: 'hiba történt!', errors: ['Adatbázis hiba történt, több infóért nézd meg a consolet.'] });
  }
}