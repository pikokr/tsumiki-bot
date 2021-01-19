import { Inhibitor } from 'discord-akairo'
import { Message } from 'discord.js'
import i18next, { TFunction } from 'i18next'

declare module 'discord-akairo' {
  interface CommandUtil {
    t: TFunction
  }
}

export default class extends Inhibitor {
  constructor() {
    super('i18n');
  }

  async exec(msg: Message): Promise<boolean> {
    msg.util!.t = await i18next.getFixedT('ko')
    return false
  }
}