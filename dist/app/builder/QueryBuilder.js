"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeField.forEach((el) => delete queryObj[el]);
        if (queryObj.pricePerHour) {
            const priceFilter = {};
            const priceRange = queryObj.pricePerHour.split('-');
            if (priceRange.length === 1 && priceRange[0].split('+')) {
                // Handle "min+" format
                priceFilter.$gte = Number(priceRange[0].replace('+', ''));
            }
            else if (priceRange.length === 1 && priceRange[0].endsWith('-')) {
                // Handle "max-" format
                priceFilter.$lte = Number(priceRange[0].replace('-', ''));
            }
            else if (priceRange.length === 2) {
                // Handle "min-max" format
                if (priceRange[0])
                    priceFilter.$gte = Number(priceRange[0]);
                if (priceRange[1])
                    priceFilter.$lte = Number(priceRange[1]);
            }
            queryObj.pricePerHour = priceFilter;
        }
        // Handle categories filter
        if (queryObj.carType) {
            queryObj.carType = { $in: queryObj.carType };
        }
        if (queryObj.location) {
            queryObj.location = { $in: queryObj.location };
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        const sortOption = this.query.sort;
        let sort = '+pricePerHour';
        if (sortOption) {
            const [field, order] = sortOption.split(':');
            sort = `${order === 'desc' ? '-' : ''}${field}`;
        }
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
}
exports.default = QueryBuilder;
