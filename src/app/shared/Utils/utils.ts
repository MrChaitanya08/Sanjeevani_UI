import { SortOrder } from 'src/app/models/app.settings.model';

export class Utils {

    static Sort(list: any[], fields: string[] | string, order: SortOrder[] | SortOrder) {
        if (list && list.length > 1) {
            return list.slice().sort((a, b) => {
                if (!Array.isArray(fields)) {
                    return Utils.Compare(Utils.getFieldValue(a, fields),
                        Utils.getFieldValue(b, fields), order);
                }
                // Sort using the give  fields
                let sortOrder: SortOrder;
                if (!Array.isArray(order)) {
                    sortOrder = order;
                }
                for (let i = 0; i < fields.length; i++) {
                    const field = fields[i];
                    const result = Utils.Compare(Utils.getFieldValue(a, field),
                        Utils.getFieldValue(b, field), (undefined !== sortOrder ? sortOrder : order[i]));
                    if (result === 0) {
                        // Sort with next sort field
                        continue;
                    }
                    return result;
                }
            });
        }
        return list;
    }

    static getFieldValue(model: any, field: string) {
        let value = '';
        if (field.indexOf('.') > 0) {
            const fieldSet = field.split('.');
            let modelProp = model;
            for (const element of fieldSet) {
                if (modelProp === undefined) {
                    break;
                }
                modelProp = modelProp[element];
            }
            value = modelProp;
        } else {
            value = model[field];
        }

        if (value === undefined) {
            return '';
        }

        return value;

    }

    static Compare(a, b, order) {
        let result = null;
        if (typeof a === 'number') {
            result = a - b;
        } else if (typeof a === 'boolean') {
            result = Number(a) - Number(b);
        } else if (a && a.startsWith && a.startsWith('/Date')) {
            const extractedDateA = a.match(/\(([^)]+)\)/)[1];
            const extractedDateB = b ? b.match(/\(([^)]+)\)/)[1] : 0;
            if (!isNaN(extractedDateA) && !isNaN(extractedDateB)) {
                result = parseInt(extractedDateA, 10) - parseInt(extractedDateB, 10);
            }
        } else if (Object.prototype.toString.call(a) === '[object Date]') {
            result = a.getTime() - b.getTime();
        } else if (typeof a === 'string') {
            result = a.localeCompare(b, 'en', { numeric: true });
        } else {
            if (a === b) {
                return order;
            }

            if (a === '' && b === '') {
                return order;
            }
            result = a && a.localeCompare(b);
        }
        return order * result;
    }

}
