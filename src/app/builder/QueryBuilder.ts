/* eslint-disable no-self-assign */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  filter() {
    const queryObj = { ...this.query };
    if (queryObj.carId) {
      queryObj.car = queryObj.carId;
      delete queryObj.carId;
    }
    if (queryObj.date) {
      queryObj.date = queryObj.date;
    }
    if (queryObj.isBooked) {
      queryObj.isBooked = queryObj.isBooked;
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }
}

export default QueryBuilder;
