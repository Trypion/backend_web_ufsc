import BaseRepository from "./base";
class CarRepository extends BaseRepository{
  constructor(schema) {
    super("Car", schema);
  }
}

export default CarRepository;
