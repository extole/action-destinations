import type { ActionDefinition } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'

const action: ActionDefinition<Settings, Payload> = {
  title: 'Track Event',
  description: 'Track user events',
  fields: {
    name: {
      label: 'Event Name',
      description: 'The event name',
      type: 'string',
      required: true,
      default: {
        '@path': '$.event'
      }
    },
    time: {
      label: 'Time',
      description: 'When the event occurred.',
      type: 'datetime',
      required: true,
      default: {
        '@path': '$.receivedAt'
      }
    },
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
    properties: {
      label: 'Event Properties',
      description: 'Properties of the event',
      type: 'object',
      default: {
        '@path': '$.properties'
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
    return request('https://api.extole.io/v5/events', {
      method: 'POST',
      json: {
        event_name: payload.name,
        data: {
          ...payload.properties,
          partner_user_id: payload.partner_user_id,
          partner_anonymous_id: payload.partner_anonymous_id,
          email: payload.email,
          event_time: payload.time,
          extole_consumer_ip: payload.extole_consumer_ip,
          extole_app: 'Segment Destination App'
        }
      }
    })
  }
}

export default action
