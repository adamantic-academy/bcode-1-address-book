import http from 'http';
import { AddressBook, ContactCard } from './entities/address-book.mjs';


export function createHttpServer(port, addressBook) {

    const server = http.createServer( (request, response) => {
        console.log('Received request', request.url);

        const result = handleRequest(request.url, addressBook);

        response.write(JSON.stringify(result));
        response.end();
    });

    server.listen(port, () => { console.log('Server listening on port ' + port);} );
}

/**
 * 
 * @param {string} url 
 * @param {AddressBook} addressBook
 * @return {ContactCard[]}
 */
function handleRequest(url, addressBook) {
    if (url.startsWith('/surname')) {
        return addressBook.searchBySurname(url.substring(9));
    } else if (url.startsWith('/email')) {
        return addressBook.searchByEmail(url.substring(7));
    }
    console.warn('Did not understand request URL: ', url);
    return [];
}