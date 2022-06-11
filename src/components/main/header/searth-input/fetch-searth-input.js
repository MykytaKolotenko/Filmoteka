export function fetchSearthInput(name) {
    const URL = `https://api.themoviedb.org/3/`;
    const KEYv3 = '?api_key=0f5c4a68ea4f6f8af4c4fd53fcc81027';
 
  return fetch(`${URL}${KEYv3}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}