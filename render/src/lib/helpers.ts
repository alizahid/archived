import { cloneDeep } from 'lodash'

class Helpers {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeFields(object: any, fields: string[]) {
    for (const field of fields) {
      delete object[field]
    }

    return object
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeAllFields(array: any[], fields: string[]) {
    return cloneDeep(array).map(item => this.removeFields(item, fields))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeAllTypeName(array: any[]) {
    return cloneDeep(array).map(item => this.removeFields(item, ['__typename']))
  }
}

export const helpers = new Helpers()
