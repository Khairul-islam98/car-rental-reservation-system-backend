"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
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
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
}
exports.default = QueryBuilder;
