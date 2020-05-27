const config = require("../config.json");
class Env{
    constructor(){
        this.config = config.production;
        this.https = false;
        let UIserver = this.UIserver = this.setServerFormat(this.config["serverIp"],this.config["UI_Port"]);
        let UIPort = this.UIPort = this.config["UI_Port"];
        let RESTPort = this.RESTPort = this.config["REST_Port"];
        let Restserver = this.Restserver = this.setServerFormat(this.config["serverIp"],this.config["REST_Port"]);
        return {UIserver,Restserver,UIPort,RESTPort};
    }
    setServerFormat(serverIp,port) {
        return (!this.https ? 'http://':'https://')+serverIp+((port) ? ":"+port:"");
    }
}
module.exports = Env;