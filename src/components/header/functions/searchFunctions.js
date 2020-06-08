import {
  cityIndex,
  nameIndex,
  streetIndex,
  postalCodeIndex,
} from "../search-indexes/searchIndexes";

const getSearchResults = (searchTerm) => {
  // let cityResults = cityIndex.search(searchTerm).map((result) => ({
  //   foundExpression: result.content.city,
  //   dealer: result,
  // }));
  let cityResults = cityIndex.search(searchTerm);
  let filteredCityResults = [
    {
      foundExpression: "",
      data: [],
    },
  ];
  if (cityResults.length !== 0) {
    filteredCityResults[0].foundExpression = cityResults[0].content.city;
    cityResults.map((result) => filteredCityResults[0].data.push(result));
  } else {
    filteredCityResults = [];
  }
  console.log("CITY:");
  console.log(filteredCityResults);

  // let nameResults = nameIndex.search(searchTerm).map((result) => ({
  //   foundExpression: result.content.name,
  //   dealer: result,
  // }));
  let nameResults = nameIndex.search(searchTerm);
  let filteredNameResults = [
    {
      foundExpression: "",
      data: [],
    },
  ];
  if (nameResults.length !== 0) {
    filteredNameResults[0].foundExpression = nameResults[0].content.name;
    nameResults.map((result) => filteredNameResults[0].data.push(result));
  } else {
    filteredCityResults = [];
  }

  // let streetResults = streetIndex.search(searchTerm).map((result) => ({
  //   foundExpression: result.content.street,
  //   dealer: result,
  // }));
  let streetResults = streetIndex.search(searchTerm).map((result) => ({
    foundExpression: result.content.street,
    data: [result],
  }));

  // ORIGINAL
  // let postalCodeResults = postalCodeIndex.search(searchTerm).map((result) => ({
  //   foundExpression: result.content.postalCode,
  //   dealer: result,
  // }));

  let postalCodeResults = postalCodeIndex.search(searchTerm);
  let filteredPostalCodeResults = [
    {
      foundExpression: "",
      data: [],
    },
  ];
  if (postalCodeResults.length !== 0) {
    filteredPostalCodeResults[0].foundExpression =
      postalCodeResults[0].content.postalCode;
    postalCodeResults.map((result) =>
      filteredPostalCodeResults[0].data.push(result)
    );
  } else {
    filteredCityResults = [];
  }

  let combinedResults = filteredCityResults.concat(
    filteredNameResults,
    streetResults,
    filteredPostalCodeResults
  );
  //return results which dont have identical values

  return combinedResults;
};

const setInitialSearchDatabase = (data) => {
  [cityIndex, nameIndex, streetIndex, postalCodeIndex].forEach((index) =>
    index.add(data)
  );
};
export { getSearchResults, setInitialSearchDatabase };
