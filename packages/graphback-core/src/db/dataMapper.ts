import { ModelTableMap } from './modelTableMapper';

export interface TableDataMap {
    id?: TableID
    table?: string
    data?: any
    fieldMap?: any
}

export interface TableID {
    field: string
    value?: any
}

export const getDatabaseArguments = (modelMap: ModelTableMap, data?: any, fieldMap?: any): TableDataMap => {
    const idField = modelMap.idField;
    const tableDataMap: TableDataMap = {
        id: getTableId(idField, data),
        data
    }

    if (tableDataMap.data) {
        // tslint:disable-next-line: no-dynamic-delete
        delete tableDataMap.data[idField];
    }

    // TODO: Map fields to custom db names

    return tableDataMap;
}

function getTableId(idField: string, data: any = {}): TableID {
    let value: any;
    if (data[idField]) {
        value = data[idField];
    }

    return {
        field: idField,
        value
    }
}