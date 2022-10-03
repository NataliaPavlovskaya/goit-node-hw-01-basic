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