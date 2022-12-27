const API = 'https://youtube-search-results.p.rapidapi.com/youtube-search/?q=asyncrhony%2Bin%2Bjavascript'; 

const content = null || document.getElementById('content'); 

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cba9d231dfmsh222bd370e80631ap142bd3jsnc17e87ca2366',
		'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data; 
}

(async () => {
    try {
        const videos = await fetchData(API); 
        let view = `
        ${videos.items.map(video => {
            if (video.type !== "video") {
              return ''; // no se ejecuta el código del bloque
            }
            return `
              <div class="group relative">
              <a href=${video.url} target="_blank">
                <div
                  class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                  <img src="${video.bestThumbnail.url}" alt="${video.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                  <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.title}
                  </h3>
                </div>
              </a>
              </div>
            `;
          }).slice(0, 5).join('')}
        `; 
        content.innerHTML = view;
    } catch (error) { console.log(error); }
})();


