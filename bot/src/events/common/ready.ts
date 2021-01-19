import { Listener } from 'discord-akairo'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import * as path from 'path'

export default class extends Listener {
  constructor() {
    super('common__ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  async exec() {
    await i18next.use(Backend).init({
      backend: {
        loadPath: path.join(path.resolve(path.join(__dirname, '../../locales')), '{{lng}}/{{ns}}.json')
      },
      lng: 'ko',
      ns: ['common']
    })
  }
}