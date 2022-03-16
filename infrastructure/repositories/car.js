import mongoose from "mongoose";

class CarRepository {
  constructor(schema) {
    this.Model = mongoose.model("Car", schema);
  }

  async create(data) {
    const user = new this.Model(data);
    return user.save();
  }

  async update(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  async findOne(filters) {
    return this.Model.findOne(filters);
  }

  async delete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }

  find(filters) {
    return this.Model.find(filters);
  }

  async search(filters, page, size, sortBy, sortDirection) {
    const cars = await this.find(filters)
      .sort({ [sortBy]: sortDirection })
      .skip((page - 1) * size)
      .limit(size)
      .exec();

    const count = await this.Model.countDocuments(filters);

    const range = {
      start: (page - 1) * size,
      end: page * size,
    };

    const total = Math.ceil(count / size);

    return { cars, count, range, total };
  }
}

export default CarRepository;
