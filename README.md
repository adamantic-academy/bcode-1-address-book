# Address Book
Questo repository contiene il codice creato durante la lezione del 15 dicembre 2022 per Blockchain Code.

## Prerequisiti
* Node.js - versione recente (18 o 19)

## Installazione
* Aprire un terminale e portarsi alla directory principale del progetto, dando i seguenti comandi
* Installare le dipendenze del progetto dando al terminale il comando `npm install`

## Avvio
Il codice del server è contenuto nel file `index.mjs` - ci sono due modi per avviarlo:
 * `node index.mjs`
 * `npm start`

 Il server si avvierà in due versioni:
 * `httpserver` (usando il solo modulo `http`) sulla porta http://localhost:3000
 * `fastifyserver` (usando il framework `fastify`) sulla porta http://localhost:4000


## Invocazione
La raccomandazione è quella di usare un tool (curl, Postman) per l'invocazione dei web service. Tuttavia al momento potete raggiungere la/le API di test puntando direttamente il vostro browser:
* http://localhost:4000/surname/Barra
* http://localhost:4000/email/d.barra@example.com

Al momento il comportamento tra le due versioni del server è molto simile, ma evolveremo solo la versione `Fastify`.

# Compiti per le vacanze
## Aggiungere nuove funzionalità
La rubrica avrebbe bisogno di:
 * Gestire l'aggiunta di un nuovo elemento (contact card), il relativo aggiornamento e la relativa rimozione: utilizzare i metodi HTTP preposti a tale scopo implementando e testando le relative API
 * Essere persistente - al momento basta salvare la rubrica in un file JSON e scriverla su / leggerla da file

 Potete lavorare sulla sola versione Fastify - anzi a dire il vero potete anche eliminare la versione Httpserver.

 ## Bonus
 Qualora riusciste ad aggiungere una o più delle attività seguenti, sarebbe un'ottima cosa (sono concetti più avanzati, quindi è "bonus", non "obbligatorio"):
 * aggiungere un test (unit test, per la precisione) sull'address book che testi la creazione della rubrica, l'inserimento, la modifica, la consultazione e la rimozione di contact card (cosiddetto "CRUD");
 * far partire il test attraverso lo script `npm run test`.
 
 
 Buon divertimento, e buone feste :-)


