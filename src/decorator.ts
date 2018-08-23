// Copyright 2018 Frank Lin (lin.xiaoe.f@gmail.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

import { objectMapper } from "./object-mapper";

export interface JsonPropertyOption {
  name?: string;
  serializer?: (item: any) => any;
}

/* tslint:disable-next-line */
export function JsonProperty(options?: JsonPropertyOption): any {
  return (target: any, propertyName: string) => {
    if (!options) {
      objectMapper.addJsonProperty(target.constructor, {
        name: propertyName,
        jsonKey: propertyName
      });
    } else {
      objectMapper.addJsonProperty(target.constructor, {
        name: propertyName,
        jsonKey: options.name !== undefined ? options.name : propertyName,
        serializer: options.serializer
      });
    }
  };
}
