var FlexSearch = require("flexsearch");

const cityIndex = new FlexSearch({
  profile: "match", //could change
  tokenize: "forward",
  depth: 2,
  doc: {
    id: "id",
    field: "content:city",
  },
});
const nameIndex = new FlexSearch({
  profile: "match", //could change
  tokenize: "forward",
  depth: 2,
  doc: {
    id: "id",
    field: "content:name",
  },
});
const streetIndex = new FlexSearch({
  profile: "match", //could change
  tokenize: "forward",
  depth: 2,
  doc: {
    id: "id",
    field: "content:street",
  },
});
const postalCodeIndex = new FlexSearch({
  profile: "match", //could change
  tokenize: "forward",
  depth: 2,
  doc: {
    id: "id",
    field: "content:postalCode",
  },
});

export { cityIndex, nameIndex, streetIndex, postalCodeIndex };
