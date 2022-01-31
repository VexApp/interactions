import path from "path";

let glob = require("glob")

export const LoadInteractions = () => {
    let commands = new Map();
    let files = [];

    files.push(...glob.sync(path.join(__dirname, "../commands/**/*.ts")));
    if (!files) { console.log("No interactions found"); return new Map(); }
        
    for (let file of files) {
        if (require.cache[require.resolve(file)]) delete require.cache[require.resolve(file)];
        try {
            const tmp = require(file);
            console.log(`Loading ${tmp.Command.name}....`)
            
            commands.set(tmp.Command.name, tmp.Command);
            console.log(`Successfully loaded ${tmp.Command.name}!`);
          } catch (error) {
            console.log(`Error loading interaction ${error}`)
          }
    }
    

    return commands
}