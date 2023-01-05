import Fastify from "fastify";
import { AddressBook } from "./entities/address-book.mjs";
import * as fastifySqlite from "fastify-sqlite";

/**
 * @param {number} port 
 * @param {AddressBook} addressBook 
 */
export function createFastifyServer(port, addressBook) {

    const fast = Fastify({ logger: true });

    const db = new fastifySqlite.sqlite3.Database('database.db');

    db.run("CREATE TABLE IF NOT EXISTS contact_cards(id INTEGER PRIMARY KEY AUTOINCREMENT, surname TEXT, name TEXT, telephone TEXT, email TEXT)");

    fast.get('/', function (request, response) {
        response.send({ hello: 'world' })
    })

    fast.get('/contacts', function (request, response) {
        db.all('SELECT * FROM contact_cards', (err, rows) => {
            response.send(rows);
        });
    });

    fast.post('/contacts/new', function (request, response) {
        db.run('INSERT INTO contact_cards (surname, name, telephone, email) VALUES ($1, $2, $3, $4)',
        [request.body.surname, request.body.name, request.body.telephone, request.body.email], (err) => {
            response.send(err);
        });
    });

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
