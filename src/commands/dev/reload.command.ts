import {Command} from "../../tools/bot/typings";
import config from '../../config';

const cmd : Command = {
    name: '리로드',
    aliases: ['ㄹㄹㄷ', 'reload'],
    owner: true,
    async run(client, msg) {
        client.reloadCommands()
        return msg.react('✅')
    }
}

export default cmd