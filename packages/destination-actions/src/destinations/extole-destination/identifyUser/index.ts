import type { ActionDefinition } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'

const action: ActionDefinition<Settings, Payload> = {
  title: 'Identify User',
  description: 'Send user identify events to Extole',
  fields: {
    partner_user_id: {
      label: 'External User ID',
      description: 'The unique user identifier',
      type: 'string',
      default: {
        '@path': '$.userId'
      }
    },
    partner_anonymous_id: {
      label: 'Anonymous User ID',
      description: 'The anonymous user identifier',
      type: 'string',
      default: {
        '@path': '$.anonymousId'
      }
    },
    email: {
      label: 'Email Address',
      description: 'User email address',
      type: 'string',
      default: {
        '@path': '$.email'
      }
    },
    traits: {
      label: 'Event traits',
      description: 'Traits of the event',
      type: 'object',
      default: {
        '@path': '$.traits'
      }
    },
    extole_consumer_ip: {
      label: 'Consumer IP Address',
      description: 'Consumer device IP Address',
      type: 'string',
      default: {
        '@path': '$.context.ip'
      }
    }
  },
  perform: (request, { payload }) => {
    return request('https://api.extole.io/v5/events/identify', {
      method: 'POST',
      json: {
        partner_user_id: payload.partner_user_id,
        partner_anonymous_id: payload.partner_anonymous_id,
        email: payload.email,
        extole_consumer_ip: payload.extole_consumer_ip,
        traits: payload.traits,
        extole_app: 'Segment Destination App'
      }
    })
  }
}

export default action
