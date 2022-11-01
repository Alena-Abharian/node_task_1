const contacts = require('./contacts')
const {Command} = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({action, id, name, email, phone}) {
    switch (action) {
        case "list":
            const list = await contacts.listContacts();
            console.log(list);
            break;
        case "get":
            const getById = await contacts.getContactById(id);
            console.log(getById);
            break;
        case "add":
            const addNewContact = await contacts.addContact({name, email, phone});
            console.log(addNewContact);
            break;
        case "remove":
            const remove = await contacts.removeContact(id);
            console.log(remove);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);
