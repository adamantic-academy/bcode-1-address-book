import fs from 'fs';

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
    dirty = false;
    filename;


    constructor( filename = 'adb.json' ) {
        this.filename = filename;
        try {
            this.contacts = JSON.parse(fs.readFileSync(filename).toString());
        } catch (err) {
            console.log('Could not read address book, leaving empty', err);
        }

        setInterval(() => {
            console.log('dirty check...');
            this.saveIfDirty();
        }, 5000);

    }

    add(contactCard) {
        this.dirty = true;

        for (let i=0; i < this.contacts.length; i++) {
            if (this.contacts[i].email === contactCard.email) {
                this.contacts[i] = contactCard;
                return;
            }
        }
        this.contacts.push(contactCard);
    }

    searchBySurname(surname) {
        return this.contacts.filter( card => card.surname === surname );
    }

    searchByEmail(email) {
        return this.contacts.filter( card => card.email === email );
    }

    allContacts() {
        return this.contacts;
    }

    delete(email) {

        this.dirty = true;

        for (let i=0; i < this.contacts.length; i++) {
            if (this.contacts[i].email === email) {
                return this.contacts.splice(i, 1);
            }
        }
    }

    saveIfDirty() {
        if (this.dirty) {
            console.log('Saving address book...');
            try {
                fs.writeFileSync(this.filename, JSON.stringify(this.contacts, null, 2))
                this.dirty = false;
            } catch (err) {
                console.log('Could not save address book, leaving dirty!', err);
            }
        }
    }


}