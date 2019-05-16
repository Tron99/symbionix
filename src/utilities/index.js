import pnp from 'sp-pnp-js'
import * as _ from 'lodash'

const SITE_LINK = 'http://fnbloans'
const PNP_SETUP = () => {
  pnp.setup({
    sp: {
      baseUrl: process.env.NODE_ENV === 'production'
        ? SITE_LINK: '',
      headers: {
        'Accept': 'application/json; odata=verbose',
      },
    },
  })
}

export {
  PNP_SETUP
}