// Se hacer regerencia al serviceWorker de la siguiente forma 
// self + this
// No es recomendable poner funciones fuera de los listeners 

self.addEventListener('intall', e => { 
    console.log('sw install');
    console.log('install', e);
});

self.addEventListener('activate', e => {
    console.log('sw activate');
});

self.addEventListener('fetch' , e => { 
    console.log('sw fetch');
    console.log('fetch!', e.request.url);
});

