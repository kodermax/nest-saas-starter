import _ from "lodash";

export default function getAggregatefromFilter(filter: any, ...datekeys) {
    if (!filter)
        return

    try {
        filter = JSON.parse(filter);
    } catch (e) {
        throw new Error('Filter parse error');
    }

    let aggregate = [];
    const matchTypes = {
        ">": "$gt",
        "<": "$lt",
        "=": "$eq",
        ">=": "$gte",
        "<=": "$lte",
        "!=": "$ne",
        "<>": "$ne",
        "startswith": "startswith",
        "endswith": "endswith",
        "contains": "contains",
        "notcontains": "notcontains",
    }

    const getFilterDepth = (filter: any) => {
        if (!(filter instanceof Array))
            return 0;
        const depth = [];
        filter.forEach(ele => {
            depth.push(getFilterDepth(ele) + 1);
        })
        return _.max(depth)
    }

    const dealMatchByDepth = (filter: any): any => {

        if (getFilterDepth(filter) == 1) {
            // {key:{matchType:value}}
            const key = filter[0];
            const matchType = matchTypes[filter[1]];
            if (!matchType)
                throw new Error('Filter error: matchType miss')
            const value = filter[2];

            const data = {};
            data[key] = {};
            if (['startswith', 'endswith', 'contains', 'notcontains'].indexOf(matchType) != -1) {
                switch (matchType) {
                    case 'startswith':
                        data[key] = new RegExp('^' + value.replace(/\\/g, '\\\\'), 'i');
                        break;
                    case 'endswith':
                        data[key] = new RegExp(value.replace(/\\/g, '\\\\') + '$', 'i');
                        break;
                    case 'contains':
                        data[key] = new RegExp(value.replace(/\\/g, '\\\\'), 'i');
                        break;
                    case 'notcontains':
                        data[key] = new RegExp("^((?!" + value.replace(/\\/g, '\\\\') + ").)*$", 'i');
                        break;
                }
            } else {
                data[key][matchType] = value;
            }
            return data;
        }

        if (getFilterDepth(filter) == 2) {
            // "or"
            if (filter.indexOf('or') > 0) {
                const or = [];
                filter.forEach(ele => {
                    if (ele instanceof Array)
                        or.push(dealMatchByDepth(ele));
                })
                return or;
                // "and" or "empty"
            } else {
                const and = {};
                filter.forEach(ele => {
                    // filter
                    if (ele instanceof Array) {
                        const data = dealMatchByDepth(ele);
                        for (const key in data) {
                            if (and[key]) {
                                Object.assign(and[key], data[key]);
                            } else {
                                and[key] = data[key];
                            }
                        }
                    }
                })
                return and;
            }
        }

        if (getFilterDepth(filter) == 3) {
            if (filter.indexOf('or') > 0) {
                let or = [];
                filter.forEach(ele => {
                    // filter 'or'
                    if (ele instanceof Array) {
                        const data = dealMatchByDepth(ele);
                        if (data instanceof Array) {
                            or = or.concat(data);
                        } else if (data instanceof Object) {
                            or.push(data);
                        } else {
                            throw new Error('data out of think,the most reason is your code error not data error');
                        }
                    }
                })
                return or;
            } else if (filter.indexOf('and') > 0) {
                const and = {};
                filter.forEach(ele => {
                    // filter 'and'
                    if (ele instanceof Array) {
                        const data = dealMatchByDepth(ele);
                        if (data instanceof Array) {
                            and['$or'] = data;
                        } else if (data instanceof Object) {
                            for (const key in data) {
                                if (and[key]) {
                                    Object.assign(and[key], data[key]);
                                } else {
                                    and[key] = data[key];
                                }
                            }
                        } else {
                            throw new Error('data out of think,please check the code(not data)');
                        }
                    }
                })
                return and;
            } else {
                throw new Error('data out of think,please check the code(not data)');
            }
        }

        if (getFilterDepth(filter) >= 4) {
            if (filter.indexOf('and') > 0) {
                const aggregate = [];
                filter.forEach(ele => {
                    if (getFilterDepth(ele) >= 4) {
                        const subAggregate = dealMatchByDepth(ele)
                        aggregate.push(...subAggregate)
                    } else if (ele instanceof Array) {
                        let match = {};
                        const data = dealMatchByDepth(ele);
                        if (data instanceof Array) {
                            match['$or'] = data;
                        } else if (data instanceof Object) {
                            match = data;
                        } else {
                            throw new Error('data out of think,the most reason is your code error not data error');
                        }
                        aggregate.push({ '$match': match });
                    }
                })
                return aggregate;
            } else {
                throw new Error('data out of think,the most reason is your code error not data error');
            }
        }

    }

    const dealDate = (aggregate) => {
        if (!(aggregate instanceof Array) && (aggregate instanceof Object)) {
            for (const key in aggregate) {
                aggregate[key] = new Date(aggregate[key])
            }
        }
    }

    const dealAggregate = (aggregate) => {
        for (const key in aggregate) {
            if (datekeys.indexOf(key) >= 0) {
                dealDate(aggregate[key])
                continue
            }
            if (key == "$eq" && aggregate.$eq == null && !aggregate.$exists) {
                aggregate.$exists = false
                delete aggregate.$eq
                continue
            }
            if (aggregate[key] instanceof Object) {
                dealAggregate(aggregate[key])
            }
        }
    }

    const data = dealMatchByDepth(filter);
    if (data instanceof Array) {
        if (!data[0]['$match']) {
            const match = {};
            match['$or'] = data;
            aggregate.push({ "$match": match });
        } else {
            aggregate = data;
        }
    } else if (data instanceof Object) {
        aggregate.push({ "$match": data });
    }

    dealAggregate(aggregate)
    return aggregate
}