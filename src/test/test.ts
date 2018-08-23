// Copyright 2018 Frank Lin (lin.xiaoe.f@gmail.com). All rights reserved.
// Use of this source code is governed a license that can be found in the LICENSE file.

import * as chai from "chai";

import {JsonProperty} from "../decorator";
import {ObjectMapper} from "../object-mapper";

describe("Test decorator", () => {
  it("Test object with decorator with name only", () => {
    class User {
      @JsonProperty({ name: "objectId" })
      id: number;

      @JsonProperty({ name: "username" })
      username: string;
    }

    const userResponse: any = {
      objectId: 3,
      username: "franklin"
    };

    const user: User = ObjectMapper.deserialize(User, userResponse);
    chai.expect(user.id).to.equal(3);
    chai.expect(user.username).to.equal("franklin");
  });

  it("Test object with decorator without name", () => {
    class User {
      @JsonProperty({ name: "objectId" })
      id: number;

      @JsonProperty()
      username: string;
    }

    const userResponse: any = {
      objectId: 3,
      username: "franklin"
    };

    const user: User = ObjectMapper.deserialize(User, userResponse);
    chai.expect(user.id).to.equal(3);
    chai.expect(user.username).to.equal("franklin");
  });

  it("Test object with decorator without dot", () => {
    class User {
      @JsonProperty({ name: "object.id" })
      id: number;

      @JsonProperty()
      username: string;
    }

    const userResponse: any = {
      object: {
        id: 3
      },
      username: "franklin"
    };

    const user: User = ObjectMapper.deserialize(User, userResponse);
    chai.expect(user.id).to.equal(3);
    chai.expect(user.username).to.equal("franklin");
  });

  it("Test object with decorator without multiple level", () => {
    class User {
      @JsonProperty({ name: "object.uid.id" })
      id: number;

      @JsonProperty()
      username: string;
    }

    const userResponse: any = {
      object: {
        uid: {
          id: 3
        }
      },
      username: "franklin"
    };

    const user: User = ObjectMapper.deserialize(User, userResponse);
    chai.expect(user.id).to.equal(3);
    chai.expect(user.username).to.equal("franklin");
  });

  it("Test issue when occur below response", () => {
    const res: any = {
      "objectId": 1481,
      "length": 53.7,
      "weight": 17.7,
      "username": "wangchao",
      "time": 1526980189,
      "createdBy": {
        "displayName": "wangchao"
      },
      "createdAt": 1526980189,
      "latitude": 39.98442,
      "longitude": 39.98442,
      "rectangle": [159, 241, 956, 1463],
      "shape": [1200, 1600],
      "address": "北京市海淀区海淀街道北四环西路",
      "hasFeedback": true,
      "isAccuracy": true,
      "rawImage": "7d82304f-a91d-4fc6-ab33-65022159d444_.jpg",
      "thumbnail": "7d82304f-a91d-4fc6-ab33-65022159d444__thumb.jpg",
      "feedback": {
        "length": {
          "value": -1,
          "image": ""
        },
        "weight": {
          "value": -1,
          "image": ""
        }
      }
    };

    class Pig {
      @JsonProperty({name: "objectId"})
      id: number;

      @JsonProperty()
      length: number;
    }

    const pig: Pig = ObjectMapper.deserialize(Pig, res);
    chai.expect(pig.id).to.equal(1481);
  });

  it("Test custom serializer with image url", () => {
    const res: any = {
      rawImage: "7d82304f-a91d-4fc6-ab33-65022159d444_.jpg",
    };

    class User {
      @JsonProperty({serializer: (value: any) => { return `https://api.gagogroup.cn/${value["rawImage"]}` } })
      rawUrl: string;
    }

    const user: User = ObjectMapper.deserialize(User, res);
    chai.expect(user.rawUrl).to.equal(`https://api.gagogroup.cn/7d82304f-a91d-4fc6-ab33-65022159d444_.jpg`);
  });
});
