import Fastify from "fastify";
import { AddressBook } from "./entities/address-book.mjs";

/**
 * @param {number} port 
 * @param {AddressBook} addressBook 
 */
export function createFastifyServer(port, addressBook) {

    const fast = Fastify({ logger: true });

    fast.get('/', function (request, response) {
        response.send({ hello: 'world' })
    })

    fast.get('/surname/:srn', function(request, response) {
        const requestedSurname = request.params['srn'];
        return addressBook.searchBySurname(requestedSurname);
    });

    fast.get('/email/:email', function(request, response) {
        return addressBook.searchByEmail( request.params['email']);
    })

    fast.listen({ port }, function (err, address) {
        if (err) {
        fastify.log.error(err)
        process.exit(1)
        }
        console.log('Fastify server listening on ', address);
    })

}
