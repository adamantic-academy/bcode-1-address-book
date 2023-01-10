import { ContactCard, AddressBook } from './entities/address-book.mjs';
import { createFastifyServer } from './fastifyserver.mjs';
import { createHttpServer } from './httpserver.mjs';

const addressBook = new AddressBook();

//addressBook.add(new ContactCard('Barra', 'Domenico', '1423214', 'd.barra@example.com'));
//addressBook.add(new ContactCard('Barra', 'Mario', '1529827', 'm.barra@example.com'));
//addressBook.add(new ContactCard('Rossi', 'Mario', '2309528', 'm.rossi@example.com'));


createHttpServer(3000, addressBook);
createFastifyServer(4000, addressBook);