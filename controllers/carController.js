// CarController

const fs = require('fs');
const path = require('path');

const carsFilePath = path.join(__dirname, '..', 'cars.json');

let carIndex = 1;

const getCars = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(carsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading cars file:', err);
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

const saveCars = (cars) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(carsFilePath, JSON.stringify(cars), (err) => {
      if (err) {
        console.error('Error saving cars file:', err);
        reject(err);
      }
      resolve();
    });
  });
};

exports.getCars = async (req, res) => {
  try {
    const cars = await getCars();
    if (req.query.id) {
      const { id } = req.query;
      const car = cars.find((car) => car.id === parseInt(id));
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      return res.json(car);
    }
    res.json(cars);
  } catch (err) {
    console.error('Error getting cars:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createCar = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const cars = await getCars();
    const id = Date.now();
    const newCar = { id, name, description, price };

    cars.push(newCar);
    await saveCars(cars);

    res.status(201).json({ message: 'created new car', newCar });
  } catch (err) {
    console.error('Error creating car:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const cars = await getCars();
    const index = cars.findIndex((car) => car.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: 'Car not found' });
    }
    const updatedCar = { ...cars[index], name, description, price };
    cars[index] = updatedCar;

    await saveCars(cars);

    res.json({ message: 'succesfully updated', updatedCar });
  } catch (err) {
    console.error('Error updating car:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.query;
    const cars = await getCars();
    const deletedCar = cars.find((car) => car.id === parseInt(id));
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    const newCars = cars.filter((car) => car.id !== parseInt(id));
    await saveCars(newCars);
    res.json({ message: 'Car deleted', deletedCar });
  } catch (err) {
    console.error('Error deleting car:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
