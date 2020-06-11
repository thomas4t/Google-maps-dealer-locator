import {
  cityIndex,
  nameIndex,
  streetIndex,
  postalCodeIndex,
} from "../search-indexes/searchIndexes";
import groupBy from "lodash/groupBy";

const getSearchResults = (searchTerm) => {
  //CITY SEARCH RESULTS
  let cityResults = cityIndex.search(searchTerm);
  let groupedByCity = groupBy(cityResults, (dealer) => {
    return dealer.content.city;
  });
  let citiesArray = Object.keys(groupedByCity).map((key) => {
    return [key, groupedByCity[key]];
  });

  //NAME SEARCH RESULTS
  let nameResults = nameIndex.search(searchTerm);
  let groupedByName = groupBy(nameResults, (dealer) => {
    return dealer.content.name;
  });
  let namesArray = Object.keys(groupedByName).map((key) => {
    return [key, groupedByName[key]];
  });

  //STREET SEARCH RESULTS
  let streetResults = streetIndex.search(searchTerm);
  let groupedByStreet = groupBy(streetResults, (dealer) => {
    return dealer.content.street;
  });
  let streetsArray = Object.keys(groupedByStreet).map((key) => {
    return [key, groupedByStreet[key]];
  });

  //POSTALCODE SEARCH RESULTS
  let postalCodeResults = postalCodeIndex.search(searchTerm);
  let groupedByPostalCodes = groupBy(postalCodeResults, (dealer) => {
    return dealer.content.postalCode;
  });
  let postalCodesArray = Object.keys(groupedByPostalCodes).map((key) => {
    return [key, groupedByPostalCodes[key]];
  });
  let combinedResults = citiesArray.concat(
    namesArray,
    streetsArray,
    postalCodesArray
  );
  return combinedResults;
};

const setInitialSearchDatabase = (data) => {
  [cityIndex, nameIndex, streetIndex, postalCodeIndex].forEach((index) =>
    index.add(data)
  );
};

export { getSearchResults, setInitialSearchDatabase };
