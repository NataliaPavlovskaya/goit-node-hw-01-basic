const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactspath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => await fs.writeFile(contactspath, JSON.stringify(contacts, null, 2));

const getAll = async()=> {
    const data = await fs.readFile(contactspath);
    return JSON.parse(data);
}

const getById = async(id) => {
    const contacts = await getAll();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

const add = async(data) => {
    const contacts = await getAll();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

const updateById = async (id, body) => {
    const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }
    contacts[index] = {id, ...body};
    await updateContacts(contacts);
    return contacts[index];
}

const removeById = async(id) => {
    const contacts = await getAll();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateBooks(contacts);
    return result;
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    removeById,
}


// const fs = require('fs');
// const path = require('path');

// const contactsPath = path.resolve('./db/contacts.json');

// function listContacts() {
//     fs.readFile(contactsPath, 'utf-8', (error, data) => {
//         if (error) {
//             return console.log(error);
//         }
//         const contacts = JSON.parse(data);
        
//         console.table(contacts);
//     });
// }

// function getContactById(contactId) {
//     fs.readFile(contactsPath, 'utf-8', (error, data) => {
//         if (error) {
//             return console.log(error);
//         }

//         const contacts = JSON.parse(data);
//         const contact = contacts.find(contact => {
//             if (contact.id === contactId) {
//                 console.log(`Get contact by ID ${contactId}:`);
//                 console.table(contact);
//                 return contact;
//             }
//         });

//         if (contact == null) {
//             console.log(`Contact with ID "${contactId}" not found!`);
//         }
//     });
// }

// function removeContact(contactId) {
//     fs.readFile(contactsPath, 'utf-8', (error, data) => {
//         if (error) {
//             return console.log(error);
//         }

//         const contacts = JSON.parse(data);
//         const newContact = contacts.filter(contact => contact.id !== contactId);

//         if (newContact.length === contacts.length) {
//             console.log(
//                 `Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`,
//             );
//             return;
//         }

//         console.log('Contact deleted successfully! New list of contacts: ');
//         console.table(newContact);

//         fs.writeFile(contactsPath, JSON.stringify(newContact), error => {
//             if (error) {
//                 return console.log('error :', error);
//             }
//         });
//     });
// }

// function addContact(name, email, phone) {
//     fs.readFile(contactsPath, 'utf-8', (error, data) => {
//         if (error) {
//             return console.log(error);
//         }

//         const contacts = JSON.parse(data);

//         contacts.push({
//             id: contacts.length + 1,
//             name: name,
//             email: email,
//             phone: phone,
//         });

//         console.log('Contacts added successfully! New lists of contacts: ');
//         console.table(contacts);

//         fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
//             if (error) {
//                 return console.log(error);
//             }
//         });
//     });
// }

// module.exports = {
//     listContacts,
//     getContactById,
//     removeContact,
//     addContact,
// };

