import type { DestinationDefinition } from '@segment/actions-core'
import type { Settings } from './generated-types'

import { defaultValues } from '@segment/actions-core'

import identifyUser from './identifyUser'
import trackEvent from './trackEvent'

const destination: DestinationDefinition<Settings> = {
  name: 'Extole Destination',
  slug: 'extole-destination-v2',
  mode: 'cloud',

  authentication: {
    scheme: 'custom',
    fields: {
      apiKey: {
        type: 'string',
        label: 'API Key',
        description:
          'You can create an API key by following this [help article](https://success.extole.com/hc/en-us/articles/360001616668-Generating-Long-Lived-Access-Tokens)',
        required: true
      }
    },
    testAuthentication: (request) => {
      return request('https://api.extole.io/v2/me')
    }
  },

  extendRequest: ({ settings }) => {
    return {
      headers: {
        Authorization: `Bearer ${settings.apiKey}`,
        'Content-type': 'application/json'
      }
    }
  },

  onDelete: async (request, { payload }) => {
    return request('https://api.extole.io/v4/erasures', {
      method: 'POST',
      json: {
        partner_user_id: payload.userId,
        note: 'Erasure request from Segment Extole Destination app'
      }
    })
  },

  actions: {
    identifyUser,
    trackEvent
  },
  presets: [
    {
      name: 'Track Calls',
      subscribe: 'type = "track"',
      partnerAction: 'trackEvent',
      mapping: defaultValues(trackEvent.fields)
    },
    {
      name: 'Identify Calls',
      subscribe: 'type = "identify"',
      partnerAction: 'identifyUser',
      mapping: defaultValues(identifyUser.fields)
    }
  ]
}

export default destination
