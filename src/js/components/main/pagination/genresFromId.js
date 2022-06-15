import jsonGenres from "../../../API/jsonGenres";



export default function genresData (arrId){
    const genres = jsonGenres;
    const genresName = [];
    
    for (let i = 0; i < genres.length; i++) {
      if (genres[i].id === arrId[0]) {
        genresName.push(genres[i].name);
      }

      if (genres[i].id === arrId[1]) {
        genresName.push(genres[i].name);
      }
    }

    if (arrId[3]) {
      genresName.push('other');
    }

    return genresName.join(', ');
};
