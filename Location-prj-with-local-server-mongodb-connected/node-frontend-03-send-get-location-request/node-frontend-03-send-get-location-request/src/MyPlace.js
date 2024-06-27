import { Map } from './UI/Map';

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    const headerTitleEl = document.querySelector('header h1');
    headerTitleEl.textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
//The searchParams read-only property of the URL interface
//returns a URLSearchParams object
//allowing access to the GET decoded query arguments
//contained in the URL.


//get the location's id
const locId = queryParams.get('location');//get the location part form the url(part after the location=)

fetch('http://localhost:3000/location/' + locId)//add it to our server location
  .then(response => {
    if (response.status === 404) {//if it returned 404 (the location is not in server array)
      throw new Error('Could not find location!');
    }
    return response.json();//the location is found return the its value
  })
  .then(data => {
    new LoadedPlace(data.coordinates, data.address);//calling the loadPlace class to show the url
  })
  .catch(err => {
    alert(err.message);//in case an error accured
  });
