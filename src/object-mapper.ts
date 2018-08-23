// Copyright 2018 Frank Lin (lin.xiaoe.f@gmail.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

export interface JsonField {
  name: string;
  jsonKey: string;
  serializer?: (value: any) => any;
}

/**
 * Mapping for object.
 */
export class ObjectMapper {

  private _jsonDefinitions: Map<{ new(): any }, JsonField[]> = new Map();

  static deserialize(cls: { new(): any }, json: any): any {
    /* tslint:disable-next-line */
    return objectMapper.deserialize(cls, json);
  }

  deserialize<T>(cls: { new(): T }, json: any): T {
    const fields: JsonField[] = this._jsonDefinitions.get(cls);
    const instance: any = new cls();
    for (const field of fields) {
      if (field.serializer) {
        instance[field.name] = field.serializer(json);
        continue;
      }

      const maybeMultipleLevelKey: string[] = field.jsonKey.split("."); // 支持根据点符号(.)切割层级
      if (maybeMultipleLevelKey.length > 0) {
        let jsonRef = json;
        for (const key of maybeMultipleLevelKey) {
          if (jsonRef[key] !== undefined) {
            jsonRef = jsonRef[key];
          } else {
            return instance;
          }
        }
        instance[field.name] = jsonRef;
      } else {
        instance[field.name] = json[field.jsonKey];
      }
    }
    return instance;
  }

  addJsonProperty(cls: { new(): any }, property: JsonField): void {
    if (!this._jsonDefinitions.get(cls)) {
      this._jsonDefinitions.set(cls, []);
    }
    this._jsonDefinitions.get(cls).push(property);
  }
}

export const objectMapper = new ObjectMapper();
