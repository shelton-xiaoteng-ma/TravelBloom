const searchBtn = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

function fetchRecommendation() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const beachArray = ['beach', 'beaches'];
        const templeArray = ['temple', 'temples'];
        if(beachArray.indexOf(input) !== -1){
            // beaches
            const recommendInfo = data.beaches;
            recommendInfo.forEach((beach) => {
                resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="${beach.name}"/>`;
                resultDiv.innerHTML += `<h2 class="result-desc">${beach.name}</h2>`;
                resultDiv.innerHTML += `<p class="result-desc">${beach.description}</p>`;
            });
        }else if(templeArray.indexOf(input)!==-1){
            //temples
            const recommendInfo = data.temples;
            recommendInfo.forEach((temple) => {
                resultDiv.innerHTML += `<img src="${temple.imageUrl}" alt="${temple.name}"/>`;
                resultDiv.innerHTML += `<h2 class="result-desc">${temple.name}</h2>`;
                resultDiv.innerHTML += `<p class="result-desc">${temple.description}</p>`;
            });
        }else{
            const recommendInfo = data.countries.find(item => item.name.toLowerCase() === input);
            if (recommendInfo) {
                recommendInfo.cities.forEach((city) => {
                    resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}"/>`;
                    resultDiv.innerHTML += `<h2 class="result-desc">${city.name}</h2>`;
                    resultDiv.innerHTML += `<p class="result-desc">${city.description}</p>`;
                });
            }else{
                resultDiv.innerHTML = 'Keyword not found.';
            }
        }})
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }

function clearResults(){
    document.getElementById("result").innerHTML = '';
}

btnSearch.addEventListener("click", fetchRecommendation);
btnClear.addEventListener("click", clearResults);
