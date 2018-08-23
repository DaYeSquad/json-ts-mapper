# OVERVIEW

For mapping from server returned JSON to TypeScript defined class.
The idea is inspired by [json-typescript-mapper](https://github.com/jf3096/json-typescript-mapper).


# INSTALL

`npm install json-ts-mapper --save`


# EXAMPLE

```TypeScript
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
```

