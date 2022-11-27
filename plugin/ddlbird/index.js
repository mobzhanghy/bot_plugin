const axios = require("axios");

const info = {
    name: "ddlbird",
    author: "mob",
    version: "1.0.0"
};

let ddls = [];

//axios get 访问localhost3306 

axios.get('http://localhost:8080/api/tutorials').then((res) => {
    console.log(res.data);
    ddls = res.data;
});

function listener(data) {
    const { raw_message, reply } = data;
    if (raw_message === "ddl_default") {
        //reply(ddls.join("\n"));
        //ddls is an array of objects
        let msg = "Here are your default ddls:\n\n";
        for (ddl in ddls) {
            //ddl has name, star, start, end ,description, author
            msg += "name: " + ddls[ddl].name + "\n";
            msg += "difficulty: " + ddls[ddl].star + "/5"+ "\n";
            msg += "start: " + ddls[ddl].start + "\n";
            msg += "end: " + ddls[ddl].end + "\n";
            msg += "desc: " + ddls[ddl].desc + "\n";
            msg += "uploaded by: " + ddls[ddl].author + "\n";
            msg += "____________"
            msg += "\n\n";
        }

        msg+="Have a nice day!";

        reply(msg);
    }
}


function enable(bot) {
    bot.on("message", listener);
}

function disable(bot) {
    bot.off("message", listener);
}

module.exports = { enable, disable, info };