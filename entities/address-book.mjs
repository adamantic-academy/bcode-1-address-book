
export class ContactCard {
    surname;
    name;
    telephone;
    email;

    constructor(
        surname, name, telephone=null, email=null
    ) {
        this.surname = surname;
        this.name = name;
        this.telephone = telephone;
        this.email = email;
    }
}


export class AddressBook {

    contacts = [];

    add(contactCard) {
        /*
         FIXME: se aggiungo due volte lo stesso contatto avrò un duplicato!
         */
        this.contacts.push(contactCard);
    }

    searchBySurname(surname) {
        return this.contacts.filter( card => card.surname === surname );
    }

    searchByEmail(email) {
        return this.contacts.filter( card => card.email === email );
    }

}