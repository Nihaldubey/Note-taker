const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

var titleObject = {
			describe: 'Title of note',
			demand: true,
			alias: 't'
		};
var bodyObject = {
			describe: 'Body of note',
			demand: true,
			alias: 'b'
		};
const argv = yargs
	.command('add', 'Add a note',{
		title: titleObject,
		body: bodyObject
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleObject
	})
	.command('remove', 'Remove a note',{
		title: titleObject
	})
	.help()
	.argv;	
var command = argv._[0];
if (command === 'add'){
	var note = notes.addNote(argv.title, argv.body);
	if (note){
		notes.logNote(note);
	} else	{
		console.log("The title already exists!");
	}
} else if (command === 'list'){
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read'){
	var note = notes.getNote(argv.title);
	if (note){
		notes.logNote(note);
	} else {
		console.log('Note not found.');
	}
} else if (command === 'remove'){
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note was removed': 'Note not found';
	console.log(message);
}else {
	console.log('Command not recognized')
}