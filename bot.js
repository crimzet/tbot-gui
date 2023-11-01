const {Telegraf, Telegram} = require('telegraf');
const {appendFileSync, readFileSync, writeFileSync} = require('fs');

export class Bot {
    constructor(token) {
        //assign the vars
        this.token = token;
        this.cmds = [];
        this.reps = [];
        this.chat_id = 0;

        for (let index = 0; index < this.loadCommands()[0].length; index++) {
            this.cmds.push(this.loadCommands()[0][index]);
            this.reps.push(this.loadCommands()[1][index]);
        }

        //Create the bot
        this.bot = new Telegraf(this.token);
        this.me = new Telegram(this.token);

        //All commands are here
        this.bot.command('code', (ctx) => {
            ctx.reply("In progress...");
        });

        this.bot.on('message', (ctx) => {
            //ctx.reply(ctx.message.text.split(' '));
            //console.log(ctx.message.from.username + "~text~" + ctx.message.text);
            console.log("@" + ctx.message.from.username + "\n(" + ctx.message.from.first_name + ")");
            console.log(ctx.message.text);
            const index = this.cmds.indexOf(ctx.message.text.split(' ')[0]);
            if (index !== -1) {
                if (this.reps[index][0] + this.reps[index][1] + this.reps[index][2] === 'vid')
                {
                    ctx.reply(this.reps[index].replace('vid', ''));
                }
                else {
                    ctx.reply(this.reps[index]);
                }
            }
            else {
                ctx.reply("Unknown command.");
            }
        });

        /*
        bot.hears('hi', (ctx) => ctx.reply('Hey there'));

        bot.command('spam', (ctx) => {
            var x = ctx.message.text.replace("/spam ", "");

            for (var i = 0; i < 10; i += 1) ctx.reply(x);
        });
        */

        //launch and greatful stop
        this.bot.launch();

        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
    }

    addCommand(cmd, responce) {
        if (!this.cmds.includes(cmd) && cmd[0] === '/') {
            this.cmds.push(cmd);
            this.reps.push(responce);
        }

        //console.log(this.loadCommands());
        //console.log(this.cmds);
        for (let index = 0; index < this.cmds.length; index++) {
            if (!this.loadCommands()[0].includes(this.cmds[index])) {
                appendFileSync("commands.txt", this.cmds[index] + "~" + this.reps[index] + "~");
            }
        }
    }

    removeCommand(cmd, rep) {
        const index = this.cmds.indexOf(cmd);

        this.cmds.splice(index, 1);
        this.reps.splice(index, 1);

        //console.log(cmd + " = " + rep);
        //console.log(this.cmds);
        //console.log(this.loadCommands()[0])
        
        for (let index = 0; index < this.loadCommands()[0].length; index++) {
            if (!this.cmds.includes(this.loadCommands()[0][index])) {
                //console.log(this.loadCommands()[0][index]);


                writeFileSync("commands.txt", readFileSync("commands.txt", 'utf8').replace(cmd + "~" + rep + "~", ''));
                break;
            }
        }
    }

    getCommands() {
        return [this.cmds, this.reps];
    }

    loadCommands() {
        var file;
        var cmds = [];
        var reps = [];

        try {

            file = readFileSync("./commands.txt", 'utf8').replace('\n', '').split('~');

            //console.log(file);
            file.forEach(element => {
                if (file.indexOf(element) % 2 === 0) {
                    cmds.push(element.replace('\n', ''));
                }
                else {
                    reps.push(element.replace('\n', ''));
                }
            });

            return [cmds, reps];
        } catch (error) {console.error(error);}
    }
}

//Convertible = new Bot("5052375112:AAEgWychWCbZgXhU1kQPiIBckBBITUaDGvQ", "@ConvertibleBot");
//Convertible.addCommand('/sheesh', "YOU BUZZIN");
