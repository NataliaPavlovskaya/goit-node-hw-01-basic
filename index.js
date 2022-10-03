// const contacts = require('./contacts');
const argv = require('yargs').argv;

// function invokeAction({ action, id, name, email, phone }) {
//     switch (action) {
//         case 'list':
//             contacts.listContacts();
//             console.log('List of contacts: ');
//             break;

//         case 'get':
//             contacts.getContactById(id);
//             break;

//         case 'add':
//             contacts.addContact(name, email, phone);
//             break;

//         case 'remove':
//             contacts.removeContact(id);
//             break;

//         default:
//             console.warn('\x1B[31m Unknown action type!');
//     }
// }




const contacts = require("./contacts");

const invokeAction = async ({action, id, name, email, phone}) => {
    switch(action) {
        case "list":
            const allContact = await contacts.listContacts();
            console.log(allContact);
            break;
        case "getById": 
            const oneContact = await contacts.getById(id);
            console.log(oneContact);
            break;
        case "add":
            const newContact = await contacts.add({name, email, phone});
            console.log(newContact);
            break;
        case "updateById":
            const updateContact = await contacts.updateById(id, {name, email, phone});
            console.log(updateContact);
            break;
        case "removeById":
            const deleteContact = await contacts.removeById(id);
            console.log(deleteContact);
            break;
        default: 
            console.log("Unknown action");
    }
}

invokeAction(argv);
