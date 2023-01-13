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
        const sql = 'SELECT * FROM contact_cards WHERE surname=$1';
        db.all(sql, [requestedSurname], (err, rows) => {
            response.send(rows);
        });
    });

    fast.get('/email/:email', function(request, response) {
        const email = request.params['email'];
        const sql = 'SELECT * FROM contact_cards WHERE email=$1';
        db.get(sql, [email], (err, row) => {
            if (err) {
                throw err;
            }
            response.send(row);
        });
    });

    fast.put('/contacts/:id', function(request, response) {
        const id = request.params['id'];
        const contact = {
            surname: request.body['surname'],
            name: request.body['name'],
            telephone: request.body['telephone'],
            email: request.body['email']
        };
        const sql = "UPDATE contact_cards SET surname=$1, name=$2, telephone=$3, email=$4 WHERE id=$5";
        db.run(sql, [contact.surname, contact.name, contact.telephone, contact.email, id], (err, row) => {
            if (err) {
                console.log(err);
                throw err;
            }
            response.send(row);
        });
    });

    fast.delete('/contacts/:id', function(request, response) {
        const id = request.params['id'];
        const sql = 'DELETE FROM contact_cards WHERE id=$1';
        db.run(sql, [id], (err) => {
            if (err) {
                throw err;
            }
            response.send("Contact with ID " + id + " removed successfully");
        });
    });

    fast.listen({ port }, function (err, address) {
        if (err) {
        fastify.log.error(err)
        process.exit(1)
        }
        console.log('Fastify server listening on ', address);
    })

}
