import { NotFoundError } from "../domain/car";

class CarService {
  constructor(CarRepository) {
    this.CarRepository = CarRepository;
  }

  async create({ model, price, photo, description }) {
    const car = await this.CarRepository.create({ model, price, photo, description });

    return car;
  }

  async update({ id, model, price, photo, description }) {
    const persistedCar = await this.CarRepository.findOne({ id });

    if (!persistedCar) {
      throw new NotFoundError(`Car with id ${id} not found`);
    }

    return this.CarRepository.update(id, { model, price, photo, description });
  }

  async findOne({ id }) {
    const car = await this.CarRepository.findOne({ _id: id });

    if (!car) {
      throw new NotFoundError(`Car with id ${id} not found`);
    }

    return car;
  }

  async search(filters, pagination) {
    const { page = 1, size = 50, sortBy = "model", sortDirection = 1 } = pagination;
    const { cars, count, range, total } = await this.CarRepository.search(
      filters,
      parseInt(page, 10),
      parseInt(size, 10),
      sortBy,
      sortDirection
    );

    return { cars, count, range, total };
  }

  async delete({ id }) {
    const car = await this.CarRepository.findOne({ _id: id });

    if (!car) {
      throw new NotFoundError(`Car with id ${id} not found`);
    }

    return car.remove();
  }
}

export default CarService;
